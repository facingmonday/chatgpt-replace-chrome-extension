// Create a context menu item
chrome.contextMenus.create({
  id: "replace-with-chatgpt",
  title: "Replace with ChatGPT",
  contexts: ["all"],
});

// Listen for when the user clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "replace-with-chatgpt") {
    // Send a message to the content script
    chrome.tabs.sendMessage(tab.id, { type: "REPLACE_WITH_CHATGPT", info, tab });
  }
});
