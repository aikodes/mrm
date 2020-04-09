/* eslint-disable */
export function timeAgo(selector) {
  const templates = {
    prefix: '',
    suffix: ' ago',
    seconds: '1 minute',
    minute: '1 minute',
    minutes: '%d minutes',
    hour: '1 hour',
    hours: '%d hours',
    day: '1 day',
    days: '%d days',
    month: '1 month',
    months: '%d months',
    year: '1 year',
    years: '%d years',
  };
  const template = function(t, n) {
    return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
  };

  const timer = function(time) {
    if (!time) return;
    time = time.replace(/\.\d+/, ''); // remove milliseconds
    time = time.replace(/-/, '/').replace(/-/, '/');
    time = time.replace(/T/, ' ').replace(/Z/, ' UTC');
    time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    time = new Date(time * 1000 || time);

    const now = new Date();
    const seconds = ((now.getTime() - time) * 0.001) >> 0;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365;

    return (
      templates.prefix +
      ((seconds < 45 && template('seconds', seconds)) ||
        (seconds < 90 && template('minute', 1)) ||
        (minutes < 45 && template('minutes', minutes)) ||
        (minutes < 90 && template('hour', 1)) ||
        (hours < 24 && template('hours', hours)) ||
        (hours < 42 && template('day', 1)) ||
        (days < 30 && template('days', days)) ||
        (days < 45 && template('month', 1)) ||
        (days < 365 && template('months', days / 30)) ||
        (years < 1.5 && template('year', 1)) ||
        template('years', years)) +
      templates.suffix
    );
  };

  const elements = document.getElementsByClassName('js-timeago');
  for (const i in elements) {
    const $this = elements[i];
    if (typeof $this === 'object') {
      $this.innerHTML = timer(
        $this.getAttribute('title') || $this.getAttribute('datetime')
      );
    }
  }
  // update time every minute
  setTimeout(timeAgo, 60000);
}
