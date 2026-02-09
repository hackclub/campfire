import FaqQuestion from '../primitives/FaqQuestion.js';
import FaqButton from '../primitives/FaqButton.js';
import Step from '../primitives/Step.js';
import GameCard from '../primitives/GameCard.js';
import NavbarLink from '../primitives/NavbarLink.tsx';
import MapEmbed from '../primitives/MapEmbed.tsx';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import type { SatelliteContent } from '../../lib/satellite.ts';
import EmailInput from '../primitives/EmailInput.tsx';
import { openWithEmail } from '../../lib/email.ts';

function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <span key={i} className="font-bold text-[#F77034]">{part.slice(2, -2)}</span>;
        }
        if (part.startsWith('__') && part.endsWith('__')) {
          return <span key={i} className="font-bold">{part.slice(2, -2)}</span>;
        }
        return part;
      })}
    </>
  );
}

const FORM_URL_ORGANIZER_APPLICATION = "https://forms.hackclub.com/t/8L51MzWyrHus";
const FORM_URL_RSVP = "https://forms.hackclub.com/t/a3QSt8MuvHus";
const FORM_URL_SIGN_UP = "https://forms.hackclub.com/campfire-signup";

function App({slug, content, record_id}: {slug: string | undefined, content: SatelliteContent, record_id: string | undefined}) {
  const [email, setEmail] = useState("");
  const [scrollY, setScrollY] = useState(document.body.scrollTop);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
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

  const handleOpenWithEmail = (url: string) => openWithEmail(email, url, emailRef, record_id, `satellite-${content.event.city}`);

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
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
            {/* <NavbarLink onClick={() => scrollToSection('steps')}>{content.nav.howToOrganize}</NavbarLink> */}
            {/* <NavbarLink onClick={() => scrollToSection('map')}>Map</NavbarLink> */}
            {/* <NavbarLink onClick={() => scrollToSection('letter')}>Letter</NavbarLink> */}
            {/* <NavbarLink onClick={() => scrollToSection('schedule')}>{content.nav.schedule}</NavbarLink> */}
            {/* <NavbarLink onClick={() => scrollToSection('games-made')}>{content.nav.gamesMade}</NavbarLink> */}
            {/* <NavbarLink onClick={() => scrollToSection('faq')}>{content.nav.faq}</NavbarLink> */}
            {
              Object.keys(content.localization.nav).map(key => (
                <NavbarLink key={key} onClick={() => scrollToSection(key)}>{content.localization.nav[key]}</NavbarLink>
              ))
            }
          </nav>
        </header>

        <section className={clsx(
            "relative min-h-[750px] px-6 md:px-16 md:px-24 2xl:px-32 bg-[url(/backgrounds/blue-sky.webp)] bg-center bg-cover",
            windowHeight > windowWidth && windowWidth < 860 ? "flex items-stretch pb-0" : "h-full flex items-end pb-32 2xl:pb-48"
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

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start xl:items-center w-full gap-8 pb-16 z-30 h-full pt-16 md:pt-0 md:h-auto">
            <div className="flex flex-col gap-4 w-full md:w-[648px]">
              <div className="mb-6">
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
                    {content.localization.hero.campfire}
                  </h1>
                  <h3
                    className="text-[#fcf5ed] text-[40px] md:text-[50px] xl:text-[60px] font-normal leading-none mb-4 font-dream-planner text-right"
                    style={{
                      textShadow: "5px 8px 0px rgba(0,0,0,0.25)"
                    }}
                  >
                    {content.event.city.toUpperCase()}
                  </h3>
                </div>

                <div className="pl-2 md:pl-4">
                  <p
                    className="text-white text-4xl md:text-3xl xl:text-4xl font-bold mb-2 font-ember-and-fire"
                    style={{
                      textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                    }}
                  >
                    {content.localization.hero.subtitle}
                  </p>
                  <p
                    className="text-white text-4xl md:text-3xl xl:text-4xl font-bold mb-2 font-ember-and-fire"
                    style={{
                      textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                    }}
                  >
                    {content.localization.hero.hostedAt}
                    <a href={content.event.venue.link} target="_blank" rel="noopener noreferrer" className="underline">
                      {content.event.venue.name}
                    </a>
                  </p>
                  <p
                    className="text-white text-4xl md:text-3xl xl:text-4xl font-bold font-ember-and-fire"
                    style={{
                      textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                    }}
                  >
                    {content.event.date}
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
                    <EmailInput
                      ref={emailRef}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={content.localization.hero.emailPlaceholder}
                      onSubmit={() => handleOpenWithEmail(FORM_URL_SIGN_UP)}
                    />
                  </div>

                  <button 
                    className="bg-[#fca147] border-[5px] border-[rgba(0,0,0,0.2)] rounded-[20px] px-8 md:px-14 py-4 hover:scale-105 transition-transform w-full md:w-auto transform md:rotate-[1.5deg] shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer active:scale-95"
                    type="button"
                    onClick={() => handleOpenWithEmail(FORM_URL_SIGN_UP)}
                  >
                    <p 
                      className="text-[#8d3f34] text-3xl md:text-5xl font-normal font-dream-planner whitespace-nowrap"
                    >
                      {content.localization.hero.ctaPrimary}
                    </p>
                  </button>
                </div>

                <div className='font-ember-and-fire text-white text-4xl pl-2 -translate-y-1 md:rotate-[-1.2deg]' style={{
                  textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                }}>
                  {content.localization.hero.ctaSecondaryPrefix}<a
                    className='underline inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95'
                    href='https://flagship.hackclub.com?utm_source=campfire-website'
                  >
                    {content.localization.hero.ctaSecondary}
                  </a>{content.localization.hero.ctaSecondarySuffix}
                </div>
              </div>
            </div>

            <MapEmbed className="hidden xl:block self-end mb-8" onOpenMap={() => setIsMapOpen(true)} label={content.localization.hero.mapLabel}/>
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
        <div className="xl:hidden pt-16 pb-8 relative z-50">
          <MapEmbed className="px-6 relative z-50 max-w-sm mx-auto" onOpenMap={() => setIsMapOpen(true)} label={content.localization.hero.mapLabel}/>
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
            <FormattedText text={content.localization.steps.step1} />
          </Step>

          <Step
            stepNumber={2}
            imageSrc="/compressed/ui/step-team.webp"
            imageAlt="Step 2"
            isReversed={true}
          >
            <FormattedText text={content.localization.steps.step2} />
          </Step>

          <Step
            stepNumber={3}
            imageSrc="/compressed/ui/step-workshops.webp"
            imageAlt="Step 3"
          >
            <FormattedText text={content.localization.steps.step3} />
          </Step>

          <Step
            stepNumber={4}
            imageSrc="/compressed/ui/step-build.webp"
            imageAlt="Step 4"
            isReversed={true}
          >
            <FormattedText text={content.localization.steps.step4} />
          </Step>
        </div>
      </section>

      <section className="relative h-full md:h-[800px] pb-8 px-8 z-30 -mt-96">
        <div className="absolute top-0 left-0 w-full h-[900px] pointer-events-none">
          <img src="/decorative/clouds-3-symmetric.webp" alt="" className="w-full h-full select-none" />
        </div>

        <div id="letter" className="relative w-full h-full z-50 translate-y-8 min-[1200px]:translate-y-40 flex justify-center">
          <img src='/compressed/backgrounds/world-map-left.webp' alt='' className='h-full hidden min-[1200px]:block' />
          <div className='flex items-center min-[1200px]:block min-[1200px]:relative'>
            <img src='/backgrounds/world-map-right.webp' alt='' className='h-full hidden min-[1200px]:block' />
            <div className='min-[1200px]:absolute min-[1200px]:top-0 min-[1200px]:left-0 py-12 min-[1200px]:py-16 min-[1200px]:pb-0 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] min-[1200px]:rounded-none min-[1200px]:shadow-none min-[1200px]:pt-30 pl-6 min-[1200px]:pl-12 pr-6 min-[1200px]:pr-64 text-xl bg-[#EAD6BE] border-[#DCA87E] border-4 min-[1200px]:border-0 min-[1200px]:bg-transparent flex flex-col gap-6 font-solway'>
              <h1 className="text-2xl md:text-3xl font-bold">{content.localization.letter.greeting}</h1>
              <p>{content.localization.letter.paragraph1}</p>

              <p className="text-xl"><b>{content.localization.letter.paragraph2}</b></p>

              <p>{content.localization.letter.paragraph3}</p>

              <p>{content.localization.letter.paragraph4}</p>

              <p>
                {content.localization.letter.closing} <br />
                {content.localization.letter.signature}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-0 py-24 bg-[#384fbc] bg-cover bg-center z-20 pt-90 md:pt-180 -mt-[25vw] pb-0 bg-[url(/backgrounds/blue-gradient.webp)]">
        <div className="absolute bottom-48 md:bottom-0 left-0 w-full pointer-events-none scale-250 md:scale-100">
          <img
            src="/decorative/clouds-1.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>

        <div className="absolute bottom-48 left-32 md:bottom-0 md:left-0 w-[80vw] pointer-events-none scale-250 md:scale-100 z-30">
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

        <div className="relative z-20 flex flex-col gap-12 items-center px-6 md:px-24 w-full max-w-6xl mx-auto mb-100">
          <div
            id="schedule"
            className="relative w-full bg-[#3154B9] rounded-xl border-4 border-[#7B9FF5] p-8 md:p-16 min-h-[500px] shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          >
            <h2
              className="text-[#FFD999] text-6xl md:text-7xl font-bold text-center mb-4 font-ember-and-fire relative z-10"
            >
              {content.localization.schedule.title}
            </h2>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-8">
              {content.event.schedule.days.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h3 className="text-[#FFD999] text-2xl md:text-3xl font-bold font-ember-and-fire mb-4">
                    {day.date}
                  </h3>
                  <div className="overflow-hidden rounded-lg">
                    <table className="w-full border-collapse">
                      <tbody>
                        {day.items.map((item, itemIndex) => (
                          <tr
                            key={itemIndex}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all"
                          >
                            <td className="p-4 text-white text-lg md:text-xl font-solway">
                              {item.activity}
                            </td>
                            <td className="p-4 text-[#FFD999] text-xl md:text-2xl font-bold font-solway whitespace-nowrap w-1/3 text-right">
                              {item.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
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
            {content.localization.sponsors.title}
          </h2>

          <div className="flex flex-wrap gap-8 justify-center">
            {
              content.event.sponsors.cards.map((sponsor, index) => (
                <>
                  <a key={index} href={sponsor.link} target="_blank" className='flex flex-col justify-center items-center bg-white/10 rounded-xl p-4 hover:bg-white/15 transition-all'>
                    <img
                      src={sponsor.logo}
                      alt={sponsor.sponsor}
                      className="w-40 m-4 object-cover select-none"
                    />
                    <p className="text-white text-lg md:text-xl font-solway">{sponsor.sponsor}</p>
                  </a>
                </>
              ))
            }
          </div>

          {
            content.event.signatures ?
              (
                <div>
                  <h2
                    id="games-made"
                    className="text-[#f1ebff] text-6xl font-bold text-center mt-16 mb-8 font-ember-and-fire"
                    style={{
                      textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
                    }}
                  >
                    {content.localization.signatures.title}
                  </h2>

                  <img
                    src={content.event.signatures.img}
                    alt={content.localization.signatures.title}
                    className="w-[60%] object-cover select-none"
                  />
                </div>)
              : (<></>)
          }
        </div>
        
        <div className="scale-250 translate-y-80 pb-48 md:pb-0 md:translate-y-0 md:scale-105 left-0 w-full pointer-events-none">
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
            {content.event.faq.title}
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
                  {content.event.faq.participant.title}
                </p>

                {content.event.faq.participant.questions.map((q, i) => (
                  <FaqQuestion key={i} question={q.question}>
                    {q.answer}
                  </FaqQuestion>
                ))}
                <FaqButton content={content.event.faq.participant.buttonText} />
              </div>
            </div>

            {content.event.faq.organizer && (
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
                    {content.event.faq.organizer.title}
                  </p>

                  {content.event.faq.organizer.questions.map((q, i) => (
                    <FaqQuestion key={i} question={q.question}>
                      {q.answer}
                    </FaqQuestion>
                  ))}
                  <FaqButton href={FORM_URL_ORGANIZER_APPLICATION} content={content.event.faq.organizer.buttonText} />
                </div>
              </div>
            )}
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
            {content.localization.footer.tagline}
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-16 max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center md:items-end gap-4 text-white text-4xl md:text-3xl font-ember-and-fire font-bold z-20">
              {content.localization.footer.links.map((link, index) => (
                <a key={index} href={link.href} target="_blank" className="hover:underline">{link.text}</a>
              ))}

              <p className="text-white text-sm md:text-md text-right max-w-96 font-ember-and-fire">
                {content.localization.footer.copyright}
              </p>
            </div>

            <div className="flex-1 text-left">
              <p className="text-white text-lg md:text-xl font-ember-and-fire leading-relaxed mb-4">
                {content.localization.footer.description}<a href="https://summer.hackclub.com/" target="_blank" className="underline hover:text-gray-300">Summer of Making</a>, hosted the <a href="https://github.com/hackclub/the-hacker-zephyr" target="_blank" className="underline hover:text-gray-300">world's longest hackathon on land</a>, and ran <a href="https://www.youtube.com/watch?v=QvCoISXfcE8" target="_blank" className="underline hover:text-gray-300">Canada's largest high school hackathon</a>.
              </p>
              <p className="text-white text-lg md:text-xl font-ember-and-fire font-bold">
                {content.localization.footer.closing}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {isMapOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
          onClick={() => setIsMapOpen(false)}
        >
          <div 
            className="relative w-[90vw] h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:opacity-70 cursor-pointer"
            >
              ✕
            </button>
            <iframe 
              src="/map" 
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
