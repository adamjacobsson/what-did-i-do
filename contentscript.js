function tryGetValueFromXpath(xpath) {
    try {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
    }
    catch {
        return null;
    }
}

function tryUpdateHistory(key, value) {
    var date = new Date().toISOString().split('T')[0];
    var obj_key = 'wdid_obj';
    try {
        chrome.storage.local.get(obj_key, function(result) {
            var obj = result[obj_key];
            obj[key] = {'value': value, 'date': date}
            chrome.storage.local.set({[obj_key]: obj});
        });
    }
    catch {
        
        console.error('Failed to update wdid log in local storage.')
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var pairWith = tryGetValueFromXpath(request.xpath)
    tryUpdateHistory(request.url, pairWith)
    console.log(request)
    sendResponse({ status: 'OK' })
});

////*[@id="ember1708"]/div/div[1]/div/div[1]/div/div[2]/div[1]/div
////*[@id="1282val-field_1.3.7--input"]
////*[@id="929val-field_1.3.7--input"]