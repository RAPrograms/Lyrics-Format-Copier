customElements.define("processing-option",
    class OptionComponent extends HTMLElement {
        #descriptions
        #selected

        constructor() {
            // Always call super first in constructor
            super();

            this.#descriptions = {}

            try {
                this.#selected = localStorage.getItem(`option-${this.getAttribute("data-name")}`) || this.getAttribute("data-default")
            } catch (error) {
                this.#selected = this.getAttribute("data-default")
            }
        }

        onChange(e){
            this.querySelector(".hint").innerText = this.#descriptions[e.target.value]
            localStorage.setItem(`option-${this.getAttribute("data-name")}`, e.target.value)
            this.#selected = e.target.value
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

                if(attribute.name == this.#selected)
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