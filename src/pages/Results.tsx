import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Results = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [prize, setPrize] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    const phone = sessionStorage.getItem("userPhone");
    const wonPrize = sessionStorage.getItem("wonPrize");

    if (!name || !wonPrize) {
      navigate("/");
      return;
    }

    setUserName(name);
    setUserPhone(phone || "");
    setPrize(JSON.parse(wonPrize));
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 3000);
  }, [navigate]);

  const handleWhatsApp = async () => {
    if (isLoading || isSent) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-prize-webhook', {
        body: {
          nome: userName,
          telefone: userPhone,
          premio: prize.name,
          premio_id: prize.id,
        },
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: "Prêmio enviado! 🎉",
        description: "Verifique seu WhatsApp para receber seu prêmio.",
      });
    } catch (error) {
      console.error('Erro ao enviar prêmio:', error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!prize) return null;

  return (
    <div className="min-h-screen bg-gradient-carnival flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                backgroundColor: `hsl(${Math.random() * 360} 100% 60%)`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center space-y-4 animate-bounce-in">
          {/* Prize icon */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-background rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
              <Gift className="w-16 h-16 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-background drop-shadow-lg">
            Parabéns, {userName.split(" ")[0]}! 🎉
          </h1>
          
          <div className="bg-background rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase">Você ganhou</span>
                <Sparkles className="w-6 h-6" />
              </div>
              
              <div className="text-5xl font-bold text-foreground py-4">
                {prize.name}
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="w-full text-lg py-6 bg-success hover:bg-success/90 text-success-foreground shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Receber no WhatsApp
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Seu prêmio chegou no WhatsApp 🚀
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-background hover:text-background/80"
          >
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
