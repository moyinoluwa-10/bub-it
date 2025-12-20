export const convertDateTimeToTimeAgo = (dateTime: string): string => {
  const date = new Date(dateTime);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const intervals = {
    year: Math.floor(seconds / 31536000),
    month: Math.floor(seconds / 2592000),
    week: Math.floor(seconds / 604800),
    day: Math.floor(seconds / 86400),
    hour: Math.floor(seconds / 3600),
    minute: Math.floor(seconds / 60),
    second: seconds,
  };

  let timeAgo;

  if (intervals.year > 1) {
    timeAgo = `${intervals.year} years ago`;
  } else if (intervals.year === 1) {
    timeAgo = `${intervals.year} year ago`;
  } else if (intervals.month > 1) {
    timeAgo = `${intervals.month} months ago`;
  } else if (intervals.month === 1) {
    timeAgo = `${intervals.month} month ago`;
  } else if (intervals.week > 1) {
    timeAgo = `${intervals.week} weeks ago`;
  } else if (intervals.week === 1) {
    timeAgo = `${intervals.week} weeks ago`;
  } else if (intervals.day > 1) {
    timeAgo = `${intervals.day} days ago`;
  } else if (intervals.day === 1) {
    timeAgo = `${intervals.day} days ago`;
  } else if (intervals.hour > 1) {
    timeAgo = `${intervals.hour} hours ago`;
  } else if (intervals.hour === 1) {
    timeAgo = `${intervals.hour} hour ago`;
  } else if (intervals.minute > 1) {
    timeAgo = `${intervals.minute} minutes ago`;
  } else if (intervals.minute === 1) {
    timeAgo = `${intervals.hour} minute ago`;
  } else {
    timeAgo = `${intervals.second} seconds ago`;
  }

  return timeAgo;
};

export const stripProtocol = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};
