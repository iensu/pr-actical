function timeElapsed(dateString) {
  const created = new Date(dateString).getTime();
  const now = Date.now();

  const elapsed = now - created;

  const hours = (elapsed / (60 * 60 * 1000)) | 0;

  return {
    time: hours < 24 ? hours : (hours / 24) | 0,
    unit: hours < 24 ? 'hour' : 'day',
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

  if (mergeable !== 'MERGEABLE') {
    return 'Update needed';
  }

  if (!review || review === 'DISMISSED') {
    return 'Review needed';
  }

  if (mergeable === 'MERGEABLE' && review === 'APPROVED') {
    return 'Approved';
  }

  return 'Unknown status';
}

function sortByUpdatedAt(a, b) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

module.exports = {
  timeElapsed,
  getPRStatus,
  sortByUpdatedAt,
};
