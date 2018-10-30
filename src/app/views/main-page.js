const html = require('choo/html');

const timeElapsed = (dateString) => {
  const created = new Date(dateString).getTime();
  const now = Date.now();

  const elapsed = now - created;

  const hours = (elapsed / (60 * 60 * 1000)) | 0;

  return {
    time: hours < 24 ? hours : (hours / 24) | 0,
    unit: hours < 24 ? 'hour(s)' : 'day(s)',
  };
};

const latestReviewStatus = (reviews) => {
  const nonComments = reviews.filter((s) => s !== 'COMMENTED' || s !== 'PENDING');
  return nonComments[nonComments.length - 1];
};

const getPRStatus = (pr) => {
  const review = latestReviewStatus(pr.reviews);
  const mergeable = pr.mergeable;

  if (review === 'CHANGES_REQUESTED') {
    return 'Changes requested';
  }

  if (mergeable && mergeable.match(/MERGEABLE|UNKNOWN/) && (!review || review === 'DISMISSED')) {
    return 'Review needed';
  }

  if (mergeable !== 'MERGEABLE') {
    return 'Update needed';
  }

  if (mergeable === 'MERGEABLE' && review === 'APPROVED') {
    return 'Approved';
  }

  return 'Unknown status';
};

const byDate = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const Label = (label) => html`
  <span class="pr-label">${label}</span>
`;

const PR = (pr) => {
  const status = getPRStatus(pr);
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const elapsed = timeElapsed(pr.createdAt);

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
      ${prs ? PRList(prs.sort(byDate)) : ''}
    </body>
  `;
};
