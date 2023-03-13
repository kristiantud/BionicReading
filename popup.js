
function zap(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message" : "zap!"});

    });
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("zap-button").addEventListener("click", zap);
});