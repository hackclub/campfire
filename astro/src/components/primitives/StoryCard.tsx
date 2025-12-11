function StoryCard({ imageSrc, imageAlt, titleImageSrc, titleImageAlt, description, videoUrl, videoButtonText, videoButtonColor, eventUrl }: {
  imageSrc: string;
  imageAlt: string;
  titleImageSrc: string;
  titleImageAlt: string;
  description: string;
  videoUrl: string;
  videoButtonText: string;
  videoButtonColor: string;
  eventUrl: string;
}) {
  return (
    <div className="bg-[url(/compressed/ui/step-bg.webp)] bg-no-repeat bg-cover min-[1050px]:bg-none min-[1050px]:bg-white relative p-6 pb-24 flex items-center flex-1 basis-0 flex-col gap-4 min-[1050px]:gap-2 min-[1050px]:shadow-[16px_16px_0px_0px_rgba(0,0,0,0.3)] mx-8 min-[1050px]:mx-0">
      <img 
        src={imageSrc}
        alt={imageAlt}
        className="block w-[280px] h-[220px] max-w-none object-cover mb-2"
      />

      <div className="p-2 flex flex-col items-center min-[1050px]:items-start">
        <a className="transition-transform hover:scale-105 active:scale-95 cursor-pointer w-full flex justify-center min-[1050px]:justify-start" href={eventUrl} target="_blank">
          <img 
            src={titleImageSrc}
            alt={titleImageAlt}
            className="mb-2 w-1/2 min-[1050px]:w-full object-contain"
            style={{
              filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.25))"
            }}
          />
        </a>

        <p 
          className="text-black h-max w-full text-2xl font-source-serif-pro text-center min-[1050px]:text-left"
          style={{ 
            textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
          }}
        >
          {description}
        </p>
      </div>

      <button
        className="absolute bottom-0 cursor-pointer block rounded-2xl p-4 px-6 font-ember-and-fire text-white font-bold text-4xl transition-transform hover:scale-105 active:scale-95 min-[1050px]:translate-y-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.3)]"
        onClick={() => window.open(videoUrl, "_blank")}
        style={{ background: videoButtonColor }}
      >
        {videoButtonText.toUpperCase()}
      </button>
    </div>
  );
}

export default StoryCard;
