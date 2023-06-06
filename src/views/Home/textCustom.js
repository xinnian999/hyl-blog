const textCustom = () => {
  $(".autograph-text").textillateBanner({
    in: {
      effect: "FlipInX",
      delay: 100,
      delayScale: 1,
    },
    initialDelay: 2000,
    loop: true,
    minDisplayTime: 3000,
  });
};

export default textCustom;
