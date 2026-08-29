import React from 'react';
import clsx from 'clsx';

interface CampfireFrameProps {
    cityName: string;
    className?: string;
}

export const CampfireFrame: React.FC<CampfireFrameProps> = ({ cityName, className }) => {
    return (
        <div className={clsx("absolute inset-0 pointer-events-none z-10 flex flex-col justify-between overflow-hidden", className)}>

            {/* Assets */}
            <img
                src="/watermark.png"
                alt="Watermark Frame"
                className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
                onError={(e) => e.currentTarget.style.display = 'none'}
            />

            {/* Dynamic Text Overlay - Bottom Right */}
            <div className="absolute bottom-[14%] right-[10%] z-30 text-right flex flex-col items-end transform -rotate-6 origin-bottom-right">
                {/* "CAMPFIRE" - Static */}
                <h1 className="dream-font text-5xl md:text-7xl text-white drop-shadow-[3.3px_3.3px_0px_rgba(0,0,0,0.77)] uppercase leading-[0.6]">
                    CAMPFIRE
                </h1>

                {/* City Name - Dynamic */}
                <h2 className="dream-font text-3xl md:text-5xl text-white drop-shadow-[3.3px_3.3px_0px_rgba(0,0,0,0.77)] uppercase leading-[0.8] mt-1">
                    {cityName || 'YOUR CITY'}
                </h2>
            </div>
        </div>

    );
};
