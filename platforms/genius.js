const data = new Promise((resolve, reject) => {
    const containors = document.querySelectorAll("#lyrics-root > [data-lyrics-container]")
    const lyrics = []
    let cache = ""

    for(let i=0; i<containors.length; i++){
        const chunck = containors[i]

        for(let j=1; j<chunck.childNodes.length; j++){
            const node = chunck.childNodes[j]
            if(node.nodeName == "BR"){
                lyrics.push(cache)
                cache = ""
                continue
            }

            cache += node.textContent
        }
    }

    lyrics.push(cache)
    resolve(lyrics)
})

callHome()