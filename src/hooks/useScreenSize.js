import { useEffect, useState } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const logScreenSize = (size) => {
        // console.log(`Current screen size: ${size.width}px x ${size.height}px`);
    };

    useEffect(() => {
        logScreenSize(screenSize); // Log on initial render

        const handleResize = () => {
            const newSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            setScreenSize(newSize);
            logScreenSize(newSize); // Log updated size
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up on unmount
        };
    }, [screenSize]); // Include screenSize in the dependency array

    return screenSize;
};

export default useScreenSize;
