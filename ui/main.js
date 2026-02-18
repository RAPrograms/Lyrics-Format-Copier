"use strict"

import processer from "./processer.js";

async function pageCall(functionName) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Send the function name and arguments as a structured object
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: functionName,
    });

    if(!response.successful)
      throw Error(response.content)

    return response.content;

  } catch (error) {
    console.error("Communication failed:", error);
    return null
  }
}


async function processCopy(e){
  e.preventDefault()

  let lyrics = await pageCall("getContent")
  lyrics = processer(lyrics, new FormData(e.target))

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

  const result = await pageCall("supported")

  resolve(result != null && result)
})

window.onload = async() => {
  document.querySelector("footer > a").addEventListener("click", (e) => {
    e.preventDefault()
    window.open(e.target.href)
    window.close();
  })

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