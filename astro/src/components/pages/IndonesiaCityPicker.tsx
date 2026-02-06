import '../../styles/global.css';
import clsx from 'clsx';

const CITIES: Array<{ name: string; slug: string; accent: string; rotateClassName: string }> = [
    { name: 'Medan', slug: 'medan', accent: '#FCA147', rotateClassName: 'md:rotate-[-1.2deg]' },
    { name: 'Jakarta', slug: 'jakarta', accent: '#FF7A59', rotateClassName: 'md:rotate-[1.4deg]' },
    { name: 'Bandung', slug: 'bandung', accent: '#7DD3FC', rotateClassName: 'md:rotate-[-0.6deg]' },
    { name: 'Solo', slug: 'solo', accent: '#A7F3D0', rotateClassName: 'md:rotate-[0.8deg]' },
    { name: 'Malang', slug: 'malang', accent: '#FDE68A', rotateClassName: 'md:rotate-[-1deg]' },
];

function IndonesiaCityPicker() {
    return (
        <div className="w-full min-h-screen flex flex-col overflow-hidden relative bg-[#fca84a]">
            {/* Background layers */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                    src="/backgrounds/blue-sky.webp"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover select-none"
                />
                <img
                    src="/backgrounds/sky-shine.webp"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover select-none"
                />
                <img
                    src="/backgrounds/landing-grass.png"
                    alt=""
                    className="absolute bottom-0 left-0 w-full h-auto object-cover select-none"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-16">
                <div className="flex flex-col gap-8 items-center max-w-[720px] w-full">
                    {/* Logo section */}
                    <div className="flex flex-col items-center justify-center">
                        <div className='w-fit'>
                            <div className="flex items-center gap-3 mb-4 relative z-30">
                                <a href='https://hackclub.com' className='transition-transform hover:scale-105 active:scale-95'>
                                    <img
                                        src="/decorative/flag-standalone-wtransparent.png"
                                        alt="Hack Club"
                                        className="w-[151px] h-[53px] object-cover transform rotate-[-4.8deg] select-none"
                                        style={{
                                            filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.25))"
                                        }}
                                    />
                                </a>
                                <div className="w-[2px] h-8 bg-white opacity-60"></div>
                                <a href='https://opensauce.com' className='transition-transform scale-125 hover:scale-130 active:scale-130'>
                                    <img
                                        src="/branding/logo-opensauce.webp"
                                        alt="Open Sauce"
                                        className="h-[70px] object-contain select-none pl-4"
                                        style={{
                                            filter: "drop-shadow(3px 3px 0px rgba(0,0,0,0.25))"
                                        }}
                                    />
                                </a>
                            </div>

                            <div className="transform md:rotate-[-2.97deg] w-min">
                                <h1
                                    className="text-[#fcf5ed] text-[80px] md:text-[100px] xl:text-[150px] font-normal leading-none -mb-4 font-dream-planner"
                                    style={{
                                        textShadow: "5px 8px 0px rgba(0,0,0,0.25)"
                                    }}
                                >
                                    CAMPFIRE
                                </h1>
                                <h3
                                    className="text-[#fcf5ed] text-[40px] md:text-[50px] xl:text-[60px] font-normal leading-none mb-4 font-dream-planner text-right"
                                    style={{
                                        textShadow: "5px 8px 0px rgba(0,0,0,0.25)"
                                    }}
                                >
                                    INDONESIA
                                </h3>
                            </div>
                        </div>

                        <div className="pl-2 md:pl-4">
                            <p
                                className="text-white text-3xl md:text-2xl xl:text-3xl font-bold mb-2 font-ember-and-fire text-center"
                                style={{
                                    textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                                }}
                            >
                                Pick your city to view the event page.
                            </p>
                            <p
                                className="text-white text-4xl md:text-3xl xl:text-4xl font-bold font-ember-and-fire text-center"
                                style={{
                                    textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                                }}
                            >
                                Where are you joining from?
                            </p>

                        </div>
                    </div>

                    {/* City selector */}
                    <nav aria-label="Select a city" className="w-full">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {CITIES.map(city => (
                                <li key={city.slug}>
                                    <a
                                        href={`/${city.slug}`}
                                        className={clsx(
                                            "block w-full",
                                            "bg-[#f9e2ca] border-4 border-[#d5a16c] rounded-[22px] px-6 py-5",
                                            "shadow-[0_8px_20px_rgba(0,0,0,0.25)]",
                                            "transition-transform hover:scale-[1.03] active:scale-[0.98]",
                                            "focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60",
                                            city.rotateClassName
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-12 h-12 rounded-[14px] border-4 border-[rgba(0,0,0,0.15)] shadow-[0_4px_0px_rgba(0,0,0,0.15)] flex items-center justify-center"
                                                    style={{ backgroundColor: city.accent }}
                                                    aria-hidden="true"
                                                >
                                                    <span className="font-dream-planner text-[#8d3f34] text-4xl leading-none">
                                                        {city.name.slice(0, 1).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-dream-planner text-[#8d3f34] text-5xl leading-none">
                                                        {city.name}
                                                    </div>
                                                    <div className="font-ember-and-fire text-[#8d3f34]/80 text-xl">
                                                        Go to /{city.slug}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/60 border-2 border-white/70"
                                                aria-hidden="true"
                                            >
                                                <span className="text-[#8d3f34] text-2xl">→</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <p
                        className="text-white text-xl md:text-2xl font-bold font-ember-and-fire text-center"
                        style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
                    >
                        Made with ❤️ by Campfire Indonesia Organizers
                    </p>
                </div>
            </div>
        </div>
    )
}

export default IndonesiaCityPicker;