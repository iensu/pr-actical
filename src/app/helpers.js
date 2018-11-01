function timeElapsed(dateString) {
  const created = new Date(dateString).getTime();
  const now = Date.now();

  const elapsed = now - created;

  const hours = (elapsed / (60 * 60 * 1000)) | 0;

  return {
    time: hours < 24 ? hours : (hours / 24) | 0,
    unit: hours < 24 ? 'hour(s)' : 'day(s)',
  };
}

function latestReviewStatus(reviews) {
  const nonComments = reviews.filter((s) => s !== 'COMMENTED' || s !== 'PENDING');
  return nonComments[nonComments.length - 1];
}

function getPRStatus(pr) {
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
}

function sortByCreatedAt(a, b) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

module.exports = {
  timeElapsed,
  getPRStatus,
  sortByCreatedAt,
};
