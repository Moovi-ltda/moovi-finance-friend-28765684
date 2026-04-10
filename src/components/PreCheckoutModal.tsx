import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const WEBHOOK_URL = "COLE_AQUI_A_URL_DO_N8N";

interface SelectedPlan {
  name: string;
  yearlyPrice: number;
  yearlyTotal: number;
  monthlyPrice: number;
  href: string;
}

interface PreCheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SelectedPlan | null;
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function PreCheckoutModal({ open, onOpenChange, plan }: PreCheckoutModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setError("");
    setIsSubmitting(false);
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) resetForm();
    onOpenChange(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan) return;

    setError("");
    setIsSubmitting(true);

    const payload = {
      nome,
      email,
      telefone: telefone.replace(/\D/g, ""),
      plano: plan.name,
      valor: plan.name === "Plano Mensal" ? plan.monthlyPrice : plan.yearlyTotal,
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao processar. Tente novamente.");

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Fallback: redirect to original Stripe link
        window.location.href = plan.href;
      }
    } catch (err: any) {
      setError(err.message || "Erro inesperado. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Quase lá! Falta pouco para liberar seu acesso.
          </DialogTitle>
          <DialogDescription>
            Preencha seus dados abaixo para continuar com a assinatura.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">WhatsApp</Label>
            <Input
              id="telefone"
              placeholder="(XX) 9XXXX-XXXX"
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            Você está assinando o{" "}
            <span className="font-semibold text-foreground">{plan.name}</span>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando ambiente seguro...
              </>
            ) : (
              "Continuar para pagamento"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
