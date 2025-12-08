interface FaqButtonProps {
  content: string;
  href?: string;
}

function FaqButton({ content, href }: FaqButtonProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank");
    }
  };

  const isDisabled = !href;

  return (
    <div 
      className={`
        flex items-start px-5 py-12 justify-center w-full max-w-[90vw] md:max-w-none md:w-[467px] transition-transform
        ${isDisabled 
          ? 'bg-gray-500 cursor-not-allowed shadow-[8px_8px_0px_0px_#374151]' 
          : 'bg-[#091e8b] cursor-pointer hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_#0a1861]'
        }
      `}
      onClick={handleClick}
    >
      <div className="flex gap-1 items-center">
        <div className="relative w-8 h-8 overflow-hidden hidden md:block">
          <img 
            alt="" 
            className="absolute -inset-1 w-full h-full object-cover select-none" 
            src="/icons/plus.svg" 
          />
        </div>
        <p 
          className="text-white text-4xl font-bold leading-none whitespace-nowrap font-ember-and-fire"
        >
          {content}
        </p>
      </div>
    </div>
  );
}

export default FaqButton;
