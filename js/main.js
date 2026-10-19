/* main.js
 * The whole reveal animation, rewritten to run on jQuery 3 and to read every
 * personal detail from config.js. Vanilla-jQuery, no plugins.
 */
(function ($) {
  "use strict";

  var CONFIG = window.CONFIG || { to: "You", from: "", song: "", fireworks: false, message: [] };
  var BALLOON_COLORS = ["#F2B300", "#0719D4", "#D14D39", "#8FAD00", "#8377E4", "#99C96A", "#20CFB4"];

  /* ---- helpers ---------------------------------------------------------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Escape a message line, then substitute the {name} / {from} tokens.
  function fill(line) {
    return esc(line).replace(/\{name\}/g, esc(CONFIG.to)).replace(/\{from\}/g, esc(CONFIG.from));
  }

  /* ---- build the page from CONFIG -------------------------------------- */

  function applyConfig() {
    document.title = "Happy Birthday " + CONFIG.to + " 🥳";
    $(".js-from-name").text(CONFIG.from);
    $("#wish_message").text("Happy Birthday " + CONFIG.to + " 🥳");
    if (CONFIG.song) { $("#song source").attr("src", CONFIG.song); }

    // Balloons spell "HBD" then the recipient's name (up to 7 balloons total).
    var letters = ["HBD"].concat((CONFIG.to || "").toUpperCase().split("")).slice(0, 7);
    var balloons = "";
    $.each(letters, function (i, ch) {
      balloons += '<div class="balloons text-center" id="b' + (i + 1) + '">' +
                    '<h2 style="color:' + BALLOON_COLORS[i % BALLOON_COLORS.length] + '">' +
                      esc(ch) +
                    "</h2>" +
                  "</div>";
    });
    $("#balloon-stage").html(balloons);

    // The story message.
    var story = "";
    $.each(CONFIG.message || [], function (i, line) { story += "<p>" + fill(line) + "</p>"; });
    $(".message .message-body").html(story);
  }

  /* ---- the reveal animation -------------------------------------------- */

  function flyBalloon(sel) {
    var $b = $(sel);
    if (!$b.length) { return; }
    $b.animate({ left: 1000 * Math.random(), bottom: 500 * Math.random() }, 10000, function () {
      flyBalloon(sel);
    });
  }

  function playStory() {
    var $lines = $(".message p");
    var i = 0;
    (function next() {
      if (i >= $lines.length) { $(".cake").fadeIn("fast"); return; }
      $lines.eq(i).fadeIn("slow", function () {
        window.setTimeout(function () { i++; next(); }, 1300);
      });
    })();
  }

  $(function () {
    applyConfig();

    $(window).on("load", function () {
      $(".loading").fadeOut("fast");
      $(".container").fadeIn("fast");
    });

    $("#turn_on").on("click", function () {
      $("#bulb_yellow").addClass("bulb-glow-yellow");
      $("#bulb_red").addClass("bulb-glow-red");
      $("#bulb_blue").addClass("bulb-glow-blue");
      $("#bulb_green").addClass("bulb-glow-green");
      $("#bulb_pink").addClass("bulb-glow-pink");
      $("#bulb_orange").addClass("bulb-glow-orange");
      $("body").addClass("peach");
      $(this).fadeOut("slow").delay(5000).promise().done(function () { $("#play").fadeIn("slow"); });
    });

    $("#play").on("click", function () {
      var audio = $(".song")[0];
      if (audio && audio.play) { var p = audio.play(); if (p && p.catch) { p.catch(function () {}); } }
      $("#bulb_yellow").addClass("bulb-glow-yellow-after");
      $("#bulb_red").addClass("bulb-glow-red-after");
      $("#bulb_blue").addClass("bulb-glow-blue-after");
      $("#bulb_green").addClass("bulb-glow-green-after");
      $("#bulb_pink").addClass("bulb-glow-pink-after");
      $("#bulb_orange").addClass("bulb-glow-orange-after");
      $("body").addClass("peach-after");
      $(this).fadeOut("slow").delay(6000).promise().done(function () { $("#bannar_coming").fadeIn("slow"); });
    });

    $("#bannar_coming").on("click", function () {
      $(".bannar").addClass("bannar-come");
      $(this).fadeOut("slow").delay(6000).promise().done(function () { $("#balloons_flying").fadeIn("slow"); });
    });

    $("#balloons_flying").on("click", function () {
      $(".balloon-border").animate({ top: -500 }, 8000);
      $("#b1,#b4,#b5,#b7").addClass("balloons-rotate-behaviour-one");
      $("#b2,#b3,#b6").addClass("balloons-rotate-behaviour-two");
      for (var i = 1; i <= 7; i++) { flyBalloon("#b" + i); }
      $(this).fadeOut("slow").delay(5000).promise().done(function () { $("#cake_fadein").fadeIn("slow"); });
    });

    $("#cake_fadein").on("click", function () {
      $(".cake").fadeIn("slow");
      $(this).fadeOut("slow").delay(3000).promise().done(function () { $("#light_candle").fadeIn("slow"); });
    });

    $("#light_candle").on("click", function () {
      $(".fuego").fadeIn("slow");
      $(this).fadeOut("slow").promise().done(function () { $("#wish_message").fadeIn("slow"); });
    });

    $("#wish_message").on("click", function () {
      var vw = $(window).width() / 2;
      var offsets = [-350, -250, -150, -50, 50, 150, 250];
      $("#b1,#b2,#b3,#b4,#b5,#b6,#b7").stop();
      for (var i = 1; i <= 7; i++) {
        if (!$("#b" + i).length) { continue; }
        $("#b" + i).attr("id", "b" + i + i);           // b1 -> b11, matching the CSS
        $("#b" + i + i).animate({ top: 240, left: vw + offsets[i - 1] }, 500);
      }
      $(".balloons").css("opacity", "0.9");
      $(".balloons h2").fadeIn(3000);
      if (CONFIG.fireworks && typeof window.startFireworks === "function") { window.startFireworks(); }
      $(this).fadeOut("slow").delay(3000).promise().done(function () { $("#story").fadeIn("slow"); });
    });

    $("#story").on("click", function () {
      $(this).fadeOut("slow");
      $(".cake").fadeOut("fast").promise().done(function () {
        $(".message").fadeIn("slow");
        playStory();
      });
    });
  });
})(jQuery);
