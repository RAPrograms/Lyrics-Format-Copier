async function pageCall(functionName) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Send the function name and arguments as a structured object
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: functionName,
    });

    if(!response.successful)
      throw Error(response.content)

    console.log("Result from content:", response?.content);
    return response.content;

  } catch (error) {
    console.error("Communication failed:", error);
    return null
  }
}

async function processCopy(e){
  e.preventDefault()

  const lyrics = await pageCall("getContent")
  const config = new FormData(e.target)

  let output = ""
  
  for(let i=0; i<lyrics.length; i++){
    const lyric = lyrics[i]
    output += lyric + "\n"
  }

  try{
    await navigator.clipboard.writeText(output)
  }catch{
    prompt("Unable to copy to clipboard\nPlease copy the following", output)
  }
}

const pageLoaded = new Promise(async (resolve, reject) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if(tab.status == "complete")
    resolve()

  chrome.tabs.onUpdated.addListener(function listener(id, info) {
    if(tab.id != id || info.status != 'complete')
      return

    chrome.tabs.onUpdated.removeListener(listener);
    resolve()
  });
})

const pageSupported = new Promise(async(resolve) =>{ 
  await pageLoaded

  resolve((await pageCall("supported")) != null)
})

window.onload = async() => {
  if(!(await pageSupported)){
    document.querySelector("main > :nth-child(1)").setAttribute("class", "error-icon")
    document.querySelector("main > :nth-child(2)").textContent = "Can't Parse This Page"
    document.querySelector("main > :nth-child(3)").innerHTML = "We couldn't find any lyrics on this page. <br> Please make sure you're on a supported lyrics website."
    return
  }

  
  let temp = document.getElementsByTagName("template")[0];
  let clone = temp.content.cloneNode(true);
  document.querySelector("main").replaceWith(clone)

  document.querySelector("form").onsubmit = processCopy
};