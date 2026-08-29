import {
  type ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const mooviScreens: ImageItem[] = [
  {
    src: "/features/limites-inteligentes-visao-geral.png",
    alt: "Visão geral financeira do Moovi com comparação mensal e alertas de orçamento",
    label: "Visão financeira",
  },
  {
    src: "/features/limites-inteligentes-orcamento.png",
    alt: "Orçamento do Moovi com limites e progresso por categoria",
    label: "Limites inteligentes",
  },
  {
    src: "/features/categorias-personalizadas-despesas.png",
    alt: "Categorias personalizadas de despesas no Moovi",
    label: "Suas despesas",
  },
  {
    src: "/features/categorias-personalizadas-receitas.png",
    alt: "Categorias personalizadas de receitas no Moovi",
    label: "Suas receitas",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={mooviScreens} />;
}
