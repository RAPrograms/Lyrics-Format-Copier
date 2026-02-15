"use strict"

function waitForSelectors(selectors = []){
    if(!Array.isArray(selectors))
        selectors = [selectors]

    function get(){
        for(let selector of selectors){
            const result = document.querySelectorAll(selector)
            if(result)
                return result
        }
    }
    
    return new Promise(resolve => {
        const load_result = get()
        if(load_result.length > 0)
            return resolve(load_result)

        const observer = new MutationObserver(() => {
            const result = get()
            if(result.length < 1)
                return
            
            observer.disconnect()
            resolve(result)
        })
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    })
}