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

const pageSupported = new Promise(async(resolve) => 
  resolve((await pageCall("supported")) != null))

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
};