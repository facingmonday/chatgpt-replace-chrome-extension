console.log("popup script");   

function onReq(request, sender, sendResponse)
{
  return null;
}

chrome.runtime.onMessage.addListener(onReq);