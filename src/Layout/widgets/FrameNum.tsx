import {useEffect, useState} from "react";
import styled from "styled-components";

const FrameNumWrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 999;
  color: #fff;
  text-shadow: 1px 1px #000;
`;


const FrameNum: React.FC = () => {
    const [frameCount, setFrameCount] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [fps, setFPS] = useState(0);

    useEffect(() => {
        let animationFrameId;

        function calculateFPS(timestamp) {
            if (!startTime) {
                setStartTime(timestamp);
            }

            const elapsed = timestamp - startTime;
            setFrameCount((prevFrameCount) => prevFrameCount + 1);

            if (elapsed >= 1000) {
                const calculatedFPS = frameCount / (elapsed / 1000);
                setFPS(Math.round(calculatedFPS));

                setFrameCount(0);
                setStartTime(timestamp);
            }

            animationFrameId = requestAnimationFrame(calculateFPS);
        }

        animationFrameId = requestAnimationFrame(calculateFPS);

        return () => cancelAnimationFrame(animationFrameId);
    }, [frameCount, startTime]);

    return <FrameNumWrapper>FPS：{fps}</FrameNumWrapper>;
};

export default FrameNum;
