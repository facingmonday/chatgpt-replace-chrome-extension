# ChatGPT Chrome Extension 🤖 ✨

A chrome extension that allows you to select text in a browser and replace it with chatgpt. For now it only works with basic text boxes but anything else it will just show the response in an alert.


## Install

First clone this repo on your local machine

Then install dependencies

```bash
npm install
```

Copy `.env-example` into a new file named `.env` and get the value of your ChatGPT session token by following the <a href="https://github.com/transitive-bullshit/chatgpt-api#session-tokens" target="_blank">instructions here</a>. Then add that value to your `.env` file.

Run the server so the extension can communicate with ChatGPT.

```bash
node server.js
```

Add the extension

1. Go to chrome://extensions in your Google Chrome browser
2. Check the Developer mode checkbox in the top right-hand corner
3. Click "Load Unpacked" to see a file-selection dialog
4. Select your local `chatgpt-chrome-extension/extension` directory

## Use

1. Select text in a text box
2. Right click on the text
3. Select "Replace with ChatGPT"

## License

MIT © facingmonday
