customElements.define("processing-option",
    class OptionComponent extends HTMLElement {
        #descriptions

        constructor() {
            // Always call super first in constructor
            super();

            this.#descriptions = {}
        }

        onChange(e){
            this.querySelector(".hint").innerText = this.#descriptions[e.target.value]
        }

        connectedCallback() {
            const title = document.createElement("b")
            title.textContent = this.getAttribute("data-title")


            const optionsContainor = document.createElement("div");
            optionsContainor.classList.add("selector")

            for(const attribute of this.attributes){
                if(attribute.name.startsWith("data-"))
                    continue

                const element = document.createElement("label")
                
                const title = document.createElement("span")
                title.textContent = attribute.name
                element.appendChild(title)

                const field = document.createElement("input")
                field.type = "radio"
                field.name = this.getAttribute("data-name")
                field.value = attribute.name
                field.addEventListener("change", (e) => this.onChange(e))

                if(attribute.name == this.getAttribute("data-default"))
                    field.checked = true

                this.#descriptions[attribute.name] = attribute.value

                element.appendChild(field)
                optionsContainor.appendChild(element)
            }

            const hint = document.createElement("div")
            hint.classList.add("hint")
            hint.innerText = this.#descriptions[this.getAttribute("data-default")]

            this.append(
                title,
                optionsContainor,
                hint
            )
        }
    }
);