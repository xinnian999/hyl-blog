const animate = () => {
  var marqueeScroll = function ({ id1, id2, id3, timer }) {
    var $parent = $('#' + id1);
    var $goal = $('#' + id2);
    var $closegoal = $('#' + id3);
    $closegoal.html($goal.html());
    function Marquee() {
      if (parseInt($parent.scrollLeft()) - $closegoal.width() >= 0) {
        $parent.scrollLeft(parseInt($parent.scrollLeft()) - $goal.width());
      } else {
        $parent.scrollLeft($parent.scrollLeft() + 1);
      }
    }
    setInterval(Marquee, timer);
  };
  new marqueeScroll({
    id1: 'marquee-box',
    id2: 'wave-list-box1',
    id3: 'wave-list-box2',
    timer: 20,
  });
  new marqueeScroll({
    id1: 'marquee-box3',
    id2: 'wave-list-box4',
    id3: 'wave-list-box5',
    timer: 40,
  });
};

export default animate;
