import React, { useState } from 'react';

const Kitkat = () => {
    const [tapCount, setTapCount] = useState(0);

    const handleTap = () => {
        setTapCount(tapCount + 1);
        if ('vibrate' in navigator) {
            navigator.vibrate(200);
        }
    };

    const divStyle = {
        width: '100%',
        height: '100vh',
        backgroundColor: 'red',
        cursor: 'pointer',
    };

    return (
        <div>
            <div>
                <h1>Kitkat Taps: {tapCount}</h1>
            </div>
            <div style={divStyle} onClick={handleTap}></div>
        </div>
    );
};

export default Kitkat;
