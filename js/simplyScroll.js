/**
 * simplyScroll 2 - a scroll-tastic jQuery plugin
 *
 * http://logicbox.net/jquery/simplyscroll/
 *
 * Copyright (c) 2009-2018 Will Kelly - http://logicbox.net
 *
 * @license MIT
 *
 */
!(function (s) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = s(require("jquery"), window, document))
    : s(jQuery, window, document);
})(function ($, n, l, t) {
  var h = {
    customClass: "simply-scroll",
    frameRate: 24,
    speed: 1,
    orientation: "horizontal",
    auto: !0,
    autoMode: "loop",
    manualMode: "end",
    direction: "forwards",
    pauseOnHover: !0,
    pauseOnTouch: !0,
    pauseButton: !($.fn.simplyScroll = function (t) {
      return this.each(function () {
        if (void 0 === $(this).data("simplyScroll")) {
          var s = new $.simplyScroll(this, t);
          $(this).data("simplyScroll", s);
        }
      });
    }),
    startOnLoad: !1,
    initialOffset: 0,
  };
  ($.simplyScroll = function (s, t) {
    var i = this;
    (this.o = $.extend({}, h, t || {})),
      (this.isAuto =
        !1 !== this.o.auto && null !== this.o.autoMode.match(/^loop|bounce$/)),
      (this.isHorizontal =
        null !== this.o.orientation.match(/^horizontal|vertical$/) &&
        this.o.orientation === h.orientation),
      (this.isRTL = this.isHorizontal && "rtl" === $("html").attr("dir")),
      (this.isForwards =
        (!this.isAuto && !this.isRTL) ||
        (this.isAuto &&
          null !== this.o.direction.match(/^forwards|backwards$/) &&
          this.o.direction === h.direction)),
      (this.isLoop =
        (this.isAuto && "loop" === this.o.autoMode) ||
        (!this.isAuto && "loop" === this.o.manualMode)),
      (this.supportsTouch = "createTouch" in l),
      (this.events = this.supportsTouch
        ? {
            start: "touchstart MozTouchDown",
            move: "touchmove MozTouchMove",
            end: "touchend touchcancel MozTouchRelease",
          }
        : { start: "mouseenter", end: "mouseleave" }),
      (this.$list = $(s));
    var o = this.$list.children();
    if (
      (this.$list
        .addClass("simply-scroll-list")
        .wrap('<div class="simply-scroll-clip"></div>')
        .parent()
        .wrap(
          '<div class="' +
            this.o.customClass +
            ' simply-scroll-container"></div>'
        ),
      this.isAuto
        ? this.o.pauseButton &&
          (this.$list
            .parent()
            .parent()
            .prepend(
              '<div class="simply-scroll-btn simply-scroll-btn-pause"></div>'
            ),
          (this.o.pauseOnHover = !1))
        : this.$list
            .parent()
            .parent()
            .prepend('<div class="simply-scroll-forward"></div>')
            .prepend('<div class="simply-scroll-back"></div>'),
      1 < o.length)
    ) {
      var e = !1,
        a = 0;
      this.isHorizontal
        ? (o.each(function () {
            a += $(this).outerWidth(!0);
          }),
          (e = o.eq(0).outerWidth(!0) * o.length !== a))
        : (o.each(function () {
            a += $(this).outerHeight(!0);
          }),
          (e = o.eq(0).outerHeight(!0) * o.length !== a)),
        e &&
          ((this.$list = this.$list
            .wrap("<div></div>")
            .parent()
            .addClass("simply-scroll-list")),
          this.isHorizontal
            ? this.$list.children().css({ float: "left", width: a + "px" })
            : this.$list.children().css({ height: a + "px" }));
    }
    this.o.startOnLoad
      ? $(n).load(function () {
          i.init();
        })
      : this.init();
  }),
    ($.simplyScroll.fn = $.simplyScroll.prototype = {}),
    ($.simplyScroll.fn.extend = $.extend),
    $.simplyScroll.fn.extend({
      init: function () {
        var e = this;
        (this.$items = this.$list.children()),
          (this.$clip = this.$list.parent()),
          (this.$container = this.$clip.parent()),
          (this.$btnBack = $(".simply-scroll-back", this.$container)),
          (this.$btnForward = $(".simply-scroll-forward", this.$container)),
          this.isHorizontal
            ? ((this.itemMax = this.$items.eq(0).outerWidth(!0)),
              (this.clipMax = this.$clip.width()),
              (this.dimension = "width"),
              (this.moveBackClass = "simply-scroll-btn-left"),
              (this.moveForwardClass = "simply-scroll-btn-right"),
              (this.scrollPos = "Left"))
            : ((this.itemMax = this.$items.eq(0).outerHeight(!0)),
              (this.clipMax = this.$clip.height()),
              (this.dimension = "height"),
              (this.moveBackClass = "simply-scroll-btn-up"),
              (this.moveForwardClass = "simply-scroll-btn-down"),
              (this.scrollPos = "Top")),
          (this.posMin = 0),
          (this.posMax = this.$items.length * this.itemMax);
        var s = Math.ceil(this.clipMax / this.itemMax);
        if (
          (this.isAuto && "loop" === this.o.autoMode
            ? (this.$list.css(
                this.dimension,
                this.posMax + this.itemMax * s + "px"
              ),
              (this.posMax += this.clipMax - this.o.speed),
              this.isForwards
                ? (this.$items.slice(0, s).clone(!0).appendTo(this.$list),
                  (this.resetPosition = 0))
                : (this.$items.slice(-s).clone(!0).prependTo(this.$list),
                  (this.resetPosition = this.$items.length * this.itemMax),
                  this.isRTL &&
                    ((this.$clip[0].dir = "ltr"),
                    this.$items.css("float", "right"))))
            : this.isAuto || "loop" !== this.o.manualMode
            ? (this.$list.css(this.dimension, this.posMax + "px"),
              this.isForwards
                ? (this.resetPosition = 0)
                : ((this.resetPosition = this.$items.length * this.itemMax),
                  this.isRTL &&
                    ((this.$clip[0].dir = "ltr"),
                    this.$items.css("float", "right"))))
            : ((this.posMax += this.itemMax * s),
              this.$list.css(
                this.dimension,
                this.posMax + this.itemMax * s + "px"
              ),
              (this.posMax += this.clipMax - this.o.speed),
              this.$items.slice(0, s).clone(!0).appendTo(this.$list),
              this.$items.slice(-s).clone(!0).prependTo(this.$list),
              (this.resetPositionForwards = this.resetPosition =
                s * this.itemMax),
              (this.resetPositionBackwards = this.$items.length * this.itemMax),
              this.$btnBack.bind(this.events.start, function () {
                (e.isForwards = !1),
                  (e.resetPosition = e.resetPositionBackwards);
              }),
              this.$btnForward.bind(this.events.start, function () {
                (e.isForwards = !0),
                  (e.resetPosition = e.resetPositionForwards);
              })),
          this.resetPos(this.o.initialOffset),
          (this.timestamp = null),
          (this.interval = null),
          this.isAuto || "end" !== this.o.manualMode)
        )
          for (; this.itemMax % this.o.speed != 0; )
            if ((this.o.speed--, 0 === this.o.speed)) {
              this.o.speed = 1;
              break;
            }
        if (
          ((this.trigger = null),
          (this.funcMoveBack = function (s) {
            s !== t && s.preventDefault(),
              (e.trigger = e.isAuto || "end" !== e.o.manualMode ? null : this),
              e.isAuto
                ? e.isForwards
                  ? e.moveBack()
                  : e.moveForward()
                : e.moveBack();
          }),
          (this.funcMoveForward = function (s) {
            s !== t && s.preventDefault(),
              (e.trigger = e.isAuto || "end" !== e.o.manualMode ? null : this),
              e.isAuto
                ? e.isForwards
                  ? e.moveForward()
                  : e.moveBack()
                : e.moveForward();
          }),
          (this.funcMovePause = function () {
            e.movePause();
          }),
          (this.funcMoveStop = function () {
            e.moveStop();
          }),
          (this.funcMoveResume = function () {
            e.moveResume();
          }),
          this.isAuto)
        ) {
          function i() {
            return (
              !1 === e.paused
                ? ((e.paused = !0), e.funcMovePause())
                : ((e.paused = !1), e.funcMoveResume()),
              e.paused
            );
          }
          if (
            ((this.paused = !1),
            this.supportsTouch &&
              this.$items.find("a").length &&
              (this.supportsTouch = !1),
            this.isAuto && this.o.pauseOnHover && !this.supportsTouch)
          )
            this.$clip
              .bind(this.events.start, this.funcMovePause)
              .bind(this.events.end, this.funcMoveResume);
          else if (
            this.isAuto &&
            this.o.pauseOnTouch &&
            !this.o.pauseButton &&
            this.supportsTouch
          ) {
            var a, n;
            this.$clip
              .bind(this.events.start, function (s) {
                i();
                var t = s.originalEvent.touches[0];
                (a = e.isHorizontal ? t.pageX : t.pageY),
                  (n = e.$clip[0]["scroll" + e.scrollPos]),
                  s.stopPropagation(),
                  s.preventDefault();
              })
              .bind(this.events.move, function (s) {
                s.stopPropagation(), s.preventDefault();
                var t = s.originalEvent.touches[0],
                  i = e.isHorizontal ? t.pageX : t.pageY,
                  o = a - i + n;
                o < 0 ? (o = 0) : o > e.posMax && (o = e.posMax),
                  (e.$clip[0]["scroll" + e.scrollPos] = o),
                  e.funcMovePause(),
                  (e.paused = !0);
              });
          } else
            this.o.pauseButton &&
              (this.$btnPause = $(
                ".simply-scroll-btn-pause",
                this.$container
              ).bind("click", function (s) {
                s.preventDefault(),
                  i()
                    ? $(this).addClass("active")
                    : $(this).removeClass("active");
              }));
          this.funcMoveForward();
        } else
          this.$btnBack
            .addClass("simply-scroll-btn " + this.moveBackClass)
            .bind(this.events.start, this.funcMoveBack)
            .bind(this.events.end, this.funcMoveStop),
            this.$btnForward
              .addClass("simply-scroll-btn " + this.moveForwardClass)
              .bind(this.events.start, this.funcMoveForward)
              .bind(this.events.end, this.funcMoveStop),
            "end" === this.o.manualMode &&
              (this.isRTL
                ? this.$btnForward.addClass("disabled")
                : this.$btnBack.addClass("disabled"));
      },
      moveForward: function () {
        var i = this;
        (this.movement = "forward"),
          null !== this.trigger && this.$btnBack.removeClass("disabled");
        var o = function (s) {
          if (i.$clip[0]["scroll" + i.scrollPos] < i.posMax - i.clipMax) {
            var t = ((s - (i.timestamp || s)) * i.o.speed) / i.o.frameRate;
            i.$clip[0]["scroll" + i.scrollPos] += Math.ceil(t);
          } else i.isLoop ? i.resetPos() : i.moveStop(i.movement);
          (i.timestamp = s), (i.interval = requestAnimationFrame(o));
        };
        requestAnimationFrame(o);
      },
      moveBack: function () {
        var i = this;
        (this.movement = "back"),
          null !== this.trigger && this.$btnForward.removeClass("disabled");
        var o = function (s) {
          if (i.$clip[0]["scroll" + i.scrollPos] > i.posMin) {
            var t = ((s - (i.timestamp || s)) * i.o.speed) / i.o.frameRate;
            i.$clip[0]["scroll" + i.scrollPos] -= Math.ceil(t);
          } else i.isLoop ? i.resetPos() : i.moveStop(i.movement);
          (i.timestamp = s), (i.interval = requestAnimationFrame(o));
        };
        requestAnimationFrame(o);
      },
      movePause: function () {
        cancelAnimationFrame(this.interval), (this.timestamp = null);
      },
      moveStop: function (s) {
        this.movePause(),
          (this.timestamp = null) !== this.trigger &&
            (void 0 !== s && $(this.trigger).addClass("disabled"),
            (this.trigger = null)),
          this.isAuto &&
            "bounce" === this.o.autoMode &&
            ("forward" === s ? this.moveBack() : this.moveForward());
      },
      moveResume: function () {
        "forward" === this.movement ? this.moveForward() : this.moveBack();
      },
      resetPos: function (s) {
        this.$clip[0]["scroll" + this.scrollPos] = s || this.resetPosition;
      },
    });
});

// index.html에서 가져옴
{
  /* <figure class="main-rolling js-scroll">
  { @dataBanner('4293445377') }{.tag}{ / }
</figure> */
}
