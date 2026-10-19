# 🎂 Birthday Wisher

A config-driven, animated **Happy Birthday** page. Turn on the lights, play a song,
release the balloons, light the candle, and reveal a personal message — all with a
little celebration fireworks finale.

**Live demo:** https://cyberphantomxpert.github.io/Birthday-Wisher/

## Features

- Step-by-step animated reveal: lights → music → banner → balloons → cake → candle → message
- **Config-driven** — change the name, sender, song and message in one file (`js/config.js`); no HTML editing
- **Shareable per-recipient links** — `?to=Sneha&from=Ankit` personalises the whole page at runtime
- Celebration fireworks on the final reveal
- Lightweight and dependency-honest: no Bootstrap, no runtime LESS, no tracking scripts
- Responsive and mobile-friendly, with `prefers-reduced-motion` support

## Make it yours

Open **`js/config.js`** and edit the `DEFAULTS` block:

```js
var DEFAULTS = {
  to: "Sneha",      // who it's for
  from: "Ankit",    // who it's from
  song: "hbd.mp3",  // any audio file you drop in the repo
  fireworks: true,  // celebration fireworks on the final reveal
  message: [ /* one line per paragraph; {name} and {from} are substituted */ ]
};
```

…or override it from the URL without touching any code:

```
https://cyberphantomxpert.github.io/Birthday-Wisher/?to=Sneha&from=Rahul
```

## Run it locally

With Python:

```bash
python3 -m http.server 8081
# open http://localhost:8081
```

Or with Node:

```bash
npm install
npm start
```

## Project structure

```
.
├── index.html          # single, valid document
├── css/
│   ├── layout.css      # small grid/utility layer (replaces Bootstrap 3)
│   └── cake.css        # compiled from the original cake.less
├── js/
│   ├── config.js       # <-- all the personal bits live here
│   ├── main.js         # the reveal animation
│   └── fireworks.js    # canvas celebration
├── stylesheet.css      # the core animation styles
├── loading.css         # the loading spinner
├── assets              # balloons, bulbs, banner, song
└── README.md
```

## Credits

Built on the classic open-source "Happy Birthday" CSS animation. Refactored,
modernised and made config-driven.
