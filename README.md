# Hell to Thanksgiving

An illustrated, entirely static escape from Non-Disclosure Agreement Hell to Thanksgiving dinner. Original SVG artwork, system fonts, plain HTML, CSS and JavaScript. No installs, build step, accounts, external requests or tracking.

## Preview it — no web development experience needed

1. Download `hell2thanksgiving.zip` and unzip it.
2. Open the `hell2thanksgiving` folder.
3. Double-click `index.html`. It opens in your normal web browser.
4. Click **Take a practice escape** below the map. Move the slider to watch the traveler walk from the gates to the feast. At 100%, you can preview the celebration.
5. Click **Back to real life** to return to your actual local date and time.

Keep `index.html`, `styles.css`, `journey.js`, `app.js`, and the `assets` folder together. Opening only a downloaded HTML file without its companion files will not work correctly. You do not need to run a server. On narrow screens, swipe the map sideways to see both destinations; it initially centers on your traveler.

If you already use Python and prefer a local server, run `python3 -m http.server 8000` from the folder containing `hell2thanksgiving`, then visit `http://localhost:8000/hell2thanksgiving/`. This is optional.

## How the calendar works

- Starts November 1 at midnight in each visitor’s local time zone.
- Ends at midnight at the start of the fourth Thursday of November, calculated automatically for the current year.
- Progress is the elapsed time divided by the actual time between those two local midnights, including daylight-saving changes. The traveler’s position updates every second along the winding road.
- Days remaining counts local calendar days, so the day before Thanksgiving shows 1 even near midnight.
- The complete Thanksgiving day shows the escape celebration. After Thanksgiving the traveler stays at the feast for leftovers. From January 1 through October 31, the next annual journey waits at the gates.
- Preview mode is temporary, clearly labeled, and never changes the live date or stores anything.
- Reduced-motion preferences disable the arrival bounce.

## Files

- `index.html`: page content and traveler illustration
- `styles.css`: responsive layout, typography and animation
- `journey.js`: pure calendar calculations
- `app.js`: countdown, traveler movement and preview controls
- `assets/landscape.svg`: original landscape artwork, including gate, road, cottage and feast
- `assets/favicon.svg`: small browser-tab icon
- `tests/calendar.test.cjs`: optional developer calendar checks; not required to run the website

## GitHub Pages — later, when you are ready to publish

**Nothing has been uploaded, published, or changed in Hover.** These are instructions for a future deployment you approve.

For the repository named `hell2thanksgiving`, the publishable files belong at the repository root: `index.html`, `styles.css`, `journey.js`, `app.js`, `.nojekyll`, and `assets/`. Do not upload an extra enclosing `hell2thanksgiving` directory inside the repository. The README and tests are optional.

Once you choose to publish, GitHub’s repository **Settings → Pages** can deploy from your main branch, root folder. Before a custom domain is configured, a project repository normally appears at `https://YOUR-GITHUB-USERNAME.github.io/hell2thanksgiving/`. Every site asset uses relative paths, so the same files also work under your custom domain at `/hell2thanksgiving/`.

### Important: a domain and a path are different things

Hover’s DNS points a hostname (such as `example.com`) at a host; it cannot route only the `/hell2thanksgiving/` path. The correct future setup depends on where the rest of your domain is hosted:

- **If your domain already points to your GitHub user/organization Pages site:** a project Pages site can inherit that custom domain and live at `https://YOUR-DOMAIN/hell2thanksgiving/`. Leave this project’s custom-domain setting empty; configure the domain on the user/organization site.
- **If another provider hosts your domain:** place this static folder at `/hell2thanksgiving/` on that host, or deliberately plan a domain-level migration/proxy. Changing Hover DNS would affect the hostname, not just this page.

Do not put a URL path in a DNS record or a GitHub Pages custom-domain field. No `CNAME` file is included because the domain and existing hosting setup have not been supplied or changed.

## Validation

Calendar checks cover every year from 2000 through 2100: the fourth Thursday, start and arrival boundaries, Thanksgiving day, post-holiday state, midpoint, day counts and year rollover. They pass under UTC, America/New_York, Europe/London and Pacific/Auckland.

To run them yourself (optional, requires Node.js): `node tests/calendar.test.cjs`.

JavaScript syntax, local file references and SVG syntax were also checked. A rendered browser review was unavailable in the build environment. Before publishing, open the page in your browser, try the preview slider at 0%, 50% and 100%, and resize to a narrow/mobile width.
