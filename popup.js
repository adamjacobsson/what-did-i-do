function setOrDeleteLocalStorage(key, value) {
    if (value != '' && value != ' ' && value != null) {
        chrome.storage.local.set({ [key]: value });
        return;
    }
    chrome.storage.local.set({ [key]: '' });
}

document.getElementById('saveBtn').onclick = (e) => {
    var re = document.getElementById('reInput').value;
    var xpath = document.getElementById('xpathInput').value;

    setOrDeleteLocalStorage('lookForRe', re);
    setOrDeleteLocalStorage('lookForXPath', xpath);
}

document.getElementById('searchDateBtn').onclick = (e) => {
    var searchFrom = document.getElementById('searchDateInput').value;
    setOrDeleteLocalStorage('searchForDate', searchFrom);
}

const preloadData = (searchFrom) => {
    var data = '';
    if (!searchFrom) {
        alert('No searchFrom');
        return;
    }
    
    chrome.storage.local.get(['wdid_obj'], function (result) {
        for (const [k, v] of Object.entries(result['wdid_obj'])) {
            if (v['date'] == searchFrom) {
                if (!k || k == 'undefined') {
                    //continue;
                }
                var table = document.getElementById("myTable");
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = k;
                cell2.innerHTML = (v['value'] || 'None').substring(0, 40);
            }
        }

        if (!data) {
            document.getElementById('statsA').innerHTML = 'lul';
            return;
        }
        document.getElementById('statsA').innerHTML = data;
    });
}

window.onload = () => {
    chrome.storage.local.get(['lookForRe'], function (result) {
        document.getElementById('reInput').value = result['lookForRe'];
    });
    chrome.storage.local.get(['searchForDate'], function (result) {
        document.getElementById('searchDateInput').value = result['searchForDate'];
        preloadData(result['searchForDate'])
    });
    chrome.storage.local.get(['lookForXPath'], function (result) {
        document.getElementById('xpathInput').value = result['lookForXPath'];
    });
};

