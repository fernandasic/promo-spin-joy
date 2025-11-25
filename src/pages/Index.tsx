import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift, Users, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-carnival flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-2xl">
              <Gift className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-background drop-shadow-lg">
            Roleta Digital
          </h1>
          <p className="text-2xl text-background/90 drop-shadow">
            Sistema de Marketing Promocional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-background rounded-3xl p-8 shadow-2xl space-y-6 hover:scale-105 transition-transform">
            <div className="flex justify-center">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-center">Sou Cliente</h2>
            <p className="text-center text-muted-foreground">
              Participe da roleta e ganhe prêmios incríveis!
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/customer")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            >
              Girar Roleta
            </Button>
          </div>

          <div className="bg-background rounded-3xl p-8 shadow-2xl space-y-6 hover:scale-105 transition-transform">
            <div className="flex justify-center">
              <Users className="w-12 h-12 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold text-center">Sou Lojista</h2>
            <p className="text-center text-muted-foreground">
              Crie campanhas e capture leads dos seus clientes
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6"
            >
              Acessar Painel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
