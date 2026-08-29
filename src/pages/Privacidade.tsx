import { Link } from "react-router-dom";
import mooviLogo from "@/assets/moovi-logo.png";
import Footer from "@/components/Footer";

const Privacidade = () => {
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
            Política de Privacidade
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>

          <p className="text-base text-foreground/90 leading-relaxed mb-8">
            A sua privacidade é prioridade para o Moovi. Esta Política de
            Privacidade descreve, de forma clara e transparente, como coletamos,
            usamos e protegemos as suas informações ao utilizar nossa plataforma
            web de controle financeiro.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Coleta de Dados
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Para que o assistente Moovi funcione corretamente, coletamos as
              seguintes informações:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/90">
              <li>
                <strong>Número de celular:</strong> usado para identificar sua
                conta e enviar no WhatsApp os lembretes que você agendar.
              </li>
              <li>
                <strong>Nome:</strong> coletado para personalizar o atendimento
                e a experiência dentro da plataforma.
              </li>
              <li>
                <strong>Dados de transações financeiras:</strong> registros de
                receitas, despesas, categorias, metas, lembretes e demais
                informações que você insere voluntariamente no Dashboard para
                organizar suas finanças.
              </li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Não coletamos dados sensíveis sem o seu consentimento explícito e
              você pode solicitar a exclusão dos seus dados a qualquer momento.
            </p>
          </section>

          <section className="mb-10 p-6 rounded-lg border-2 border-primary/30 bg-primary/5">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Uso de Dados do Google (Google Calendar API)
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              O Moovi utiliza a API do Google Calendar exclusivamente para criar
              eventos e lembretes solicitados explicitamente pelo usuário dentro
              da plataforma. Nós não lemos seus eventos passados, não armazenamos sua
              agenda em nossos servidores e jamais compartilhamos os dados do
              seu Google Workspace com terceiros. O uso e a transferência para
              qualquer outro aplicativo das informações recebidas das APIs do
              Google obedecerão à Política de Dados do Usuário dos Serviços de
              API do Google (Google API Services User Data Policy), incluindo os
              requisitos de Uso Limitado (Limited Use requirements).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Segurança
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Levamos a segurança dos seus dados muito a sério. Utilizamos
              criptografia em trânsito (HTTPS/TLS) e em repouso para proteger as
              informações armazenadas em nossos servidores.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              Os dados de cartão de crédito e informações de pagamento são
              processados diretamente por gateways de pagamento seguros e
              certificados, como <strong>Asaas</strong> e <strong>Stripe</strong>.
              O Moovi não armazena, em nenhum momento, números completos de
              cartão de crédito, CVV ou senhas bancárias.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Compartilhamento de Dados
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              O Moovi não vende, aluga ou compartilha seus dados pessoais com
              terceiros para fins de marketing. Compartilhamos informações
              apenas com prestadores de serviços essenciais ao funcionamento da
              plataforma (gateways de pagamento, infraestrutura em nuvem) ou
              quando exigido por lei.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Seus Direitos
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Em conformidade com a LGPD (Lei Geral de Proteção de Dados), você
              pode a qualquer momento solicitar acesso, correção, portabilidade
              ou exclusão dos seus dados. Para isso, basta entrar em contato
              pelos canais oficiais de suporte do Moovi.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Contato
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              Em caso de dúvidas sobre esta Política de Privacidade, entre em
              contato pelos canais oficiais de suporte disponíveis em nosso site.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Privacidade;
