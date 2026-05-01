import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Tags, CreditCard, Bell, Target, LayoutDashboard, MessageCircle } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

interface Feature {
  icon: any;
  title: string;
  description: string;
  videoId: string;
  aspectRatio: string;
}

export default function FeaturesScroll() {
  const features: Feature[] = [
    {
      icon: Tags,
      title: "Organização Automática",
      description: "Não perca tempo categorizando. A Inteligência Artificial faz isso por você.",
      videoId: "80951287-a7d1-430e-a220-067611889e53",
      aspectRatio: "56.25%",
    },
    {
      icon: CreditCard,
      title: "Gestão de Contas e Cartões",
      description: "Controle todas as suas contas e cartões em um só lugar.",
      videoId: "61f71433-6cfd-420e-ac28-e5eedce0f69c",
      aspectRatio: "54.22%",
    },
    {
      icon: Bell,
      title: "Lembretes Personalizados",
      description: "Nunca mais esqueça uma conta importante com alertas inteligentes.",
      videoId: "b476b2e2-bfc8-4d6a-be62-545da49415f1",
      aspectRatio: "56.25%",
    },
    {
      icon: Target,
      title: "Limites Inteligentes",
      description: "Defina limites de gastos e receba alertas antes de estourar o orçamento.",
      videoId: "ddaeecf7-fdf3-4c9c-91ea-fb8f701babe4",
      aspectRatio: "70.45%",
    },
    {
      icon: LayoutDashboard,
      title: "Painel Profissional",
      description: "Visualize suas finanças com gráficos e relatórios completos.",
      videoId: "7d8906f5-8c91-4334-9e22-e3c57234dc16",
      aspectRatio: "56.25%",
    },
    {
      icon: MessageCircle,
      title: "Apenas Fale",
      description: "Envie um áudio de 5 segundos: 'Gastei 30 na padaria'. Pronto, está registrado.",
      videoId: "0ba8451c-67f5-484d-b034-0e2a687c1411",
      aspectRatio: "56.25%",
    },
  ];

  const VideoEmbed = ({ videoId, aspectRatio }: { videoId: string; aspectRatio: string }) => (
    <div className="relative w-full rounded-lg overflow-hidden bg-black/5" style={{ paddingTop: aspectRatio }}>
      <iframe
        src={`https://player-vz-c1e2f242-e38.tv.pandavideo.com.br/embed/?v=${videoId}`}
        className="absolute top-0 left-0 w-full h-full border-none"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  return (
    <section className="bg-transparent">
      <ContainerScroll
        titleComponent={
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              <TextAnimate animation="slideUp" by="word">
                Como o Moovi ajuda você a ter controle do seu dinheiro?
              </TextAnimate>
            </h2>
          </div>
        }
      >
        <div className="h-full w-full overflow-auto p-3">
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg border border-border p-5 md:p-6 flex flex-col gap-4">
                <div>
                  <feature.icon className="w-10 h-10 text-primary mb-3" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>

                <VideoEmbed videoId={feature.videoId} aspectRatio={feature.aspectRatio} />
              </div>
            ))}
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
