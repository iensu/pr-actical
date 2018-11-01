const html = require('choo/html');
const helpers = require('../helpers.js');

const Label = (label) => html`
  <span class="pr-label">${label}</span>
`;

const PR = (pr) => {
  const status = helpers.getPRStatus(pr);
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const elapsed = helpers.timeElapsed(pr.createdAt);

  return html`
    <li class="pr-item ${statusClass}">
      <div class="pr-item__top">
        <a class="pr-item__repo" href="${pr.repositoryUrl}">${pr.repository}</a>
        <div class="pr-item__labels">${pr.labels.map(Label)}</div>
        <img class="pr-item__author" src="${pr.author.avatarUrl}" alt="${pr.author.login}" />
      </div>
      <a class="pr-item__title" href="${pr.url}" target="_blank">${pr.title}</a>
      <div class="pr-item__bottom">
        <div class="pr-item__status ${statusClass}">${status}</div>
        <div class="pr-item__elapsed">${elapsed.time} ${elapsed.unit} old</div>
      </div>
    </li>
  `;
};

const PRList = (prs) =>
  html`
    <ul class="pr-list">
      ${prs.map(PR)}
    </ul>
  `;

module.exports = (state, emit) => {
  if (!state.github.fetching && !state.github.prs) {
    emit(state.events.github.getPRs);
  }

  setInterval(() => {
    emit(state.events.github.getPRs);
  }, 60 * 1000);

  const { prs } = state.github;

  return html`
    <body class="practical-container">
      ${prs ? PRList(prs.sort(helpers.sortByCreatedAt)) : ''}
    </body>
  `;
};
