import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Gift } from "lucide-react";

const CustomerLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-carnival flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-75" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse delay-150" />
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8 text-center">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-lg">
            <Gift className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-background drop-shadow-lg">
            Bora tentar a sorte? 🍀
          </h1>
          <p className="text-xl text-background/90 drop-shadow">
            Gire a roleta e ganhe prêmios incríveis!
          </p>
        </div>

        <div className="bg-background/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="w-6 h-6" />
            <span className="font-semibold">Pronto pra girar?</span>
            <Sparkles className="w-6 h-6" />
          </div>

          <Button 
            size="lg"
            onClick={() => navigate("/register")}
            className="w-full text-lg py-6 bg-gradient-to-r from-primary via-accent to-secondary hover:scale-105 transition-transform duration-300 shadow-lg animate-pulse-glow"
          >
            Participar Agora
          </Button>

          <p className="text-xs text-muted-foreground">
            Rápido e grátis • Seu prêmio direto no WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLanding;
