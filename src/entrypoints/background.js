// Example background script
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('Tab updated:', tab.url);

    chrome.tabs.sendMessage(tabId, {
      type: 'urlChanged',
      url: tab.url,
    })
  }
});