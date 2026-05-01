import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Ana Luiza",
      title: "Designer Autônoma",
      quote: "Antes eu vivia perdida com boletos. Agora durmo tranquila sabendo que o Moovi me avisa de tudo!",
    },
    {
      name: "Carlos Eduardo",
      title: "Dono de E-commerce",
      quote: "Achei que ia ser mais um app que eu não usaria. Mas como é no WhatsApp, ficou automático. Mudou minha vida financeira!",
    },
    {
      name: "Juliana Martins",
      title: "Mãe e Empreendedora",
      quote: "Finalmente consegui pagar minhas dívidas porque enxerguei onde estava vazando dinheiro. Vale MUITO a pena.",
    },
    {
      name: "Roberto Alves",
      title: "Consultor",
      quote: "O melhor investimento que fiz em mim. É tipo ter um contador particular, mas sem pagar uma fortuna.",
    },
    {
      name: "Fernanda Costa",
      title: "Professora Particular",
      quote: "Muito prático! Mando um áudio enquanto estou no trânsito e pronto, registrado. Não tem desculpa pra não usar.",
    },
    {
      name: "Thiago Souza",
      title: "Freelancer de TI",
      quote: "Nunca imaginei que controlar minhas finanças seria TÃO simples. Sério, é só conversar no WhatsApp.",
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-[22px] min-[375px]:text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-snug">
            Junte-se a <span className="text-[#25D366]">+5.240 brasileiros</span> que já<br />
            simplificaram suas finanças.
          </h2>
        </div>
        
        <div className="rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
