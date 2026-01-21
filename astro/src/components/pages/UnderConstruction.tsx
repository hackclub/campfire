import '../../styles/global.css';
import { useState, useRef } from 'react';
import clsx from 'clsx';
 
const FORM_URL_SIGN_UP = "https://forms.hackclub.com/campfire-signup";

interface UnderConstructionProps {
    event_name: string;
    record_id?: string;
}

function UnderConstruction({ event_name, record_id }: UnderConstructionProps) {
    const [email, setEmail] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);

    function openWithEmail(url: string) {
        if (!emailRef?.current?.reportValidity() || !email)
            return;

        window.open(`${url}?email=${encodeURIComponent(email)}&event=${encodeURIComponent(record_id || "")}`, "_blank");
    }

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
                <div className="flex flex-col gap-8 items-center max-w-[648px] w-full">
                    {/* Logo section */}
                    <div className="flex md:block flex-col items-center justify-center">
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
                                {event_name.toUpperCase()}
                            </h3>
                        </div>

                        <div className="pl-2 md:pl-4">
                            <p
                                className="text-white text-4xl md:text-3xl xl:text-4xl font-bold mb-2 font-ember-and-fire text-center"
                                style={{
                                    textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                                }}
                            >
                                This site is still under construction!
                            </p>
                            <p
                                className="text-white text-4xl md:text-3xl xl:text-4xl font-bold font-ember-and-fire text-center"
                                style={{
                                    textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                                }}
                            >
                                You can still sign up below:
                            </p>
                        </div>
                    </div>

                    {/* RSVP form */}
                    <div className='flex flex-col gap-4'>
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            <div
                                className={clsx(
                                    "bg-[#f9e2ca] border-4 border-[#d5a16c] rounded-[20px] px-4 md:px-8 py-4 flex items-center gap-3 md:gap-6 w-full transform md:rotate-[-1.2deg] shadow-[0_8px_20px_rgba(0,0,0,0.25)]",
                                    "transition-transform hover:scale-105"
                                )}
                            >
                                <img src="/icons/email.svg" alt="" className="w-6 h-5 flex-shrink-0 select-none" />
                                <input
                                    required
                                    ref={emailRef}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    type="email"
                                    className="text-[#854d16] text-2xl md:text-4xl font-bold truncate bg-transparent border-none outline-none flex-1 cursor-text font-ember-and-fire"
                                    placeholder="you@hackclub.com"
                                />
                            </div>

                            <button
                                className="bg-[#fca147] border-[5px] border-[rgba(0,0,0,0.2)] rounded-[20px] px-8 md:px-14 py-4 hover:scale-105 transition-transform w-full md:w-auto transform md:rotate-[1.5deg] shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer active:scale-95"
                                type="button"
                                onClick={() => openWithEmail(FORM_URL_SIGN_UP)}
                            >
                                <p
                                    className="text-[#8d3f34] text-3xl md:text-5xl font-normal font-dream-planner whitespace-nowrap"
                                >
                                    SIGN UP!
                                </p>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnderConstruction;