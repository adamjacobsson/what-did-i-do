function setOrDeleteLocalStorage(key, value) {
    if (value != '' && value != ' ' && value != null) {
        chrome.storage.local.set({[key]: value});
        return;
    }
    chrome.storage.local.set({[key]: ''});
}

document.getElementById('saveBtn').onclick = function(e) {
    var re = document.getElementById('reInput').value;
    var xpath = document.getElementById('xpathInput').value;
    
    setOrDeleteLocalStorage('lookForRe', re);
    setOrDeleteLocalStorage('lookForXPath', xpath);
}

document.getElementById('searchDateBtn').onclick = (e) => {
    var searchFrom = document.getElementById('searchDateInput').value;
    setOrDeleteLocalStorage('searchForDate', searchFrom);

    if (!searchFrom) {
        return;
    }
    
    chrome.storage.local.get(['wdid_obj'], function(result) {
        var data = '';
        for (const [k, v] of Object.entries(result['wdid_obj'])) {
            if (v['date'] == searchFrom) {
                data += k + '\n' + v['value'] + '\n\n';
            }
          }
        
        if (!data) {
            window.confirm('Such empty')
            return
        }
        window.confirm(data)
    });
}

try {
    chrome.storage.local.get(['lookForRe'], function(result) {
        document.getElementById('reInput').value = result['lookForRe'];
    });
    chrome.storage.local.get(['searchForDate'], function(result) {
        document.getElementById('searchDateInput').value = result['searchForDate'];
    });
    
    chrome.storage.local.get(['lookForXPath'], function(result) {
        if (result) {
            document.getElementById('xpathInput').value = result['lookForXPath'];
        }
        
    });

}
catch {

}
