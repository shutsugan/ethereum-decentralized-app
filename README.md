# Ethereum Decentralized Application

### Version
1.0.0

### App screenshot

![app screenshot](../master/screenshots/app.png)

### Usage

This application has been tested on Node.js 10.7.0 and npm 6.3.0 - these packages should
be available for download [here](https://nodejs.org/en/) - choose the "Current"
version for download.

### Installation

Once you have Node and npm installed, you'll need
to install the application's dependencies.

```sh
$ npm install
```

### Requirements

After installing npm packages, download the requirements.

#### Truffle Framework

install globaly Truffle which allows to build decentralized applications on the Ethereum blockchain.

```sh
$ npm install -g truffle
```

#### Ganache

next install Ganache a local in-memory blockchain, it will give us 10 external accounts with addresses on our local Ethereum blockchain, Each account is preloaded with 100 fake ether.

you can download it from [the Truffle Framework website](http://truffleframework.com/ganache),

![ganach screenshot](../master/screenshots/ganach.png)

#### Metamask

this dependency is a extension for Google Chrome, in order to use the blockchain, it must be connected, it provides a personal account to connect to our local Ethereum blockchain.
It can be downloaded from [Google Chrome webstore](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en).

![metamask screenshot](../master/screenshots/metamask.png)

### Run the app

Start the project by migrating the contract.

```sh
$ truffle migrate --reset
```

![migration screenshot](../master/screenshots/migration.png)

then run the project client-side.

```sh
$ npm run dev
```

![client-side server screenshot](../master/screenshots/client.png)

then type the address in a browser.

    Local: http://localhost:3000

After all that create an account in MetaMask Google Chrome extension, then select Custom RPC and type the Ganash PRIVATE KEY in the private key input field

![browser screenshot](../master/screenshots/browser.png)

### Run the app tests

```sh
$ truffle test
```

![test screenshot](../master/screenshots/test.png)