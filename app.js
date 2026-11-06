(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const { journeyState } = window.HellJourney;
  const route = $('route');
  const length = route.getTotalLength();
  let preview = false;
  let previewYear = new Date().getFullYear();
  let firstRender = true;
  let lastPhase;
  const dateLabel = date => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  function render(now, center = false) {
    const state = journeyState(now);
    const { progress, phase, days, year, end } = state;
    const percentage = progress * 100;
    // Do not round to 100 until the feast is actually reached.
    const shown = progress < 1 ? Math.min(99.9, percentage).toFixed(1) : '100';
    $('percent').textContent = shown;
    $('days').textContent = days;
    $('days-unit').textContent = days === 1 ? 'day' : 'days';
    $('year').textContent = year;
    $('end-date').textContent = `${dateLabel(end).toUpperCase()} · Out of office`;
    $('progress-fill').style.width = `${percentage}%`;
    $('progress').setAttribute('aria-valuenow', percentage.toFixed(2));
    $('progress').setAttribute('aria-valuetext', `${shown}% completed; ${days} days until Thanksgiving`);
    $('traveler-title').textContent = `Traveler: ${shown}% of the way from NDA Hell to Thanksgiving`;
    $('mode-label').textContent = preview ? 'TIME MACHINE · PREVIEW MODE' : 'THE GREAT NOVEMBER ESCAPE';
    let title, description, kicker = 'CURRENT PREDICAMENT';
    if (phase === 'before') {
      title = 'Your escape begins November 1.';
      description = 'Rest your legs. The paperwork is already warming up.';
      kicker = 'AWAITING THE ANNUAL INFERNO';
    } else if (phase === 'thanksgiving') {
      title = 'You made it. Pass the pie.';
      description = 'Happy Thanksgiving! Your only obligation is a second helping.';
      kicker = 'ESCAPE SUCCESSFUL';
    } else if (phase === 'after') {
      title = 'Out of hell. Into leftovers.';
      description = 'This year’s escape is complete. A new journey begins next November 1.';
      kicker = 'MISSION DELICIOUSLY ACCOMPLISHED';
    } else if (progress < 0.3) {
      title = 'Still within singeing distance.';
      description = 'Keep walking. Do not initial anything on the way out.';
    } else if (progress < 0.65) {
      title = 'Somewhere beyond the fine print.';
      description = 'The inbox is fading. A suspiciously good smell is ahead.';
    } else {
      title = 'Gravy is on the horizon.';
      description = 'You can see the table. Try to maintain a dignified pace.';
    }
    $('status-kicker').textContent = kicker;
    $('status-title').textContent = title;
    $('status-description').textContent = description;
    $('days-caption').textContent = phase === 'after' ? 'UNTIL THIS YEAR’S FEAST · ARRIVED' : 'UNTIL THANKSGIVING';
    $('destination').textContent = progress === 1 ? 'DESTINATION: REACHED' : 'DESTINATION: GRAVY';
    $('footnote').textContent = preview ? 'You’re taking a practice escape.' : phase === 'before' ? 'The journey starts November 1, at midnight.' : phase === 'after' ? 'Enjoy the leftovers. You earned them.' : 'The calendar moves. So do you.';
    document.body.classList.toggle('escaped', progress === 1);
    const point = route.getPointAtLength(length * progress);
    $('traveler').setAttribute('transform', `translate(${point.x} ${point.y})`);
    if (firstRender || center) {
      const viewport = $('map-scroll');
      viewport.scrollLeft = point.x / 1440 * viewport.scrollWidth - viewport.clientWidth / 2;
      firstRender = false;
    }
    if (phase !== lastPhase) {
      // Announce meaningful state changes, not every clock tick.
      $('status-title').setAttribute('aria-live', 'polite');
      lastPhase = phase;
    }
    if (preview) $('demo-date').textContent = `${dateLabel(now)} · ${shown}%`;
  }
  function renderPreview() {
    const state = journeyState(new Date(previewYear, 10, 1));
    render(new Date(+state.start + (state.end - state.start) * Number($('demo-range').value) / 100), true);
  }
  function goLive() {
    preview = false;
    $('demo-panel').hidden = true;
    $('demo-toggle').setAttribute('aria-expanded', 'false');
    $('demo-toggle').focus();
    render(new Date(), true);
  }
  $('demo-toggle').addEventListener('click', () => {
    if (preview) return goLive();
    const now = new Date();
    previewYear = now.getFullYear();
    preview = true;
    $('demo-panel').hidden = false;
    $('demo-toggle').setAttribute('aria-expanded', 'true');
    $('demo-range').value = journeyState(now).progress * 100;
    renderPreview();
    $('demo-range').focus();
  });
  $('demo-range').addEventListener('input', renderPreview);
  $('live-button').addEventListener('click', goLive);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !preview) render(new Date()); });
  render(new Date());
  setInterval(() => { if (!preview) render(new Date()); }, 1000);
})();
