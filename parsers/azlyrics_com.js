"use strict"

const data = new Promise(resolve => {
    const nodes = document.querySelector(".main-page > :nth-child(2) > :nth-child(2) > div:nth-of-type(5)").childNodes
    const lyrics = []

    for(let i=2; i<nodes.length; i++){
        const node = nodes[i]
        if(node.nodeName == "#text")
            lyrics.push(node.textContent.substring(1))
    }

    resolve(lyrics)
})