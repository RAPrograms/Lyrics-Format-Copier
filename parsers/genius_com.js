"use strict"

/**
 * @param {HTMLElement} container
 */
function recursiveRead(container, output, cache = ""){
    for(const child of container.childNodes){
        if(child.nodeName == "#text"){
            cache += child.textContent
            continue
        }

        if(child.getAttribute("data-exclude-from-selection") == "true")
            continue

        if(child.nodeName == "BR"){
            output.push(cache)
            cache = ""
            continue
        }

        cache = recursiveRead(child, output, cache)
    }

    return cache
}


const data = new Promise(resolve => {
    const containors = document.querySelectorAll("#lyrics-root > [data-lyrics-container]")
    const lyrics = []

    for(let i=0; i<containors.length; i++){
        const chunck = containors[i]

        lyrics.push(recursiveRead(chunck, lyrics))
    }

    resolve(lyrics)
})