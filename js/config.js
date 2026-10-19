/* config.js
 * ---------------------------------------------------------------------------
 * Everything personal about the greeting lives here. Edit this file — you
 * never need to touch index.html or the CSS.
 *
 * You can also override the name/sender/song at runtime with URL parameters,
 * so a single deployed page can greet anyone:
 *
 *     ?to=Sneha&from=Rahul&song=another-song.mp3
 *
 * Inside the message you can use the tokens {name} and {from}.
 * ---------------------------------------------------------------------------
 */
(function () {
  "use strict";

  var DEFAULTS = {
    // ---- who the greeting is for / from --------------------------------
    to: "Sneha",
    from: "Ankit",

    // ---- the song played by the "Play Music" button --------------------
    song: "hbd.mp3",

    // ---- celebration fireworks on the final reveal ---------------------
    fireworks: true,

    // ---- the "A message for you" story, one line per paragraph ---------
    message: [
      "Today is... 😊",
      "as beautiful as other days 🌞",
      "but you realize 😮",
      "another year has gone ⏳",
      "in a blink of the eyes 👀",
      "however 🤔",
      "Do you know..? 🤔",
      "today is just special 🎉",
      "so special to you ❤️",
      "that's why 🎁",
      "Let's make it... 🎈",
      "the best celebration ever 🥳",
      "and let me share... 🎁",
      "a piece of happiness to you 😊",
      "I made all this... 🎁",
      "as a birthday present to you 🎂",
      "thanks for being there 🙏",
      "thanks for the friendship we made 👫",
      "thanks for everything 🌟",
      "I wish you all the best 🌠",
      "May your life be at ease 🙌",
      "May all your wishes come true 🌠",
      "Remember 🤔",
      "your ambitions 🌟",
      "you live as a free bird... 🦅",
      "flying in the blue sky 🌌",
      "Now things are different... 🔄",
      "real story of your life 📖",
      "is just about to begin 🚀",
      "indeed.. 🤗",
      "but... 😊",
      "don't worry 😌",
      "because... 🙏",
      "God has your back 🙏",
      "and 🤗",
      "this year will be better 🌟",
      "and I hope 🙏",
      "you'll find... 😊",
      "happiness along the way 🌈",
      "keep your spirit up 🌟",
      "enjoy every single moment... ⏳",
      "that you experience today 😊",
      "fill it with your most beautiful smile 😊",
      "and make it the best memory.. 🎉",
      "lastly... 🎉",
      "I'd like to wish you one more time",
      "a very Happy Birthday {name} 🥳"
    ]
  };

  var qs = new URLSearchParams(window.location.search);

  window.CONFIG = {
    to: qs.get("to") || DEFAULTS.to,
    from: qs.get("from") || DEFAULTS.from,
    song: qs.get("song") || DEFAULTS.song,
    fireworks: DEFAULTS.fireworks,
    message: DEFAULTS.message
  };
})();
