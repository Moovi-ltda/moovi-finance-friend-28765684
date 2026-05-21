import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/utils/scroll";
import { Check } from "lucide-react";

// Componente de imagem
const ImageDisplay = ({ imagePath, alt }: { imagePath: string; alt: string }) => (
  <img src={imagePath} alt={alt} className="w-full h-auto rounded-2xl object-cover" loading="lazy" />
);

const features = [
  {
    title: "Controle direto no Whatsapp",
    description: (
      <>
        <p className="mb-4">
          <strong className="text-foreground font-bold">O Moovi organiza suas finanças direto no WhatsApp.</strong> É só
          enviar mensagens como <em>"gastei 100 no mercado"</em> e o Moovi entende, registra e classifica tudo
          automaticamente.
        </p>
        <p className="mb-4">
          <strong className="text-foreground font-bold">Você acompanha seus gastos e receitas</strong> com relatórios
          inteligentes, gráficos claros e lembretes diários, tudo sem planilhas e sem complicação.
        </p>
        <p>
          <strong className="text-foreground font-bold">Simples, rápido e 100% no WhatsApp</strong>, para você ter mais
          controle do seu dinheiro no dia a dia.
        </p>
      </>
    ),
    imagePath: "/features/Registre_Tudo_no_whatsapp.png",
    hasButton: true,
  },
  {
    title: "Painel Profissional",
    description: (
      <>
        <p className="mb-4 text-lg">
          <strong className="text-foreground font-bold block mb-1">Visão clara de todo o seu dinheiro!</strong>
        </p>
        <p className="mb-4">
          Tudo o que você registra no WhatsApp vira um{" "}
          <strong className="text-foreground">painel simples e fácil de entender</strong>, com a visão completa do seu
          dinheiro em um só lugar.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-700" />
            </div>
            <span>
              Gráficos automáticos de <strong className="text-foreground">entradas e saídas</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-700" />
            </div>
            <span>
              <strong className="text-foreground">Organização inteligente</strong> dos seus gastos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-700" />
            </div>
            <span>
              Acompanhamento prático para <strong className="text-foreground">decisões do dia a dia</strong>.
            </span>
          </li>
        </ul>
      </>
    ),
    imagePath: "/features/Painel_Profissional.png",
    hasButton: false,
  },
  {
    title: "Lembretes Personalizados",
    description: (
      <>
        <p className="mb-4 text-lg">
          <strong className="text-foreground font-bold block mb-1">
            Organize seus compromissos direto no WhatsApp.
          </strong>
        </p>
        <p className="mb-4">
          Basta enviar mensagens como <em>"médico amanhã às 16h"</em>.{" "}
          <strong className="text-foreground">
            O Moovi registra tudo e cria lembretes personalizados automaticamente.
          </strong>
        </p>
        <p className="mb-4">
          Receba avisos no momento certo, resumos do dia e uma visão clara dos seus compromissos!{" "}
          <strong className="text-foreground">Sem anotações manuais e sem esquecer nada.</strong>
        </p>
        <p>
          <strong className="text-foreground">Simples, rápido e sempre no WhatsApp!</strong> Para manter sua rotina sob
          controle todos os dias.
        </p>
      </>
    ),
    imagePath: "/features/Lembretes_Personalizados.png",
    hasButton: true,
  },
  {
    title: "Categorias Personalizadas",
    description: (
      <>
        <p className="mb-4">
          <strong className="text-foreground font-bold">O Moovi já vem com categorias prontas</strong>, como mercado,
          aluguel e lazer! Mas você pode criar outras do seu jeito, quantas você quiser e personalizar como preferir!
        </p>

        <p className="mb-4">
          Sempre que você registra um gasto, o{" "}
          <strong className="text-foreground">Moovi classifica tudo automaticamente</strong> e mostra quanto você está
          gastando em cada categoria.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-700" />
            </div>
            <span>
              Crie <strong className="text-foreground">quantas categorias quiser</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-700" />
            </div>
            <span>
              <strong className="text-foreground">Classificação automática</strong> dos gastos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-700" />
            </div>
            <span>
              Relatórios por categoria <strong className="text-foreground">direto no WhatsApp</strong>.
            </span>
          </li>
        </ul>
      </>
    ),
    imagePath: "/features/Categorias_Personalizadas.png",
    hasButton: false,
  },
  {
    title: "Limites Inteligentes",
    description: (
      <>
        <p className="mb-4 text-lg">
          <strong className="text-foreground font-bold block mb-1">
            Defina limites e evite gastar mais do que deveria.
          </strong>
        </p>
        <p className="mb-4">
          Escolha um valor máximo para categorias como alimentação, lazer ou cartão de crédito.{" "}
          <strong className="text-foreground">
            Quando seus gastos se aproximarem do limite, o Moovi te avisa automaticamente.
          </strong>
        </p>
        <p className="mb-4">
          Assim, você sabe quando desacelerar antes de estourar o orçamento!{" "}
          <strong className="text-foreground">Sem precisar fazer conta ou acompanhar planilhas.</strong>
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>
              Defina <strong className="text-foreground">limites por categoria</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>
              <strong className="text-foreground">Alertas automáticos</strong> no WhatsApp.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>
              Mais controle para <strong className="text-foreground">gastar melhor</strong> no dia a dia.
            </span>
          </li>
        </ul>
      </>
    ),
    imagePath: "/features/Limites_Inteligentes.png",
    hasButton: true,
  },
  {
    title: "Gestão de Contas e Cartões",
    description: (
      <>
        <p className="mb-4 text-lg">
          <strong className="text-foreground font-bold block mb-1">
            Controle todas as suas contas e cartões em um só lugar.
          </strong>
        </p>
        <p className="mb-4">
          Tenha mais de uma conta bancária ou mais de um cartão? Sem problema.{" "}
          <strong className="text-foreground">O Moovi permite acompanhar tudo junto.</strong>
        </p>
        <p className="mb-4">
          Registre gastos normalmente no WhatsApp e o Moovi identifica de onde saiu o dinheiro e em qual cartão foi
          feito o gasto.
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>
              Gerencie <strong className="text-foreground">várias contas bancárias</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>
              Controle <strong className="text-foreground">mais de um cartão de crédito</strong>.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span>
              Tudo organizado de forma <strong className="text-foreground">simples e automática</strong>.
            </span>
          </li>
        </ul>
      </>
    ),
    imagePath: "/features/Gestao_de_Contas_e_Cartoes.png",
    hasButton: false,
  },
];

export const ContainerScroll = ({ titleComponent, children }: any) => {
  return (
    <section className="py-20 overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {titleComponent || (
            <>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Tudo o ,que você precisa direto no <span className="text-green-600">WhatsApp</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Conheça todas as funcionalidades que vão transformar sua vida financeira.
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "400px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* --- BLOCO DE TEXTO --- */}
                <div className="flex-1 space-y-6 text-left order-2 md:order-1">
                  <div className="relative">
                    <div className="w-20 h-2 bg-green-700 rounded-full mb-6"></div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{feature.title}</h3>
                  </div>

                  <div className="text-lg text-muted-foreground leading-relaxed">{feature.description}</div>

                  {feature.hasButton && (
                    <div className="pt-4">
                      <Button
                        size="lg"
                        className="bg-green-700 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
                        onClick={() => scrollToSection("pricing-section")}
                      >
                        Quero usar o Moovi 💚
                      </Button>
                    </div>
                  )}
                </div>

                {/* --- BLOCO DE IMAGEM --- */}
                <div className="flex-1 w-full order-1 md:order-2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                    <ImageDisplay imagePath={feature.imagePath} alt={feature.title} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
