// @ts-nocheck
/* eslint-disable */

function textCustom() {
  $(function () {
    $(".text2").textillate({
      in: {
        effect: "rollIn",
        delay: 200,
      },
      out: {
        effect: "rollOut",
        delayScale: 1.5,
        delay: 50,
        sync: true,
        shuffle: true,
        reverse: false,
        callback: function () {},
      },
      loop: true,
      minDisplayTime: 3000,
    });
    $(".text1").textillate({
      minDisplayTime: 5000,
      in: {
        effect: "flipInX",
        delay: 200,
      },
      out: {
        effect: "fadeOut",
        delayScale: 1.5,
        delay: 0,
        sync: true,
        shuffle: true,
        reverse: false,
        callback: function () {},
      },
      loop: true,
    });
  });
}

export default textCustom;
