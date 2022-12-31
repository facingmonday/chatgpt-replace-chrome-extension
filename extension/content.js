// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "REPLACE_WITH_CHATGPT") {
    const { info: { selectionText, ...restInfo }, tab } = message; 

    if(!selectionText) {
      return;
    }

    const originalActiveElement = document.activeElement;

    showLoadingCursor();

    // Send the text to the API endpoint
    fetch("http://localhost:1337/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: selectionText }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log('Response from chatgpt', data);
        const { message } = data;
        alert(message);

        restoreCursor();
      })
      .catch((error) => {
        console.log('error', error);
        restoreCursor();
        alert(
          "Error. Make sure you're running the server by following the instructions on https://github.com/gragland/chatgpt-chrome-extension. Also make sure you don't have an adblocker preventing requests to localhost:3000."
        );
        throw new Error(error);
      });
  }
});

const showLoadingCursor = () => {
  const style = document.createElement("style");
  style.id = "corsor_wait";
  style.innerHTML = `* {cursor: wait;}`;
  document.head.insertBefore(style, null);
};

const restoreCursor = () => {
  document.getElementById("corsor_wait").remove();
};
