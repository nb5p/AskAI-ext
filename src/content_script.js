// receive message from background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case "show": // handle message form contextMenus
      alert(request.data);
      break;
    default:
      break;
  }
});
