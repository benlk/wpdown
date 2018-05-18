/* global chrome */

const currentTab = () => new Promise((resolve, reject) => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs.length === 1) resolve(tabs[0]);
    else reject(new Error(`Found ${tabs.length} active tabs.`));
  });
});

const main = async function main() {
  const tab = await currentTab();
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' });
};

chrome.browserAction.onClicked.addListener(main);