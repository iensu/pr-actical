const helpers = require('../helpers.js');

module.exports = (state, emitter) => {
  state.github = {
    prs: null,
  };

  state.events.github = {
    getPRs: 'github:get-prs',
  };

  emitter.on(state.events.github.getPRs, () => {
    state.github.fetching = true;
    fetch('/api/prs')
      .then((response) => response.json())
      .then((prs) => {
        state.github.prs = prs.sort(helpers.sortByUpdatedAt);
        state.github.fetching = false;
        emitter.emit(state.events.RENDER);
      })
      .catch((err) => {
        state.github.fetching = false;
        console.log(err);
      });
  });
};
