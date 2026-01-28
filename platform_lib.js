chrome.runtime.onMessage.addListener((request, sender, send) => {
    switch(request?.action){
        case "supported":
            send({
                successful: true,
                content: `This page is supported`
            });
            return false

        case "getContent":
            ;(async () => {
                send({
                    successful: true,
                    content: await data
                });
            })()
            return true

        default:
            console.warn("Unsupported request", request)
            send({
                successful: false,
                content: "Unsupported request"
            });
            return false
    }
})