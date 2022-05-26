function validatePageAndDoStuff(url, tabId) {
    chrome.storage.local.get(null, function (result) {
        if (new RegExp(result['lookForRe']).test(url)) {
            chrome.tabs.sendMessage(tabId, {
                'url': url,
                'xpath': result['lookForXPath']
            }, function (res) { });
        }
    });
}


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    validatePageAndDoStuff(changeInfo.url, tabId)
});

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        validatePageAndDoStuff(current_tab_info.url, tab.tabId)
    })
})

function startUp() {
    // Creates required storage items if they do not exist.
    chrome.storage.local.get('lookForRe', (result) => {
        if (Object.keys(result).length === 0) {
            chrome.storage.local.set({ ['lookForRe']: '' });
        }
    });
    chrome.storage.local.get('lookForXPath', (result) => {
        if (Object.keys(result).length === 0) {
            chrome.storage.local.set({ ['lookForXPath']: '' });
        }
    });
    chrome.storage.local.get('searchForDate', (result) => {
        if (Object.keys(result).length === 0) {
            chrome.storage.local.set({ ['searchForDate']: '' });
        }
    });
    chrome.storage.local.get('wdid_obj', (result) => {
        if (Object.keys(result).length === 0) {
            chrome.storage.local.set({ ['wdid_obj']: {} });
        }
    });
}

startUp();
