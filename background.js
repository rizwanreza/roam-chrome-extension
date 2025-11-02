// Background script for Roam Research URL Saver
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu
  chrome.contextMenus.create({
    id: 'saveToRoam',
    title: 'Save to Roam Research',
    contexts: ['page']
  });
});