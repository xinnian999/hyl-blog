(function () {
  "use strict";

  function isInEffect(effect) {
    return (
      /In/.test(effect) ||
      $.inArray(effect, $.fn.textillate.defaults.inEffects) >= 0
    );
  }

  function isOutEffect(effect) {
    return (
      /Out/.test(effect) ||
      $.inArray(effect, $.fn.textillate.defaults.outEffects) >= 0
    );
  }

  // custom get data api method
  function getData(node) {
    var attrs = node.attributes || [],
      data = {};

    if (!attrs.length) return data;

    $.each(attrs, function (i, attr) {
      if (/^data-in-*/.test(attr.nodeName)) {
        data.in = data.in || {};
        data.in[attr.nodeName.replace(/data-in-/, "")] = attr.nodeValue;
      } else if (/^data-out-*/.test(attr.nodeName)) {
        data.out = data.out || {};
        data.out[attr.nodeName.replace(/data-out-/, "")] = attr.nodeValue;
      } else if (/^data-*/.test(attr.nodeName)) {
        data[attr.nodeName] = attr.nodeValue;
      }
    });

    return data;
  }

  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  function animate($c, effect, cb) {
    $c.addClass("animated " + effect)
      .css("display", "inline")
      .show();
    $c.one("animationend webkitAnimationEnd oAnimationEnd", function () {
      $c.removeClass("animated " + effect);
      cb && cb();
    });
  }

  function animateChars($chars, options, cb) {
    var that = this,
      count = $chars.length;

    if (!count) {
      cb && cb();
      return;
    }

    if (options.shuffle) shuffle($chars);

    $chars.each(function (i) {
      var $this = $(this);

      function complete() {
        if (isInEffect(options.effect)) {
          $this.css("display", "inline");
        } else if (isOutEffect(options.effect)) {
          $this.css("display", "none");
        }
        count -= 1;
        if (!count && cb) cb();
      }

      var delay = options.sync
        ? options.delay
        : options.delay * i * options.delayScale;

      $this.text()
        ? setTimeout(function () {
          animate($this, options.effect, complete);

          if (i + 1 === $chars.length) {
            $(".autograph-cursor").css("animation-play-state", "");
          }
        }, delay)
        : complete();
    });
  }

  var Textillate = function (element, options) {
    var base = this,
      $element = $(element);
    $(".autograph").css("opacity", 1);

    base.init = function () {
      base.$texts = $element.find(options.selector);

      if (!base.$texts.length) {
        base.$texts = $(
          '<ul class="texts"><li>' + $element.text() + "</li></ul>"
        );
        $element.html(base.$texts);
      }

      base.$texts.hide();

      base.$current = $("<span>")
        .text(base.$texts.find(":first-child").text())
        .prependTo($element);
      if (isInEffect(options.effect)) {
        base.$current.css("display", "none");
      } else if (isOutEffect(options.effect)) {
        base.$current.css("display", "inline");
      }

      base.setOptions(options);

      $element.css("display", "none");
      setTimeout(function () {
        $element.css("display", "inline");
        $(".autograph-cursor").css("animation-play-state", "paused");
        base.options.autoStart && base.start();
      }, base.options.initialDelay);
    };

    base.setOptions = function (options) {
      base.options = options;
    };

    base.start = function (index) {
      var $next = base.$texts.find(":nth-child(" + (index || 1) + ")");

      (function run($elem) {
        var options = $.extend({}, base.options, getData($elem));
        base.$current.text($elem.text()).lettering("words");

        base.$current
          .find('[class^="word"]')
          .css({
            display: "inline-block",
            // fix for poor ios performance
            "-webkit-transform": "translate3d(0,0,0)",
            "-moz-transform": "translate3d(0,0,0)",
            "-o-transform": "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)",
          })
          .each(function () {
            $(this).lettering();
          });

        var $chars = base.$current
          .find('[class^="char"]')
          .css("display", "inline-block");

        if (isInEffect(options.in.effect)) {
          $chars.css("display", "none");
        } else if (isOutEffect(options.in.effect)) {
          $chars.css("display", "inline");
        }

        animateChars($chars, options.in, function () {
          setTimeout(function () {
            // in case options have changed
            var options = $.extend({}, base.options, getData($elem));

            var $next = $elem.next();

            if (base.options.loop && !$next.length) {
              $next = base.$texts.find(":first-child");
            }

            if (!$next.length) return;

            animateChars($chars, options.out, function () {
              run($next);
            });
          }, base.options.minDisplayTime);
        });
      })($next);
    };

    base.init();
  };

  $.fn.textillateBanner = function (settings, args) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data("textillate"),
        options = $.extend(
          true,
          {},
          $.fn.textillate.defaults,
          getData(this),
          typeof settings == "object" && settings
        );

      if (!data) {
        $this.data("textillate", (data = new Textillate(this, options)));
      } else if (typeof settings == "string") {
        data[settings].apply(data, [].concat(args));
      } else {
        data.setOptions.call(data, options);
      }
    });
  };
})();
