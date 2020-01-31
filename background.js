(function() {

    const config = {
        remoteStoreURL: "https://raw.githubusercontent.com/DarkDotFail/phishy-onions/master/phishing-sites.txt",
        alertURL: browser.runtime.getURL("alert.html")
    };

    /**
     * fromStore returns data from local browser storage
     * @returns {Promise<*>}
     */
    async function fromStore() {
        let store = await browser.storage.local.get();
        return store.phisingsites ? store.phisingsites : [];
    }

    /**
     * fromRemote returns data from github
     * @returns {Promise<string>}
     */
    async function fromRemote() {
        console.log(config.remoteStoreURL);
        let resp = await fetch(new Request(config.remoteStoreURL));
        return await resp.text();
    }

    /**
     * parse parses the raw txt file into array of url's
     * @param body
     * @returns {string[]}
     */
    function parse(body) {
        // remove # (titles)
        body = body.replace(/^.*#.*$/mg, "");
        // remove empty blank lines
        body = body.replace(/^\s*[\r\n]/gm, "");
        return body.split("\n");
    }

    /**
     * run at every page load, check if URL's are stored in local browser storage
     * If not, then fetch from remote and save it
     * Check if given hostname matches the hostname on the list
     * If there is a match, show warning!
     * @returns {Promise<boolean>}
     */
    async function run() {
        let data = await fromStore();
        if(data.length <= 0) {
            try {
                let body = await fromRemote();
                data = parse(body);
                await browser.storage.local.set({
                    phisingsites: data
                });
            }catch (err) {
                console.error(err);
                return false;
            }
        }

        return data.includes(window.location.hostname);
    }

    /**
     * Main function
     */
    run().then(function(phishing) {
        if(phishing) {
            window.location.href = config.alertURL;
        }
    });


})();
