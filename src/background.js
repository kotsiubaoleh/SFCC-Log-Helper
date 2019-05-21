function originWithId(header) {
    return header.name.toLowerCase() === 'origin' && header.value.indexOf('chrome-extension://') === 0;
}

chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        return {
            requestHeaders: details.requestHeaders.filter(x => !originWithId(x))
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
);