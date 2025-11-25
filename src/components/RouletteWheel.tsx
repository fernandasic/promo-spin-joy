import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Prize {
  id: number;
  name: string;
  color: string;
}

interface RouletteWheelProps {
  prizes: Prize[];
  onSpinComplete: (prize: Prize) => void;
}

const RouletteWheel = ({ prizes, onSpinComplete }: RouletteWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Random prize selection
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];
    
    // Calculate rotation (multiple full spins + landing position)
    const degreesPerSlice = 360 / prizes.length;
    const targetRotation = 360 * 5 + (360 - (randomIndex * degreesPerSlice + degreesPerSlice / 2));
    
    setRotation(rotation + targetRotation);

    // After animation completes
    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(selectedPrize);
    }, 4000);
  };

  const segmentAngle = 360 / prizes.length;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Pointer */}
      <div className="relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-primary drop-shadow-lg" />
        </div>

        {/* Wheel */}
        <div className="relative">
          <div
            ref={wheelRef}
            className="w-80 h-80 rounded-full relative overflow-hidden shadow-2xl border-8 border-background"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
            }}
          >
            {prizes.map((prize, index) => {
              const rotation = (360 / prizes.length) * index;
              
              return (
                <div
                  key={prize.id}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`,
                  }}
                >
                  <div
                    className="w-full h-full flex items-start justify-center pt-8"
                    style={{ backgroundColor: prize.color }}
                  >
                    <span 
                      className="text-white font-bold text-sm px-2 text-center drop-shadow"
                      style={{ 
                        transform: `rotate(${segmentAngle / 2}deg)`,
                        maxWidth: "80px",
                      }}
                    >
                      {prize.name}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background rounded-full border-4 border-primary shadow-lg z-10" />
          </div>
        </div>
      </div>

      <Button
        size="lg"
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-12 py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? "Girando..." : "GIRAR A ROLETA"}
      </Button>
    </div>
  );
};

export default RouletteWheel;
