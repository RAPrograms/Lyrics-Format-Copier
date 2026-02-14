chrome.runtime.onMessage.addListener((request, sender, send) => {
    switch(request?.action){
        case "supported":
            if(typeof dynamicSupportCheck != "function"){
                send({
                    successful: true,
                    content: true
                });
                return false
            }

            ;(async () => {
                send({
                    successful: true,
                    content: await dynamicSupportCheck()
                });
            })()

            return true

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