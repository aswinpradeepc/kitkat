import React, { useState } from 'react';
import punch from './punch.mp3';
import gifImage from './punchkill.gif';

const Kitkat = () => {
    const [tapCount, setTapCount] = useState(0);
    const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
    const [animationVisible, setAnimationVisible] = useState(false);

    const handleTap = (event) => {
        playTapSound();
        setTapCount(tapCount + 1);
        setAnimationVisible(true);

        // Get the coordinates of the tap
        const x = event.clientX;
        const y = event.clientY;
        setAnimationPosition({ x, y });

        // Vibrate
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        }
        setTimeout(() => {
            setAnimationVisible(false)
        }, 600);
    };

    const animationStyle = {
        position: 'absolute',
        left: `${animationPosition.x}px`,
        top: `${animationPosition.y}px`,
    };

    const playTapSound = () => {
        const audio = new Audio(punch);
        audio.play();
    };

    const divStyle = {
        width: '100%',
        height: '100vh',
        backgroundColor: 'red',
        cursor: 'pointer',
    };

    return (
        <div>
            <div style={divStyle} onClick={handleTap}>
                <h1>Kitkat Taps: {tapCount}</h1>
                {animationVisible &&
                    <img
                        key={tapCount}
                        src={gifImage}
                        alt="Animation"
                        style={animationStyle}
                    />
                }
            </div>
        </div>
    );
};

export default Kitkat;
