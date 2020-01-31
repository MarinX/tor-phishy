# Tor Phishy

A Tor browser plugin which block access to the phising site.

## How it works

The plugin runs in the background so there is no UI to click.
For every website you visit, the plugin will:

- Check if the hostname matches the hostname located in github repo [phishy-onions](https://github.com/DarkDotFail/phishy-onions)
- If there is a match, it will show a red warning and block you for accessing that site

The plugin implements caching, so only the first time it will fetch the github resource and store it in local browser storage.
To refresh with new data, re-open the Tor browser.

## How to install

- Click on "Clone or download"
- Click on "Download ZIP" and unzip it somewhere
- Open Tor browser and in the URL type ``about:debugging#addons``
- Click "Load Temporary Add-on..."
- Navigate to the location of extracted zip folder and click on ``manifest.json``
- The plugin should be installed, verify by checking some phising links
- Profit

## Note

Since this is not official Tor plugin, the install step needs to be repeated each time you open a Tor browser.
Yeah, I know - it sucks :(

## Author

Marin Basic

## License

MIT
