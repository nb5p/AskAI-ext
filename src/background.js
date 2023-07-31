// register context menu
chrome.contextMenus.create({
  id: "ask-ai",
  title: "Ask AI",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "ask-ai":
      // get info from storage
      chrome.storage.local.get(["baseURL", "apiKey"], async (result) => {
        console.log(result);
        let response = await fetch(`${result.baseURL}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: `Hello! translate this to Chinese: ${info.selectionText}`,
              },
            ],
          }),
        });
        let data = await response.json();
        console.log(data);
        chrome.tabs.sendMessage(tab.id, {
          type: "show",
          data: data.choices[0].message.content,
        });
      });
      break;
    default:
      break;
  }
});
