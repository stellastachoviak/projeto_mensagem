import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, Shield, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/chat");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">Chat Delivery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema completo de comunicação em tempo real para delivery. 
            Conecte clientes e atendentes de forma rápida e eficiente.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate("/auth")} className="gap-2">
              <MessageCircle className="w-5 h-5" />
              Começar Agora
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Tempo Real</h3>
            <p className="text-sm text-muted-foreground">
              Mensagens instantâneas com WebSockets. Comunicação rápida e eficiente.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Seguro</h3>
            <p className="text-sm text-muted-foreground">
              Autenticação robusta e dados protegidos. Privacidade garantida.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Multi-usuário</h3>
            <p className="text-sm text-muted-foreground">
              Suporte para clientes e atendentes. Conversas organizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
