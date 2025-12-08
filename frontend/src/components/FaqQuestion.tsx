import { useState } from 'react';

function FaqQuestion({ question, children }: {
  question: string;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[90vw] md:max-w-none md:w-[467px]">
      <div
        onClick={toggleExpanded}
        className={`
          bg-[#8d3f34] shadow-[8px_8px_0px_0px_#733a32] flex flex-col items-center justify-center md:w-full px-12 py-8 md:py-16 transition-all duration-200 hover:scale-105 cursor-pointer select-none
          ${isExpanded ? "w-full" : `${question.length < 20 ? "w-max" : "w-full"}`}
        `}
      >
        <p 
          className="text-white text-4xl text-center font-bold leading-none w-full font-ember-and-fire"
        >
          {question}
        </p>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#6b2f26] shadow-[8px_8px_0px_0px_#5a251e] px-12 py-8 -mt-2">
          <p className="text-white text-2xl leading-relaxed font-source-serif-pro">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FaqQuestion;
