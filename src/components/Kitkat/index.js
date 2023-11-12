import React, { useState, useEffect } from 'react';
import punch from './punch.mp3';
import gifImage from './punchkill.gif';
import desktopImage from './desktop.jpeg'; // Replace with the actual path to your desktop image
import mobileImage from './mobile.jpeg'; // Replace with the actual path to your mobile image

const Kitkat = () => {
    const [tapCount, setTapCount] = useState(0);
    const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
    const [animationVisible, setAnimationVisible] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(desktopImage);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setBackgroundImage(mobileImage);
            } else {
                setBackgroundImage(desktopImage);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call the function initially to set the background based on the initial window size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        left: `calc(${animationPosition.x}px - 10%)`,
        top: `calc(${animationPosition.y}px - 10%)`,
    };


    const playTapSound = () => {
        const audio = new Audio(punch);
        audio.play();
    };

    window.innerWidth < 768 ? document.body.style.color = 'white' : document.body.style.color = 'black';

    const divStyle = {
        width: '100%',
        height: '100vh',
        cursor: 'pointer',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
    };

    return (
        <div>
            <div style={divStyle} onClick={handleTap}>
                <h1 style={{ fontFamily: "'Pixelify Sans', sans-serif", fontSize: '4rem' }}>Punches: {tapCount}</h1>
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
