# Deadline Wallpaper

**A little focus, every time you unlock.**

Turn exams, project deadlines, and personal milestones into a calm, personalised phone wallpaper. Built with plain HTML, CSS, and JavaScript — no build step, account, or server required.

**[Open the live app →](https://aaidh.github.io/deadline-wallpaper/)**

## Features

- Live preview rendered with the same canvas used for PNG exports.
- Up to six deadlines, automatically sorted by date.
- Calendar-day countdowns, including today and past dates.
- Five colour themes: Forest, Lavender, Paper, Midnight, and Rose.
- Clearly labelled iPhone and iPhone Large presets, plus Android and Classic sizes.
- Optional space for the lock-screen clock.
- Local browser storage remembers your design.
- Responsive interface, labelled controls, and keyboard support.
- No tracking, external fonts, third-party scripts, or network requests from the app.

## Try it

1. Enter your wallpaper title and choose a resolution.
2. Add deadline names and dates, then choose a colour mood.
3. Download the PNG and set it as your phone wallpaper.

**A downloaded wallpaper is a static image.** Its countdowns do not update automatically. Download a fresh version when needed. Your phone may crop the image depending on wallpaper settings.

## Run locally

Open `index.html` in a modern browser. No installation is needed. Browser storage may be restricted when opening local files; use a static local web server for consistent persistence.

## Project structure

```text
index.html    Accessible editor and preview
style.css     Responsive layout and colour styling
app.js        Date logic, local storage, canvas rendering, and export
icon.svg      Original application icon
```

## Publish with GitHub Pages

In the repository, open **Settings → Pages**, select **Deploy from a branch**, and choose **main / (root)**. The app uses relative asset paths so it works under a repository URL.

## Privacy

Deadline information stays in local storage on the current browser profile. Nothing is uploaded by this application. Downloaded PNGs contain the text you put on them. Hosting providers handle their own normal web request logs.

## Contributing

Bug reports and focused improvements are welcome. For a bug, include your browser, screen size, reproduction steps, and expected result. Use fictional deadlines in screenshots.

Before submitting a change, check: mobile layout, all themes and resolutions, adding/removing six deadlines, today/past dates, reload persistence, and PNG downloads. Keep the app dependency-free and usable without an account.

## License

[MIT](LICENSE) © 2026 [aaidh](https://github.com/aaidh)
