App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract();
  },

  initContract: function() {
    const url = 'Election.json';
    const cb = election => {
      console.log(election);
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    };
    getJson(url, cb);
  },

  render: function() {
    let electionInstance;
    const loader = document.querySelector('.loader');
    const container = document.querySelector('.rows__main');
    const content = document.querySelector('.account');
    loader.classList.add('show');

    //Load account data
    web3.eth.getCoinbase((err, account) => {
      if (err !== null) return;

      App.account = account;
      content.innerHTML = `Your Account: ${account}`;
    });

    //Load contract data
    App.contracts.Election
      .deployed()
      .then(instance => {
        electionInstance = instance;
        return electionInstance.candidatesCount();
      })
      .then(candidatesCount => {
        container.innerHTML = '';

        for (let i = 1; i <= candidatesCount; i++) {
          electionInstance
            .candidates(i)
            .then(candidate => {
              const id = candidate[0];
              const name = candidate[1];
              const voteCount = candidate[2];

              const template = `
                <div class="rows__item-container sides-padding">
                  <div class="rows__item">${id}</div>
                  <div class="rows__item">${name}</div>
                  <div class="rows__item">${voteCount}</div>
                </div>
              `;

              container.insertAdjacentHTML('beforeend', template);
            })
        }

        loader.classList.remove('show');
      })
      .catch(err => console.warn(err));
  }
};

window.addEventListener('load', _ => {
  App.init();
});

function getJson(url, cb) {
  fetch(url)
    .then(res => res.json())
    .then(data => cb(data));
}