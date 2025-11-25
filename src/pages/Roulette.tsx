import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouletteWheel from "@/components/RouletteWheel";
import { Gift } from "lucide-react";

interface Prize {
  id: number;
  name: string;
  color: string;
}

const Roulette = () => {
  const navigate = useNavigate();
  
  // Demo prizes
  const prizes: Prize[] = [
    { id: 1, name: "10% OFF", color: "hsl(45 100% 51%)" },
    { id: 2, name: "Brinde Grátis", color: "hsl(280 100% 70%)" },
    { id: 3, name: "5% OFF", color: "hsl(210 100% 56%)" },
    { id: 4, name: "Frete Grátis", color: "hsl(142 76% 56%)" },
    { id: 5, name: "15% OFF", color: "hsl(0 84% 60%)" },
    { id: 6, name: "Cupom R$10", color: "hsl(45 100% 51%)" },
    { id: 7, name: "Desconto Especial", color: "hsl(280 100% 70%)" },
    { id: 8, name: "Próxima Compra", color: "hsl(210 100% 56%)" },
  ];

  const handleSpinComplete = (prize: Prize) => {
    // Store the won prize
    sessionStorage.setItem("wonPrize", JSON.stringify(prize));
    
    // Navigate to results after a short delay
    setTimeout(() => {
      navigate("/results");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-celebration flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Boa sorte, campeão!</h1>
          <p className="text-lg text-muted-foreground">Toque no botão e descubra seu prêmio</p>
        </div>

        {/* Roulette */}
        <div className="bg-card rounded-3xl p-8 shadow-xl">
          <RouletteWheel prizes={prizes} onSpinComplete={handleSpinComplete} />
        </div>
      </div>
    </div>
  );
};

export default Roulette;
