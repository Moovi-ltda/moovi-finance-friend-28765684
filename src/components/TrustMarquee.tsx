import { Users, Building2, DollarSign, ShieldCheck, Cpu, Link2 } from "lucide-react";

const ITEMS = [
  { icon: Users, text: "+5.240 usuários ativos" },
  { icon: Building2, text: "Tecnologia Moovi" },
  { icon: DollarSign, text: "+R$ 2.1 milhões organizados" },
  { icon: ShieldCheck, text: "Segurança nível bancário" },
  { icon: Cpu, text: "99,9% de precisão na IA" },
  { icon: Link2, text: "Integrado ao WhatsApp" },
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {ITEMS.map((item, i) => {
      const Icon = item.icon;
      return (
        <div key={i} className="flex items-center gap-3 px-8 py-4 whitespace-nowrap">
          <Icon className="w-5 h-5 text-moovi-mint" />
          <span className="text-white/80 text-sm md:text-base font-medium">{item.text}</span>
          <span className="ml-8 w-px h-5 bg-white/10" aria-hidden />
        </div>
      );
    })}
  </div>
);

export default function TrustMarquee() {
  return (
    <section className="relative w-full bg-[#05150C] border-y border-white/10 overflow-hidden">
      <style>{`
        @keyframes trust-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .trust-track {
          animation: trust-scroll 35s linear infinite;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05150C] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05150C] to-transparent z-10" />
      <div className="flex w-max trust-track">
        <Row />
        <Row />
      </div>
    </section>
  );
}
