import { useNavigate } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

interface PricingPlan {
  name: string;
  installmentPrice: number;
  totalPrice: number;
  period: string;
  includesFrom?: string;
  features: { text: string; included: boolean }[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  badge?: string;
  badgeStyle?: "outline" | "solid";
  buttonStyle?: "outline" | "primary";
}

interface PricingToggleProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function PricingToggle({ plans, title = "Escolha seu plano", description = "" }: PricingToggleProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  return (
    <div className="container pt-8 pb-20">
      <div className="text-center space-y-4 mb-12">
        <TextAnimate
          animation="scaleUp"
          by="text"
          as="h2"
          className="text-4xl font-bold tracking-tight sm:text-5xl text-primary"
        >
          {title}
        </TextAnimate>
        {description && (
          <TextAnimate
            animation="slideLeft"
            by="character"
            as="p"
            className="text-muted-foreground text-lg"
            delay={0.3}
          >
            {description}
          </TextAnimate>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -10 : 0,
                    opacity: 1,
                    scale: plan.isPopular ? 1.05 : 1.0,
                  }
                : { y: 0, opacity: 1 }
            }
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.2,
            }}
            className={cn(
              "rounded-2xl border-2 p-8 bg-card text-center relative",
              plan.isPopular ? "border-primary shadow-2xl" : "border-border shadow-lg",
              "flex flex-col",
            )}
          >
            {plan.badge && (
              <div
                className={cn(
                  "absolute top-0 right-0 py-1.5 px-4 rounded-bl-xl rounded-tr-xl flex items-center gap-1.5",
                  plan.badgeStyle === "solid"
                    ? "bg-primary"
                    : "bg-muted border border-border",
                )}
              >
                {plan.badgeStyle === "solid" && (
                  <Star className="text-white h-4 w-4 fill-current" />
                )}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    plan.badgeStyle === "solid" ? "text-white" : "text-muted-foreground",
                  )}
                >
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-6 mt-4">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            </div>

            <div className="mb-6 py-6 px-4">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl sm:text-5xl font-bold text-primary">
                  R$ {plan.installmentPrice.toFixed(2).replace(".", ",")}
                </span>
                <span className="text-lg text-muted-foreground font-medium">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                R$ {plan.totalPrice.toFixed(2).replace(".", ",")} à vista ou em 12x
              </p>
            </div>

            <ul className="mb-8 space-y-3 text-left">
              {plan.includesFrom && (
                <li className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 fill-primary/20" />
                  <span className="text-sm font-semibold text-foreground">
                    {plan.includesFrom}
                  </span>
                </li>
              )}
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const afiliadoId = localStorage.getItem("moovi_afiliado_id");
                if (afiliadoId) {
                  fetch("https://n8n.fisherai.shop/webhook/rastrear-clique", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ afiliado_id: afiliadoId, plano: plan.name.replace("Plano ", "").toUpperCase() }),
                  }).catch(() => {});
                }
                navigate("/checkout", { state: { plan } });
              }}
              className={cn(
                buttonVariants({
                  variant: plan.buttonStyle === "primary" ? "hero" : "outline",
                  size: "lg",
                }),
                "w-full font-semibold text-base mt-auto",
                "group relative gap-2 overflow-hidden",
                "transform-gpu ring-offset-current transition-all duration-300 ease-out",
                plan.buttonStyle === "primary"
                  ? "hover:ring-2 hover:ring-primary hover:ring-offset-1"
                  : "hover:ring-2 hover:ring-border hover:ring-offset-1",
              )}
            >
              {plan.buttonText}
            </button>

            <p className="mt-6 text-xs text-muted-foreground">{plan.description}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
