import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const WEBHOOK_URL = "https://n8n.fisherai.shop/webhook/checkout-moovi";

const COUNTRIES = [
  { code: "BR", ddi: "55", flag: "🇧🇷", name: "Brasil" },
  { code: "US", ddi: "1", flag: "🇺🇸", name: "EUA" },
  { code: "PT", ddi: "351", flag: "🇵🇹", name: "Portugal" },
  { code: "AR", ddi: "54", flag: "🇦🇷", name: "Argentina" },
  { code: "CL", ddi: "56", flag: "🇨🇱", name: "Chile" },
  { code: "CO", ddi: "57", flag: "🇨🇴", name: "Colômbia" },
  { code: "MX", ddi: "52", flag: "🇲🇽", name: "México" },
  { code: "UY", ddi: "598", flag: "🇺🇾", name: "Uruguai" },
  { code: "PY", ddi: "595", flag: "🇵🇾", name: "Paraguai" },
  { code: "PE", ddi: "51", flag: "🇵🇪", name: "Peru" },
  { code: "ES", ddi: "34", flag: "🇪🇸", name: "Espanha" },
  { code: "FR", ddi: "33", flag: "🇫🇷", name: "França" },
  { code: "DE", ddi: "49", flag: "🇩🇪", name: "Alemanha" },
  { code: "IT", ddi: "39", flag: "🇮🇹", name: "Itália" },
  { code: "GB", ddi: "44", flag: "🇬🇧", name: "Reino Unido" },
  { code: "JP", ddi: "81", flag: "🇯🇵", name: "Japão" },
  { code: "CA", ddi: "1", flag: "🇨🇦", name: "Canadá" },
  { code: "AU", ddi: "61", flag: "🇦🇺", name: "Austrália" },
  { code: "AO", ddi: "244", flag: "🇦🇴", name: "Angola" },
  { code: "MZ", ddi: "258", flag: "🇲🇿", name: "Moçambique" },
];

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
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setSelectedCountry(COUNTRIES[0]);
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
      telefone: `+${selectedCountry.ddi}${telefone.replace(/\D/g, "")}`,
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
          <DialogTitle className="text-xl">Quase lá! Falta pouco para liberar seu acesso.</DialogTitle>
          <DialogDescription>Preencha seus dados abaixo para continuar com a assinatura.</DialogDescription>
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
            <div className="flex gap-2">
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={isSubmitting}
                    className="w-[110px] shrink-0 justify-between px-2 font-normal"
                  >
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="text-base leading-none">{selectedCountry.flag}</span>
                      <span>+{selectedCountry.ddi}</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0 max-h-[280px] overflow-y-auto" align="start">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                      onClick={() => {
                        setSelectedCountry(country);
                        setCountryOpen(false);
                      }}
                    >
                      <span className="text-base leading-none">{country.flag}</span>
                      <span className="flex-1">{country.name}</span>
                      <span className="text-muted-foreground">+{country.ddi}</span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
              <Input
                id="telefone"
                placeholder="(XX) 9XXXX-XXXX"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
                required
                disabled={isSubmitting}
                className="flex-1"
              />
            </div>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            Você está assinando o <span className="font-semibold text-foreground">{plan.name}</span>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
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
