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

console.log(await pageCall("supported"))