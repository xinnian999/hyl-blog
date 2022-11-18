// @ts-nocheck
/* eslint-disable */
import { useEffect, useRef } from "react";

function Ref() {
  useEffect(() => {
    custom(jQuery);
  }, []);

  return (
    <div className="container">
      <h3 id="effect">这是一款灵活的文字特效插件</h3>
      <p id="effect1">基于jquery</p>
    </div>
  );
}

export default Ref;
