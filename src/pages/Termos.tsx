import { Link } from "react-router-dom";
import mooviLogo from "@/assets/moovi-logo.png";
import Footer from "@/components/Footer";

const Termos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={mooviLogo} alt="Moovi" className="h-10" />
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Termos de Uso
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <p className="text-base text-foreground/90 leading-relaxed mb-8">
            Bem-vindo(a) ao Moovi! Estes Termos de Uso regulam o acesso e a
            utilização da nossa plataforma web de controle financeiro. Ao
            usar o serviço, você concorda integralmente com as condições
            descritas abaixo.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Aceite dos Termos
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Ao criar sua conta e acessar a plataforma do Moovi, você declara
              que leu, entendeu e concorda com estes
              Termos de Uso e com a nossa{" "}
              <Link to="/privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              . Caso não concorde com qualquer parte deste documento, por favor,
              não utilize o serviço.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Natureza do Serviço
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              O Moovi é uma ferramenta de <strong>organização de finanças
              pessoais</strong> que auxilia o usuário no registro de despesas,
              receitas, categorização de gastos, lembretes e visualização de
              dados financeiros.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Importante:</strong> o Moovi não oferece recomendações de
              investimentos, consultoria financeira profissional, assessoria
              tributária ou qualquer tipo de aconselhamento regulado pela CVM ou
              órgãos equivalentes. Decisões financeiras são de inteira
              responsabilidade do usuário.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Assinaturas e Cancelamentos
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              O Moovi oferece os seguintes planos pagos:{" "}
              <strong>Básico, Pro e Premium</strong>. Todos são cobrados em
              ciclo anual, parcelado em até 12x conforme as condições
              apresentadas na página de planos.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                O usuário pode <strong>cancelar a assinatura a qualquer
                momento</strong> pelo Dashboard ou pelos canais de suporte
                oficiais.
              </li>
              <li>
                Após o cancelamento, o acesso permanece ativo até o fim do
                período já pago.
              </li>
              <li>
                Reembolsos seguem o prazo legal de arrependimento de 7 dias
                conforme o Código de Defesa do Consumidor.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Regras de Conduta
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              O usuário se compromete a utilizar o Moovi de forma ética e legal.
              É expressamente <strong>proibido</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                Utilizar a plataforma para envio de spam, mensagens em massa ou
                automações não autorizadas.
              </li>
              <li>
                Realizar atividades ilícitas, fraudulentas, lavagem de dinheiro
                ou qualquer prática contrária à legislação brasileira.
              </li>
              <li>
                Tentar acessar áreas restritas do sistema, realizar engenharia
                reversa ou comprometer a segurança da plataforma.
              </li>
              <li>
                Utilizar a ferramenta para ofender, ameaçar ou prejudicar
                terceiros.
              </li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-3">
              O descumprimento dessas regras pode resultar em suspensão imediata
              da conta, sem direito a reembolso.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Limitação de Responsabilidade
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              O Moovi se compromete a oferecer o melhor serviço possível, porém
              não garante disponibilidade ininterrupta. Não nos
              responsabilizamos por perdas financeiras decorrentes de decisões
              tomadas com base em dados organizados pela ferramenta.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Alterações nos Termos
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Podemos atualizar estes Termos de Uso periodicamente. Alterações
              relevantes serão comunicadas no Dashboard, por e-mail ou no site. O uso
              continuado do serviço após mudanças implica concordância com os
              novos termos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Foro
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Estes Termos são regidos pelas leis da República Federativa do
              Brasil. Fica eleito o foro do domicílio do usuário para dirimir
              quaisquer questões oriundas deste contrato.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Termos;
