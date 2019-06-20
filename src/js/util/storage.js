export default {
    getSandboxes() {
        return new Promise(resolve => {
            chrome.storage.sync.get('sandboxes', result => resolve(result.sandboxes));
        })
    },
    getSandbox(index) {
        return this.getSandboxes().then(sandboxes => sandboxes[index]);
    }
}