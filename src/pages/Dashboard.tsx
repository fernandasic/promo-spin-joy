import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Users, Award, QrCode, Plus, Settings } from "lucide-react";

const Dashboard = () => {
  // Demo data
  const stats = {
    totalLeads: 127,
    prizesDistributed: 89,
    activeCampaigns: 1,
    conversionRate: "70%",
  };

  const recentParticipants = [
    { name: "João Silva", prize: "10% OFF", time: "5 min atrás", status: "Não resgatado" },
    { name: "Maria Santos", prize: "Brinde Grátis", time: "12 min atrás", status: "Resgatado" },
    { name: "Pedro Costa", prize: "15% OFF", time: "23 min atrás", status: "Não resgatado" },
    { name: "Ana Lima", prize: "Frete Grátis", time: "1 hora atrás", status: "Resgatado" },
  ];

  return (
    <div className="min-h-screen bg-gradient-celebration">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Painel do Lojista</h1>
            <p className="text-muted-foreground">Gerencie suas campanhas e acompanhe resultados</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">Contatos captados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prêmios Distribuídos</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.prizesDistributed}</div>
              <p className="text-xs text-muted-foreground">Já entregues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeCampaigns}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.conversionRate}</div>
              <p className="text-xs text-muted-foreground">Resgates realizados</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="participants" className="space-y-4">
          <TabsList>
            <TabsTrigger value="participants">Participantes</TabsTrigger>
            <TabsTrigger value="campaign">Campanha</TabsTrigger>
            <TabsTrigger value="qrcode">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Participantes Recentes</CardTitle>
                <CardDescription>Acompanhe quem está girando a roleta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentParticipants.map((participant, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{participant.name}</p>
                        <p className="text-sm text-muted-foreground">{participant.time}</p>
                      </div>
                      <div className="text-center px-4">
                        <p className="font-medium text-primary">{participant.prize}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          participant.status === "Resgatado" 
                            ? "bg-success/20 text-success" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {participant.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaign" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campanha Ativa</CardTitle>
                <CardDescription>Configure prêmios e mensagens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-semibold">Promoção de Verão</p>
                    <p className="text-sm text-muted-foreground">8 prêmios configurados</p>
                  </div>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qrcode" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>QR Code da Campanha</CardTitle>
                <CardDescription>Imprima e coloque no balcão da sua loja</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-muted-foreground" />
                </div>
                <Button className="w-full max-w-xs">Baixar QR Code</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
