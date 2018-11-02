const html = require('choo/html');
const helpers = require('../helpers.js');

const Label = (label) => html`
  <span class="pr-label">${label}</span>
`;

const elapsedString = ({ time, unit }) => {
  if (time === 0 && unit === 'hour') {
    return 'just now';
  } else if (time === 1) {
    return `${time} ${unit} ago`;
  }

  return `${time} ${unit}s ago`;
};

module.exports = function PR(pr) {
  const status = helpers.getPRStatus(pr);
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const elapsed = helpers.timeElapsed(pr.updatedAt);

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
        <div class="pr-item__elapsed">Updated ${elapsedString(elapsed)}</div>
      </div>
    </li>
  `;
};
