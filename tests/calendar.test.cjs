const assert = require('node:assert/strict');
const {thanksgiving, journeyState} = require('../journey.js');
for (let year = 2000; year <= 2100; year++) {
  const end = thanksgiving(year);
  assert.equal(end.getDay(), 4);
  assert.ok(end.getDate() >= 22 && end.getDate() <= 28);
  assert.equal(end.getMonth(), 10);
  const start = new Date(year, 10, 1);
  assert.equal(journeyState(start).progress, 0);
  assert.equal(journeyState(new Date(+start - 1)).phase, 'before');
  assert.equal(journeyState(new Date(+end - 1)).phase, 'traveling');
  assert.ok(journeyState(new Date(+end - 1)).progress < 1);
  assert.equal(journeyState(end).progress, 1);
  assert.equal(journeyState(end).phase, 'thanksgiving');
  assert.equal(journeyState(new Date(year, 10, end.getDate(), 23, 59, 59)).phase, 'thanksgiving');
  assert.equal(journeyState(new Date(year, 10, end.getDate() + 1)).phase, 'after');
  assert.equal(journeyState(new Date((+start + +end) / 2)).progress, .5);
  assert.equal(journeyState(new Date(year, 10, end.getDate() - 1, 23, 59)).days, 1);
}
assert.equal(thanksgiving(2026).getDate(), 26);
assert.equal(thanksgiving(2027).getDate(), 25);
assert.equal(thanksgiving(2028).getDate(), 23);
assert.equal(journeyState(new Date(2026, 10, 1, 0, 0)).days, 25);
assert.equal(journeyState(new Date(2026, 11, 31)).phase, 'after');
assert.equal(journeyState(new Date(2027, 0, 1)).phase, 'before');
console.log(`Calendar tests passed, 2000–2100 (${process.env.TZ || 'system timezone'}).`);
