/* Pure local-calendar calculations; shared by the browser and optional Node tests. */
(function (root) {
  'use strict';
  function thanksgiving(year) {
    const first = new Date(year, 10, 1);
    return new Date(year, 10, 1 + ((4 - first.getDay() + 7) % 7) + 21);
  }
  function journeyState(now) {
    const year = now.getFullYear();
    const start = new Date(year, 10, 1);
    const end = thanksgiving(year);
    const nextDay = new Date(year, 10, end.getDate() + 1);
    const phase = now < start ? 'before' : now < end ? 'traveling' : now < nextDay ? 'thanksgiving' : 'after';
    const progress = Math.max(0, Math.min(1, (now - start) / (end - start)));
    // Calendar days, avoiding 23- or 25-hour days at daylight-saving transitions.
    const calendarDay = date => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const days = Math.max(0, Math.round((calendarDay(end) - calendarDay(now)) / 86400000));
    return { year, start, end, phase, progress, days };
  }
  root.HellJourney = { thanksgiving, journeyState };
  if (typeof module !== 'undefined') module.exports = root.HellJourney;
})(typeof window !== 'undefined' ? window : globalThis);
