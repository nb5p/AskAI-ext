const baseURLInput = document.getElementById("BaseURL");
const apiKeyInput = document.getElementById("APIKey");
const saveButton = document.getElementById("save");

// save input value to storage
saveButton.addEventListener("click", () => {
  const baseURL = baseURLInput.value;
  const apiKey = apiKeyInput.value;
  chrome.storage.local.set({ baseURL, apiKey }, () => {
    console.log("Settings saved");
  });
});

// init with saved value
chrome.storage.local.get(["baseURL", "apiKey"], (result) => {
  if (result.baseURL) {
    baseURLInput.value = result.baseURL;
  }
  if (result.apiKey) {
    apiKeyInput.value = result.apiKey;
  }
});
