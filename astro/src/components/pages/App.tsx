import '../../styles/global.css';
import FaqQuestion from '../primitives/FaqQuestion.js';
import FaqButton from '../primitives/FaqButton.js';
import Step from '../primitives/Step.js';
import StoryCard from '../primitives/StoryCard.js';
import GameCard from '../primitives/GameCard.js';
import NavbarLink from '../primitives/NavbarLink.tsx';
import VideoEmbed from '../primitives/VideoEmbed.tsx';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const FORM_URL_ORGANIZER_APPLICATION = "https://forms.hackclub.com/t/8L51MzWyrHus";
const FORM_URL_RSVP = "https://forms.hackclub.com/t/a3QSt8MuvHus";
const FORM_URL_SIGN_UP = "https://forms.hackclub.com/campfire-signup";

function FlagshipCTA({ className, compact, maxWidth }: { className?: string; compact?: boolean; maxWidth?: boolean }) {
  return (
    <div className={className}>
      <a
        href="https://flagship.hackclub.com?utm_source=campfire-website"
        target="_blank"
        rel="noopener"
        className={clsx(
          "flex items-center rounded-[20px] transition-transform hover:scale-105 active:scale-95 cursor-pointer",
          compact ? "gap-4 px-6 py-3" : "gap-8 px-8 py-4",
          maxWidth && "max-w-2xl"
        )}
        style={{
          backgroundColor: '#F9E2CA',
          border: '4px solid #D5A16C',
          boxShadow: '-6px 10px 0px 0px rgba(0,0,0,0.25)'
        }}
      >
        <img
          src="/compressed/branding/logo-flagship.png"
          alt="Campfire Flagship"
          className={clsx("object-contain select-none", compact ? "h-10" : "h-12 md:h-14")}
        />
        <span
          className={clsx(
            "text-[#854d16] font-bold font-ember-and-fire",
            compact ? "text-xl" : "text-2xl md:text-3xl"
          )}
        >
          {compact ? "Join our flagship in LA with Open Sauce creators!" : "Come to our flagship event in Los Angeles with William Osman and Michael Reeves!"}
        </span>
      </a>
    </div>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(document.body.scrollTop);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.location.pathname === '/flagship') {
      window.location.href = 'https://flagship.hackclub.com?utm_source=campfire_landing_page';
      return;
    }

    // Redirect with r parameter to signup form
    const urlParams = new URLSearchParams(window.location.search);
    const rParam = urlParams.get('r');
    if (rParam) {
      window.location.href = `${FORM_URL_SIGN_UP}?r=${encodeURIComponent(rParam)}`;
      return;
    }

    document.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
    
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  function openWithEmail(url: string) {
    if (!emailRef?.current?.reportValidity() || !email)
      return;

    window.open(`${url}?email=${encodeURIComponent(email)}`, "_blank");
  }

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <div className="absolute -top-16 -left-8 w-1/3 z-20 pointer-events-none hidden min-[860px]:block">
        <img 
          src="/compressed/backgrounds/corner-cloud.webp" 
          alt=""
          className="w-full h-full object-cover select-none transform -rotate-12"
        />
      </div>

      <div className="w-full h-screen">
        <header className="relative h-[60px] md:h-[115px] bg-[#45b4f5] justify-end items-center content-center md:pr-16 hidden sm:flex">
          <nav className="flex gap-4 w-full justify-between px-8 md:px-0 text-2xl md:gap-12 items-center md:justify-end text-white md:text-3xl xl:text-5xl font-bold font-ember-and-fire">
            <NavbarLink onClick={() => scrollToSection('steps')}>How to organize</NavbarLink>
            {/* <NavbarLink onClick={() => scrollToSection('map')}>Map</NavbarLink> */}
            {/* <NavbarLink onClick={() => scrollToSection('letter')}>Letter</NavbarLink> */}
            <NavbarLink onClick={() => scrollToSection('previous-events')}>Past events</NavbarLink>
            <NavbarLink onClick={() => scrollToSection('games-made')}>Games made</NavbarLink>
            <NavbarLink onClick={() => scrollToSection('faq')}>FAQ</NavbarLink>
          </nav>
        </header>

        <section className={clsx(
            "relative h-full px-6 md:px-16 md:px-24 2xl:px-32 bg-[url(/backgrounds/blue-sky.webp)] bg-center bg-cover",
            windowHeight > windowWidth && windowWidth < 860 ? "flex items-stretch pb-16" : "flex items-end pb-32 2xl:pb-48"
          )}>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <img src="/backgrounds/sky-shine.webp" alt="" className="w-full h-full object-cover select-none" />
          </div>

          <div
            className="absolute bottom-[32px] right-[40px] md:right-[140px] w-full h-full pointer-events-none"
            style={{
              transform: isLargeScreen ? `translateY(${-scrollY / 12}px)` : undefined
            }}
          >
            {/* fishy on the right. His name is frederick. */}
            <div className="absolute top-[128px] md:top-[96px] right-[-50px] md:right-[100px] w-1/3 md:w-[200px]">
              <img src="/compressed/characters/fish-2.webp" alt="Fish named Frederick" className="w-full h-full object-cover select-none" />
            </div>

            {/* fishy on the left. His name is gubson */}
            <div className="absolute top-[96px] md:top-[60px] right-[-10px] md:right-[300px] w-1/3 md:w-[200px]">
              <img src="/compressed/characters/fish-1.webp" alt="Fish named Gubson" className="w-full h-full object-cover select-none" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full max-h-[120vh] overflow-hidden pointer-events-none md:animate-cloud-float-right">
            <img
              src="/backgrounds/bottom-cloud.webp"
              alt=""
              className="w-full h-full object-cover object-top select-none"
              style={{
                transform: isLargeScreen ? `translateY(${-scrollY / 5}px)` : undefined
              }}
            />
          </div>
 
          <div className="absolute -bottom-[50px] left-0 w-full h-[120px] pointer-events-none">
            <img
              src="/decorative/vines.webp"
              alt=""
              className="w-full h-full object-cover object-top select-none"
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start xl:items-center w-full gap-8 pb-16 z-30 h-full pt-16 md:pt-0 md:h-auto">
            <div className={clsx(
              "flex flex-col gap-4 w-full md:w-[648px]",
              windowHeight > windowWidth && windowWidth < 860 && "justify-between h-full"
            )}>
              <div className="mb-6">
                {windowWidth >= 400 && <FlagshipCTA className="min-[860px]:hidden -mt-12 mb-8" compact={windowWidth < 500} />}

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
                
                <div className="transform md:rotate-[-2.97deg]">
                  <h1 
                    className="text-[#fcf5ed] text-[80px] md:text-[100px] xl:text-[150px] font-normal leading-none mb-4 font-dream-planner"
                    style={{ 
                      textShadow: "5px 8px 0px rgba(0,0,0,0.25)"
                    }}
                  >
                    CAMPFIRE
                  </h1>
                </div>

                <div className="pl-2 md:pl-4">
                  <p 
                    className="text-white text-4xl md:text-3xl xl:text-4xl font-bold mb-2 font-ember-and-fire"
                    style={{ 
                      textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                    }}
                  >
                    Game jam for high schoolers in 200+ cities
                  </p>
                  <p 
                    className="text-white text-4xl md:text-3xl xl:text-4xl font-bold font-ember-and-fire"
                    style={{ 
                      textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                    }}
                  >
                    Feb 28 - Mar 1, 2026
                  </p>
                </div>
              </div>

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
                      defaultValue="you@hackclub.com"
                    />
                  </div>
                  
                  <button 
                    className="bg-[#fca147] border-[5px] border-[rgba(0,0,0,0.2)] rounded-[20px] px-8 md:px-14 py-4 hover:scale-105 transition-transform w-full md:w-auto transform md:rotate-[1.5deg] shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer active:scale-95"
                    type="button"
                    onClick={() => openWithEmail(FORM_URL_SIGN_UP)}
                  >
                    <p 
                      className="text-[#8d3f34] text-3xl md:text-5xl font-normal font-dream-planner"
                    >
                    SIGN UP!
                    </p>
                  </button>
                </div>

                <div className='font-ember-and-fire text-white text-4xl pl-2 -translate-y-1 md:rotate-[-1.2deg]' style={{
                  textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                }}>
                  Looking for our <a
                    className='underline inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95'
                    href='https://flagship.hackclub.com?utm_source=campfire-website'
                  >flagship</a> event?<br />...or <span
                    className='underline inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95'
                    onClick={() => openWithEmail(FORM_URL_ORGANIZER_APPLICATION)}
                  >
                    organize
                  </span> your own event!
                </div>
              </div>
            </div>

            <VideoEmbed className="hidden xl:block self-end mb-8" />
          </div>
        </section>

        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <img
            src="/compressed/backgrounds/landing-grass.webp"
            alt=""
            className="w-full h-full object-cover select-none"
            style={{
              transform: isLargeScreen ? `translateY(${scrollY / 10}px)` : undefined
            }}
          />
        </div>
      </div>

      <section className="relative pb-96 bg-[url(/backgrounds/underwater-gradient.webp)] bg-cover bg-top">
        <div className="xl:hidden pt-16 pb-8 relative z-10">
          <VideoEmbed className="px-6" />
        </div>
        <div className="pt-[8vw] xl:pt-[13vw]"></div>
        <div className="absolute top-0 left-0 w-screen h-[200px] bg-gradient-to-b from-[#004b2a] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 xl:top-[30px] left-0 w-full scale-125 pointer-events-none z-50">
          <img src="/decorative/vines.webp" alt="" className="w-full h-full object-cover select-none" />
        </div>

        <div className="absolute bottom-[30px] left-0 w-full h-[800px] z-0 pointer-events-none">
          <img src="/decorative/clouds-3.webp" alt="" className="w-full h-full object-cover select-none object-top" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-[613px] z-0 pointer-events-none">
          <img src="/backgrounds/seafloor.webp" alt="" className="w-full h-full object-cover select-none" />
        </div>
        
        <div className="absolute bottom-[200px] left-32 w-[569px] h-[676px] pointer-events-none">
          <img 
            src="/compressed/characters/astronaut.webp" 
            alt="" 
            className="w-full h-full object-cover transform rotate-[172deg] scale-y-[-1] select-none"
          />
        </div>
        
        <div className="absolute top-[0px] z-45 right-0 w-[150px] md:w-[352px] pointer-events-none">
          <img
            src="/compressed/decorative/cogs-top-right.webp" alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>

        <div className="absolute invisible md:visible top-[55%] z-45 left-0 w-[260px] pointer-events-none">
          <img src="/compressed/decorative/cogs-mid-left.webp" alt="" className="w-full h-full object-contain select-none" />
        </div>
        
        <div className="absolute invisible md:visible top-[75%] z-45 right-0 translate-x-20 w-[280px] pointer-events-none">
          <img src="/compressed/decorative/single-cog-1.webp" alt="" className="w-full h-full object-contain select-none" />
        </div>

        <div className="absolute invisible md:visible top-[82%] z-45 left-0 translate-x-10 w-[280px] pointer-events-none">
          <img src="/compressed/decorative/single-cog-2.webp" alt="" className="w-full h-full object-contain select-none" />
        </div>

        <div id="steps" className="relative z-40 flex flex-col gap-24 items-center px-12 max-w-7xl mx-auto pt-12 md:pt-0">
          <Step 
            stepNumber={1}
            imageSrc="/compressed/ui/step-signup.jpeg"
            imageAlt="Step 1"
          >
            Sign up for a <br></br><span className="font-bold text-[#F77034]">Campfire</span> near you
          </Step>

          <Step 
            stepNumber={2}
            imageSrc="/compressed/ui/step-team.webp"
            imageAlt="Step 2"
            isReversed={true}
          >
            Grab <span className="font-bold text-[#F77034]">friends</span> (or make new friends!) and <span className='font-bold'>form a <span className='text-[#F77034]'>team of 2-3</span></span>
          </Step>

          <Step 
            stepNumber={3}
            imageSrc="/compressed/ui/step-workshops.webp"
            imageAlt="Step 3"
          >
            Learn from <span className="text-[#F77034] font-bold">workshops</span>, enjoy <span className='font-bold'>free food and merch!</span>
          </Step>

          <Step 
            stepNumber={4}
            imageSrc="/compressed/ui/step-build.webp"
            imageAlt="Step 4"
            isReversed={true}
          >
            <span className="text-[#F77034] font-bold">Build</span> your game & <span className="text-[#F77034] font-bold">publish</span> it on itch.io!
          </Step>
          
          <div className="flex justify-end mt-12">
            <button 
              className="bg-[#E77232] rounded-[20px] px-16 py-8 transform rotate-[2deg] hover:scale-105 transition-transform shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer active:scale-95 animate-float-up-down"
              type="button"
              onClick={() => window.open("https://docs.google.com/document/d/14sMLsvxpBFtdzNOvmMJyjIrggKdaXLJ2GMiOoBcE8-M/", "_blank")}
            >
              <p 
                className="text-5xl md:text-6xl font-normal font-dream-planner"
                style={{ color: "rgba(255, 255, 255, 0.69)" }}
              >
                READ MORE
              </p>
            </button>
          </div>
        </div>
      </section>

      <section className="relative h-full md:h-[800px] pb-8 px-8 z-30 -mt-96">
        <div className="absolute top-0 left-0 w-full h-[900px] pointer-events-none">
          <img src="/decorative/clouds-3-symmetric.webp" alt="" className="w-full h-full select-none" />
        </div>

        <div id="letter" className="relative w-full h-full z-50 translate-y-20 min-[1200px]:translate-y-64 flex justify-center">
          <img src='/compressed/backgrounds/world-map-left.webp' alt='' className='h-full hidden min-[1200px]:block' />
          <div className='flex items-center min-[1200px]:block min-[1200px]:relative'>
            <img src='/backgrounds/world-map-right.webp' alt='' className='h-full hidden min-[1200px]:block' />
            <div className='min-[1200px]:absolute min-[1200px]:top-0 min-[1200px]:left-0 py-12 min-[1200px]:py-16 min-[1200px]:pb-0 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] min-[1200px]:rounded-none min-[1200px]:shadow-none min-[1200px]:pt-30 pl-6 min-[1200px]:pl-12 pr-6 min-[1200px]:pr-64 text-xl bg-[#EAD6BE] border-[#DCA87E] border-4 min-[1200px]:border-0 min-[1200px]:bg-transparent flex flex-col gap-6 font-solway'>
              <h1>Dear hacker,</h1>
              <p>
                You can make a change: inspire someone to build a game for the first time, help someone
                fall in love with computers, run an <i>incredible</i> game jam that you can invite all your
                friends to. 
              </p>

              <p><b>This February, what if you organized a game jam in your city?</b></p>

              <p>
                Hack Club will provide guides, funding, merch, and 1-on-1 mentorship. Our goal?
                Run 200 game jams in 200 cities worldwide. All on the same day. All run by high
                schoolers like us.
              </p>

              <p>
                To kick off 2026, we’re so excited to invite you to Campfire. In just a couple
                months, you will learn how to raise money for your event, buy food and drinks
                for your attendees, and make your own video games with your friends!
              </p>

              <p>
                Let’s go on an adventure together.
              </p>

              <p>
                With love, <br />
                The Campfire Team
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#384fbc] bg-cover bg-center z-20 pt-90 md:pt-180 -mt-[25vw] pb-0 bg-[url(/backgrounds/blue-gradient.webp)]">
        <div className="absolute bottom-48 md:bottom-0 left-0 w-full pointer-events-none scale-250 md:scale-100">
          <img
            src="/decorative/clouds-1.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>

        <div className="absolute bottom-48 left-32 md:bottom-0 md:left-0 w-[80vw] pointer-events-none scale-250 md:scale-100">
          <img 
            src="/decorative/moon-composite.webp" 
            alt="" 
            className="w-full h-full object-contain transform rotate-[346deg] select-none"
          />
        </div>

        <div className="absolute bottom-[-160px] md:bottom-[64px] translate-y-full scale-300 md:scale-105 left-0 w-full pointer-events-none">
          <img
            src="/decorative/puzzle-composite.webp"
            alt=""
            className="w-full h-full object-cover select-none"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-12 items-center md:px-24 w-full md:w-auto md:max-w-7xl mx-auto">
          <h2
            id="previous-events"
            className="text-[#d7cfeb] text-6xl font-bold text-center mb-8 font-ember-and-fire"
            style={{ 
              textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
            }}
          >
            Stories from past events
          </h2>
          
          <div className="flex flex-col min-[1050px]:flex-row gap-12 justify-between w-full items-center">
            <StoryCard 
              imageSrc="/stories/counterspell.webp"
              imageAlt=""
              titleImageSrc="/compressed/branding/logo-counterspell.webp"
              titleImageAlt="Counterspell logo"
              description="Our first worldwide game jam! In 50 cities including Toronto, Boston, & Singapore"
              videoButtonText='Watch the video'
              videoUrl="https://www.youtube.com/watch?v=H5RPsCMl3uM"
              videoButtonColor="#FF4186"
              eventUrl="https://counterspell.hackclub.com/"
            />

            <StoryCard 
              imageSrc="/stories/scrapyard.webp"
              imageAlt=""
              titleImageSrc="/branding/logo-scrapyard.svg"
              titleImageAlt="Scrapyard logo"
              description="Build stupid stuff, get stupid prizes! In-person hackathon in 70+ cities."
              videoButtonText='Check out vid!'
              videoUrl="https://www.youtube.com/watch?v=8iM1W8kXrQA"
              videoButtonColor="#AF8D67"
              eventUrl="https://scrapyard.hackclub.com/"
            />

            <StoryCard 
              imageSrc="/compressed/stories/daydream.webp"
              imageAlt=""
              titleImageSrc="/compressed/branding/logo-daydream.webp"
              titleImageAlt="Daydream logo"
              description="Game jam in 100 cities worldwide -- from London to NYC to Penang!"
              videoButtonText='Video here!'
              videoUrl="https://www.youtube.com/watch?v=vvdoW2gh9YU"
              videoButtonColor="#3F709A"
              eventUrl="https://daydream.hackclub.com/"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#384fbc] pt-[40vw] md:pt-[25vw] z-10">
        <div className="flex flex-col gap-8 items-center px-8 max-w-7xl mx-auto pb-16">
          <h2
            id="games-made"
            className="text-[#f1ebff] text-6xl font-bold text-center mb-8 font-ember-and-fire"
            style={{ 
              textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
            }}
          >
            Favorite games from past events
          </h2>
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-5 w-full justify-between">
            <GameCard 
              imageSrc="/games/office-click-clack.webp"
              imageAlt="Office Click Clack"
              title="Office Click Clack"
              author="bunnyguy - Daydream DFW"
              href="https://theavgeekbee.itch.io/office-click-clack"
            />

            <GameCard 
              imageSrc="/games/zero-sum.webp"
              imageAlt="Zero Sum"
              title="Zero Sum"
              author="ARandomPsi - Daydream SV"
              href="https://arandompsi.itch.io/zero-sum"
            />

            <GameCard 
              imageSrc="/games/return-to-sender.webp"
              imageAlt="Return to The Sender"
              title="Return to The Sender"
              author="i1rs7 - Daydream Global"
              href="https://i1rs7.itch.io/return-to-the-sender"
            />
          </div>
          
          <div className="flex justify-center mt-12">
            <button 
              className="bg-[#45B4F5] rounded-[20px] px-12 py-6 transform rotate-[-2deg] hover:scale-105 transition-transform shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer active:scale-95"
              type="button"
              onClick={() => window.open("https://itch.io/jam/daydream-global", "_blank")}
            >
              <p className="text-white text-4xl md:text-5xl font-normal font-dream-planner">
                CHECK OUT TOP SUBMISSIONS!
              </p>
            </button>
          </div>
        </div>

        <div className="scale-250 translate-y-64 pb-48 md:pb-0 md:translate-y-0 md:scale-105 left-0 w-full pointer-events-none">
          <img
            src="/decorative/puzzle-cloud-bottom.webp"
            alt=""
            className="w-full h-full object-cover select-none"
          />
        </div>
      </section>

      <section className="relative pb-64 bg-[#384FBC] md:bg-[#081F8B]">
        <div className="absolute w-full h-full z-10 pointer-events-none invisible md:visible">
          <img 
            src="/compressed/decorative/speech-bubble-bg.webp" 
            alt=""
            className="w-full h-full select-none pointer-events-none"
          />
        </div>

        <div className="relative z-10 md:px-32">
          <h2
            id="faq"
            className="text-[#d7cfeb] text-[128px] font-bold text-center mb-16 font-ember-and-fire"
            style={{ 
              textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
            }}
          >
            FAQ
          </h2>

          <div className="flex flex-col md:flex-row gap-32 md:gap-10 justify-center items-center md:items-start">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-0 md:w-[608px] pointer-events-none flex flex-col min-h-[105%]">
                <img src="/ui/woodboard-1-top.svg" alt="" className="w-full flex-shrink-0 select-none" />
                <div className="bg-[#AD684F] flex-1 w-full py-4"></div>
                <img src="/ui/woodboard-1-bottom.svg" alt="" className="w-full flex-shrink-0 select-none" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-10 items-center md:px-16 pt-8 w-[100%] md:w-[608px]">
                <p 
                  className="text-[#d7cfeb] text-6xl font-bold text-center mb-4 font-ember-and-fire"
                  style={{ 
                    textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                  }}
                >
                  Participant
                </p>
                
                <FaqQuestion question="What is a game jam?">
                  A game jam is an event where you build a game from scratch in a short time period! It's all about creativity, teamwork, and having fun while learning new skills.
                </FaqQuestion>
                <FaqQuestion question="Am I eligible?">
                  If you're a high schooler (or younger), you're eligible! No prior experience required - just bring your enthusiasm and willingness to learn.
                </FaqQuestion>
                <FaqQuestion question="But I've never hacked before!">
                  Perfect! Game jams are designed for beginners. You'll have workshops, mentors, and teammates to help you every step of the way.
                </FaqQuestion>
                <FaqQuestion question="All this, for free?">
                  Yes! Everything is completely free - venue, food, swag, workshops, and prizes. Hack Club covers all costs so you can focus on creating.
                </FaqQuestion>
                <FaqQuestion question="What do I need to bring?">
                  Just bring yourself, a laptop, charger, and any personal items you need. We'll provide food, drinks, and everything else!
                </FaqQuestion>
                <FaqButton content="Check out the parent guide" />
              </div>
            </div>

            <div className="relative w-full md:w-auto">
              <div className="absolute inset-0 md:w-[608px] pointer-events-none flex flex-col min-h-[105%]">
                <img src="/ui/woodboard-2-top.svg" alt="" className="w-full flex-shrink-0 select-none" />
                <div className="bg-[#AD684F] flex-1 w-full"></div>
                <img src="/ui/woodboard-2-bottom.svg" alt="" className="w-full flex-shrink-0 select-none" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-10 items-center px-4 md:px-16 pt-9 w-full md:w-[608px]">
                <p 
                  className="text-[#d7cfeb] text-6xl font-bold text-center mb-4 font-ember-and-fire"
                  style={{ 
                    textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                  }}
                >
                  Organizer
                </p>
                
                <FaqQuestion question="Can I organize a Campfire in my city?">
                  Absolutely! We're always looking for passionate organizers. If you're ready to bring the magic of game development to your community, we'd love to help.
                </FaqQuestion>
                <FaqQuestion question="What are the steps to organizing?">
                  First, apply through our organizer form. Then we'll guide you through venue booking, team building, workshop planning, and day-of coordination.
                </FaqQuestion>
                <FaqQuestion question="Do we get funding?">
                  Yes! Hack Club provides funding for venue, food, swag, and other event costs. We want to remove financial barriers for amazing events.
                </FaqQuestion>
                <FaqQuestion question="Do we get volunteer hours?">
                  Many schools accept organizing hours as community service. Check with your school's requirements - we can provide documentation.
                </FaqQuestion>
                <FaqQuestion question="Can I join an organizing team?">
                  Of course! Many cities have organizing teams. Reach out to organizers in your area or apply to join an existing team.
                </FaqQuestion>
                <FaqButton href={FORM_URL_ORGANIZER_APPLICATION} content="Apply to be an organizer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative flex flex-col z-0 -mt-80">
        <img
          src="/backgrounds/footer-background.webp"
          alt=""
          className="w-full h-[50vw] object-bottom object-cover select-none scale-105"
        />

        <div className="relative w-full px-4 pb-32 md:pb-16 md:px-0 bg-[#0f371d] -mt-3 flex flex-col items-center justify-center gap-16 md:gap-6 z-10">
          <p 
            className="text-white text-3xl md:text-3xl text-center font-bold font-ember-and-fire"
            style={{ 
              textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
            }}
          >
            made with love by Hack Club & Open Sauce
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-16 max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center md:items-end gap-4 text-white text-4xl md:text-3xl font-ember-and-fire font-bold z-20">
              <a href="https://hackclub.com/" target="_blank" className="hover:underline">Hack Club</a>
              <a href="https://hackclub.com/slack" target="_blank" className="hover:underline">Slack</a>
              <a href="https://hackclub.com/clubs" target="_blank" className="hover:underline">Clubs</a>
              <a href="https://hackclub.com/conduct/" target="_blank" className="hover:underline">Code of Conduct</a>
            
              <p className="text-white text-sm md:text-md text-right max-w-96 font-ember-and-fire">
                © 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
              </p>
            </div>
            
            <div className="flex-1 text-left">
              <p className="text-white text-lg md:text-xl font-ember-and-fire leading-relaxed mb-4">
                Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical high schoolers. We believe you learn best by building so we're creating community and providing grants so you can make awesome projects. In the past few years, we've partnered with GitHub to run <a href="https://summer.hackclub.com/" target="_blank" className="underline hover:text-gray-300">Summer of Making</a>, hosted the <a href="https://github.com/hackclub/the-hacker-zephyr" target="_blank" className="underline hover:text-gray-300">world's longest hackathon on land</a>, and ran <a href="https://www.youtube.com/watch?v=QvCoISXfcE8" target="_blank" className="underline hover:text-gray-300">Canada's largest high school hackathon</a>.
              </p>
              <p className="text-white text-lg md:text-xl font-ember-and-fire font-bold">
                At Hack Club, students aren't just learning, they're shipping.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
