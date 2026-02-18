const selector = waitForSelectors(".js-lyrics-module-content [aria-label='Song lyrics']")

function dynamicSupportCheck(){
    return new Promise(async resolve => {
        // 5 second time out before assuming there is no lyrics
        setTimeout(() => { resolve(false) }, 5000)
        resolve(((await selector)?.length || 0) > 0)
    })
}




const lyric_pannel = document.querySelector(".js-lyrics-module-content [aria-label='Song lyrics']")

async function getData(){
    return new Promise(resolve => {
        const lyrics = []

        for(let i=0; i<lyric_pannel.childNodes.length; i++){
            const node = lyric_pannel.childNodes[i]
            
            if(node.nodeName == "#text")
                lyrics.push(node.textContent.trim())

            else if(node.nodeName == "BR" && node.nextSibling?.nodeName == "BR"){
                lyrics.push("")
                i++
            }
        }

        resolve(lyrics)
    })
}