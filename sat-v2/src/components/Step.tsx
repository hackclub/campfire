import type { PropsWithChildren } from "react";

function Step({ stepNumber, imageSrc, imageAlt, isReversed = false, children }: PropsWithChildren<{
  stepNumber: number;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
}>) {
  return (
    <div className={`flex gap-16 items-center w-full flex-col-reverse ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className={`relative flex flex-col text-[#000] flex-1 ${isReversed ? 'md:items-start' : 'md:items-end md:text-right'}`}>
        <div className="absolute -inset-24 md:-inset-16 -z-60 pointer-events-none">
          <img 
            src="/compressed/ui/step-bg.webp" 
            alt="" 
            className="w-auto md:w-min h-full md:object-cover select-none translate-y-2 md:translate-y-0"
          />
        </div>
        
        <p 
          className="text-3xl font-bold mb-2 font-source-serif-pro relative z-10"
        >
          Step {stepNumber}
        </p>

        <p 
          className={`text-3xl md:text-4xl leading-tight font-source-serif-pro relative z-10 md:max-w-3/4`}
        >
          {children}
        </p>
      </div>

      <img 
        src={imageSrc}
        alt={imageAlt}
        className="rounded-lg object-cover w-full scale-120 min-[480px]:scale-100 min-[480px]:w-[420px] min-[800px]:w-[509px] aspect-video shadow-[-8px_16px_0px_0px_rgba(0,0,0,0.25)] relative z-20"
      />
    </div>
  );
}

export default Step;
