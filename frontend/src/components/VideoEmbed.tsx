interface VideoEmbedProps {
  className?: string;
}

function VideoEmbed({ className }: VideoEmbedProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-3 mb-4 2xl:mb-8">
        <p 
          className="text-white text-4xl 2xl:text-6xl font-bold font-ember-and-fire"
          style={{ 
            textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
          }}
        >
          watch the video
        </p>

        <img 
          src="/compressed/ui/arrow.webp" 
          alt="" 
          className="w-[45px] md:w-[55px] h-[33px] md:h-[41px] translate-y-6 rotate-[6.2deg] z-50 select-none"
        />
      </div>

      <div className="relative transform rotate-[1.7deg] transition-transform hover:scale-105 w-[70vw] md:w-[50vw] xl:w-[442px] mx-auto">
        <iframe
          src="https://www.youtube.com/embed/yVgqQQ5xYJo?si=1PngS7-FtsjCfAGy" 
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full aspect-video rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.25)]"
        />
      </div>
    </div>
  );
}

export default VideoEmbed;
