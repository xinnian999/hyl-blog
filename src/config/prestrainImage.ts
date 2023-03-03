let prestrainImagePath = [
  "/img/bg/bg14.jpg",
  "/img/bg/bg12.png",
  "/img/bg/bg13.jpg",
  "/img/bg/bg15.jpg",
  "/img/bg/bg16.jpg",
];

prestrainImagePath = prestrainImagePath.map((item) =>
  require(`@/assets${item}`)
);

export default prestrainImagePath;
