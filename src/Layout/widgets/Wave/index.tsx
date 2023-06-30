import animate from "./animate";
import { useMount } from "@/hooks";
import "./style.scss";

const Wave: React.FC = () => {
  useMount(() => {
    animate();
  });
  return (
    <div className="wave-box">
      <div className="marquee-box marquee-up" id="marquee-box">
        <div className="marquee">
          <div className="wave-list-box" id="wave-list-box1">
            <ul>
              <li>
                <img height="60" alt="波浪" src={require("./wave_02.png")} />
              </li>
            </ul>
          </div>
          <div className="wave-list-box" id="wave-list-box2">
            <ul>
              <li>
                <img height="60" alt="波浪" src={require("./wave_02.png")} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="marquee-box" id="marquee-box3">
        <div className="marquee">
          <div className="wave-list-box" id="wave-list-box4">
            <ul>
              <li>
                <img height="60" alt="波浪" src={require("./wave_01.png")} />
              </li>
            </ul>
          </div>
          <div className="wave-list-box" id="wave-list-box5">
            <ul>
              <li>
                <img height="60" alt="波浪" src={require("./wave_01.png")} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wave;
