interface MapEmbedProps {
  className?: string;
  onOpenMap: () => void;
}

function MapEmbed({ className, onOpenMap }: MapEmbedProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-3 mb-4 2xl:mb-8">
        <p 
          className="text-white text-3xl 2xl:text-5xl font-bold font-ember-and-fire"
          style={{ 
            textShadow: "0px 4px 4px rgba(0,0,0,0.25)"
          }}
        >
          find an event near you
        </p>

        <img 
          src="/compressed/ui/arrow.webp" 
          alt="" 
          className="w-[45px] md:w-[55px] h-[33px] md:h-[41px] translate-y-6 rotate-[6.2deg] z-50 select-none"
        />
      </div>

      <button 
        onClick={onOpenMap}
        className="relative transform rotate-[1.7deg] transition-transform hover:scale-105 w-[70vw] md:w-[50vw] xl:w-[442px] mx-auto cursor-pointer"
      >
        <img
          src="/map/map-screenshot.png"
          alt="Map screenshot"
          className="w-full rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.25)]"
        />
      </button>
    </div>
  );
}

export default MapEmbed;
