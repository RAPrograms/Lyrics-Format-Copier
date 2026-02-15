const lyric_nodes = waitForSelectors("[data-testid=track-page] > :nth-child(4) > :first-child p")

const data = new Promise(async resolve => {
    const nodes = await lyric_nodes
    const lyrics = []

    for(let i=0; i<Math.max(nodes.length - 1, 1); i++){
        const node = nodes[i]
        if(node.textContent != "♪")
            lyrics.push(node.textContent)
    }

    resolve(lyrics)
})