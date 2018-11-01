const html = require('choo/html');
const PR = require('./pr.js');

const renderApp = (prs, isFetching) => {
  if (isFetching || !prs) {
    return html`
      <div class="practical__is-fetching">Fetching PRs</div>
    `;
  } else if (prs.length === 0) {
    return html`
      <div class="practical__no-prs>No PRs</div>
    `;
  } else {
    return html`
      <ul class="pr-list">${prs.map(PR)}</ul>
    `;
  }
};

module.exports = (state, emit) => {
  if (!state.github.fetching && !state.github.prs) {
    emit(state.events.github.getPRs);
  }

  setInterval(() => {
    emit(state.events.github.getPRs);
  }, 60 * 1000);

  const { prs, fetching } = state.github;

  return html`
    <body class="practical-container">
     ${renderApp(prs, fetching)}
    </body>
  `;
};
