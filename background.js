chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        chrome.storage.local.get(null, function(result) {
            if (new RegExp(result['lookForRe']).test(changeInfo.url)) {
                chrome.tabs.sendMessage(tab.id, {
                    'url': changeInfo.url,
                    'xpath': result['lookForXPath']
                }, function (res) {});
            }
        });
    }
});



chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url)
        chrome.storage.local.get(['lookForRe'], function(result) {
            console.log(result['lookForRe'])
        });
    })
})
