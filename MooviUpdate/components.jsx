// Moovi Landing — components v1 (original)
const { useState, useEffect } = React;

// ---------- Icons ----------
const Icon = ({ name, size = 20 }) => {
  const p = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: 2,
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  const icons = {
    arrow:    <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
    whatsapp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    check:    <svg {...p}><polyline points="20 6 9 17 4 12"/></svg>,
    x:        <svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus:     <svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    bell:     <svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    layers:   <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    target:   <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    card:     <svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
    spark:    <svg {...p}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    chart:    <svg {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
    zap:      <svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    shield:   <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    clock:    <svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    star:     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    lock:     <svg {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    pie:      <svg {...p}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
    chat:     <svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  };
  return icons[name] || null;
};

// ---------- Header ----------
const Header = () => (
  <header className="header">
    <div className="header-inner">
      <a href="#" className="logo">
        <div className="logo-mark">
          <img src="assets/moovi-pig.png" alt="" />
        </div>
        <span className="logo-text">moovi</span>
      </a>
      <a href="#oferta" className="btn btn-primary header-cta">
        Começar agora
      </a>
    </div>
  </header>
);

// ---------- Hero ----------
const Hero = ({ headline }) => {
  const headlines = {
    main:    <>Organize seu dinheiro <strong>pelo WhatsApp.</strong> Em segundos.</>,
    benefit: <>Pare de perder dinheiro <strong>sem perceber.</strong></>,
    simple:  <>Seu dinheiro <strong>sob controle</strong> — sem planilha, sem app.</>,
  };
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-content">
        <div>
          <span className="eyebrow">
            <span className="hero-stat-dot" /> Assistente financeiro no WhatsApp
          </span>
          <h1 style={{ marginTop: 16, marginBottom: 16 }}>
            {headlines[headline] || headlines.main}
          </h1>
          <p className="lede">
            Mande uma mensagem como se fosse pra um amigo. A Moovi anota seus gastos,
            categoriza tudo e te avisa quando você está prestes a estourar o orçamento.
          </p>
          <div className="hero-cta-row">
            <a href="#oferta" className="btn btn-whatsapp btn-lg btn-block">
              <Icon name="whatsapp" size={20} />
              Começar grátis no WhatsApp
            </a>
          </div>
          <p className="hero-microcopy">
            7 dias grátis · Cancele quando quiser · Sem cartão
          </p>
          <div className="avatars">
            <div className="avatars-stack">
              <div className="avatar" style={{background:'#FFE0B5',color:'#8B5A1C'}}>JB</div>
              <div className="avatar" style={{background:'#D5E8F5',color:'#1E5A8B'}}>MA</div>
              <div className="avatar" style={{background:'#E8D5F5',color:'#5A1E8B'}}>RS</div>
              <div className="avatar">+5k</div>
            </div>
            <div>
              <div className="stars">
                <Icon name="star" size={14}/><Icon name="star" size={14}/><Icon name="star" size={14}/><Icon name="star" size={14}/><Icon name="star" size={14}/>
              </div>
              <div style={{fontSize:12,color:'var(--muted)'}}>
                <strong style={{color:'var(--ink)'}}>4.9/5</strong> · +5.000 brasileiros usando
              </div>
            </div>
          </div>
        </div>
        <PhoneMockup />
      </div>
    </section>
  );
};

// ---------- Phone WhatsApp Mockup ----------
const PhoneMockup = () => (
  <div className="phone-wrap">
    <div className="phone-chip left">
      <div className="phone-chip-icon"><Icon name="check" size={14} /></div>
      <span>Gasto registrado</span>
    </div>
    <div className="phone-chip right">
      <div className="phone-chip-icon" style={{background:'#FFE9D6',color:'#8B5A1C'}}><Icon name="bell" size={14} /></div>
      <span>Alerta de limite</span>
    </div>
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-notch" />
        <div className="wa-header" style={{paddingTop:32}}>
          <span className="wa-header-back">‹</span>
          <div className="wa-avatar">
            <img src="assets/moovi-pig.png" alt="" />
          </div>
          <div>
            <div className="wa-name">Moovi</div>
            <div className="wa-online">online</div>
          </div>
          <div className="wa-actions"><span>📞</span><span>⋮</span></div>
        </div>
        <div className="wa-body">
          <div className="wa-bubble out">
            Gastei <span className="wa-amount red">R$ 47,90</span> no mercado agora 🛒
            <div className="wa-time">14:32 <span className="check">✓✓</span></div>
          </div>
          <div className="wa-bubble in">
            Anotado! ✅<br/>
            Categoria: <strong>Alimentação</strong>
            <div className="wa-card">
              <div className="wa-card-title">Mercado · maio</div>
              <div className="wa-card-row">
                <span style={{color:'#666'}}>R$ 387 / R$ 600</span>
                <span style={{color:'var(--moovi-green-dark)',fontWeight:700}}>64%</span>
              </div>
              <div className="wa-bar"><div className="wa-bar-fill" style={{width:'64%'}} /></div>
            </div>
            <div className="wa-time">14:32</div>
          </div>
          <div className="wa-bubble out">
            quanto ainda posso gastar com lazer esse mês?
            <div className="wa-time">14:33 <span className="check">✓✓</span></div>
          </div>
          <div className="wa-bubble in">
            Você tem <span className="wa-amount">R$ 142,30</span> de saldo em <strong>Lazer</strong> até dia 31. 💚
            <div className="wa-time">14:33</div>
          </div>
        </div>
        <div className="wa-input">
          <span>😊</span>
          <span>Mensagem</span>
          <div className="wa-send-btn">→</div>
        </div>
      </div>
    </div>
  </div>
);

// ---------- Trust Strip ----------
const TrustStrip = () => (
  <section className="trust section-tight">
    <div className="trust-grid">
      <div><div className="trust-num">+5.000</div><div className="trust-label">brasileiros usando</div></div>
      <div><div className="trust-num">R$ 12M+</div><div className="trust-label">organizados no app</div></div>
      <div><div className="trust-num">4.9★</div><div className="trust-label">avaliação dos usuários</div></div>
      <div><div className="trust-num">98%</div><div className="trust-label">recomendam pra um amigo</div></div>
    </div>
  </section>
);

// ---------- Como Funciona ----------
const HowItWorks = () => {
  const steps = [
    { n:'01', t:'Adicione no WhatsApp', d:'Salve o número da Moovi nos seus contatos. Sem app pra baixar.', illus:'+55 11 99999-0000' },
    { n:'02', t:'Mande sua primeira mensagem', d:'Conte um gasto, uma receita, ou pergunte algo. Linguagem natural.', illus:'"Gastei 35 no Uber"' },
    { n:'03', t:'A Moovi cuida do resto', d:'Categoriza, organiza, controla limites e te avisa do que importa.', illus:'✓ Categoria: Transporte' },
  ];
  return (
    <section id="como-funciona">
      <div className="s-head">
        <span className="eyebrow">Simples assim</span>
        <h2>Em 3 passos. Sem segredo.</h2>
        <p className="lede">Você já usa WhatsApp todo dia. A Moovi só precisa que você continue usando.</p>
      </div>
      <div className="steps">
        {steps.map(s => (
          <div className="step" key={s.n}>
            <div className="step-num">{s.n}</div>
            <div className="step-body">
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="step-illus"><Icon name="chat" size={14}/> {s.illus}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- Benefits ----------
const Benefits = () => {
  const items = [
    { ic:'target', t:'Pare de perder dinheiro sem perceber', d:'Cada gasto registrado na hora. Você vê pra onde seu dinheiro foi — antes do extrato chegar.' },
    { ic:'zap',    t:'Sem planilha. Sem app pra abrir.',    d:'Tudo acontece no WhatsApp, onde você já está. Zero fricção, zero esquecimento.' },
    { ic:'shield', t:'Decisões com clareza, não com susto', d:'Saiba quanto pode gastar, antes de gastar. Chega de medo no fim do mês.' },
  ];
  return (
    <section style={{background:'var(--surface)'}}>
      <div className="s-head">
        <span className="eyebrow">Por que Moovi</span>
        <h2>Mais que controle. Tranquilidade.</h2>
      </div>
      <div className="benefits-grid">
        {items.map((b,i) => (
          <div className="benefit" key={i}>
            <div className="benefit-icon"><Icon name={b.ic} size={22}/></div>
            <div><h4>{b.t}</h4><p>{b.d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- Social Proof ----------
const SocialProof = () => {
  const tests = [
    { q:'Em 2 semanas eu já entendi onde meu salário tava sumindo. Cortei R$ 380 de coisas que eu nem usava.',               n:'Juliana B.', r:'Designer, 28',  i:'JB' },
    { q:'Nunca consegui manter planilha. Aqui é só mandar mensagem como se fosse pra um amigo. Funciona de verdade.',          n:'Marco A.',   r:'Vendedor, 34',  i:'MA' },
    { q:'O alerta antes do limite estourar salvou meu mês umas 3 vezes. Era exatamente o que eu precisava.',                   n:'Renata S.',  r:'Médica, 31',    i:'RS' },
  ];
  return (
    <section className="section-dark" id="prova">
      <div className="s-head">
        <span className="eyebrow dark">Prova social</span>
        <h2>Mais de 5.000 brasileiros<br/>já recuperaram o controle.</h2>
      </div>
      <div className="testimonial-track">
        {tests.map((t,i) => (
          <div className="testimonial" key={i}>
            <div className="testimonial-stars">
              {Array.from({length:5}).map((_,j) => <Icon key={j} name="star" size={14}/>)}
            </div>
            <p className="testimonial-quote">"{t.q}"</p>
            <div className="testimonial-who">
              <div className="testimonial-avatar">{t.i}</div>
              <div>
                <div className="testimonial-name">{t.n}</div>
                <div className="testimonial-role">{t.r}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="proof-numbers">
        <div><div className="num">5.2k+</div><div className="label">usuários ativos</div></div>
        <div><div className="num">R$ 12M</div><div className="label">organizados</div></div>
        <div><div className="num">94%</div><div className="label">cortam gastos no 1º mês</div></div>
        <div><div className="num">4.9★</div><div className="label">avaliação média</div></div>
      </div>
    </section>
  );
};

// ---------- Comparison ----------
const Compare = () => {
  const rows = [
    ['Funciona no WhatsApp',    true,  false],
    ['Sem app pra baixar',      true,  false],
    ['Categoriza automático',   true,  false],
    ['Alerta antes de estourar',true,  false],
    ['Curva de aprendizado',    'Zero','Alta'],
    ['Tempo pra começar',       '30s', '2 semanas'],
  ];
  return (
    <section>
      <div className="s-head">
        <span className="eyebrow">Por que não outro app</span>
        <h2>Apps de finanças são complicados. Moovi não é um app.</h2>
      </div>
      <div className="compare">
        <div className="compare-head">
          <div>Comparação</div>
          <div className="moovi-col">Moovi</div>
          <div>Apps tradicionais</div>
        </div>
        {rows.map((r,i) => (
          <div className="compare-row" key={i}>
            <div>{r[0]}</div>
            <div className="moovi-col">
              {typeof r[1]==='boolean'
                ? (r[1] ? <Icon name="check" size={18}/> : <Icon name="x" size={16}/>)
                : r[1]}
            </div>
            <div>
              {typeof r[2]==='boolean'
                ? (r[2] ? <span className="check-yes"><Icon name="check" size={18}/></span> : <span className="check-no"><Icon name="x" size={16}/></span>)
                : <span style={{color:'var(--muted)'}}>{r[2]}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- Features ----------
const Features = () => {
  const items = [
    { ic:'bell',   t:'Lembretes',   d:'Contas próximas do vencimento, no momento certo.' },
    { ic:'layers', t:'Categorias',  d:'Tudo organizado automaticamente: mercado, lazer, transporte.' },
    { ic:'target', t:'Limites',     d:'Defina quanto quer gastar. Receba alerta antes de estourar.' },
    { ic:'card',   t:'Cartões',     d:'Acompanhe a fatura de todos os seus cartões em um lugar.' },
    { ic:'spark',  t:'Insights',    d:'Padrões, picos e oportunidades de economia detectados pra você.' },
    { ic:'chart',  t:'Relatórios',  d:'Resumo semanal e mensal direto no chat.' },
    { ic:'pie',    t:'Metas',       d:'Junte dinheiro pra um objetivo, com acompanhamento automático.' },
    { ic:'clock',  t:'Histórico',   d:'Cada movimentação salva e pesquisável.' },
  ];
  return (
    <section style={{background:'var(--surface)'}} id="funcionalidades">
      <div className="s-head">
        <span className="eyebrow">O que tem dentro</span>
        <h2>Tudo que você precisa.<br/>Nada que você não usa.</h2>
      </div>
      <div className="features-grid">
        {items.map((f,i) => (
          <div className="feature" key={i}>
            <div className="feature-icon"><Icon name={f.ic} size={18}/></div>
            <h4>{f.t}</h4>
            <p>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- FAQ ----------
const FAQ = () => {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q:'Funciona mesmo? Como?',              a:'Funciona. Você manda mensagem no WhatsApp como faria pra um amigo, e a Moovi entende, organiza e te responde. Mais de 5.000 pessoas usam todo dia.' },
    { q:'Preciso baixar algum app?',           a:'Não. Tudo acontece dentro do WhatsApp que você já tem. Zero instalação, zero login, zero app extra ocupando espaço.' },
    { q:'Meus dados financeiros estão seguros?',a:'Sim. Criptografia ponta-a-ponta do WhatsApp + servidores brasileiros conformes com a LGPD. A Moovi nunca acessa sua conta bancária.' },
    { q:'E se eu esquecer de mandar um gasto?',a:'Sem problema. Você pode adicionar mais tarde dizendo a data: "ontem gastei 50 no jantar". A Moovi entende.' },
    { q:'Posso cancelar a qualquer momento?',  a:'Pode. Sem multa, sem ligação, sem burocracia. É só mandar uma mensagem pedindo cancelamento.' },
    { q:'Tem garantia?',                       a:'Sim — 7 dias de teste grátis e mais 7 dias de garantia. Se em 14 dias você não sentir diferença, devolvemos 100% do valor.' },
  ];
  return (
    <section id="faq">
      <div className="s-head">
        <span className="eyebrow">Dúvidas?</span>
        <h2>As respostas que importam.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((f,i) => (
          <div className={`faq ${open===i?'open':''}`} key={i}>
            <button className="faq-q" onClick={() => setOpen(open===i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="faq-icon"><Icon name="plus" size={14}/></span>
            </button>
            <div className="faq-a">
              <div className="faq-a-inner">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------- Pricing ----------
const Pricing = ({ plan }) => {
  const plans = {
    monthly: { was:'R$ 39,90', amount:'19', cents:'90', period:'/mês', save:'Promo de lançamento · 50% OFF' },
    annual:  { was:'R$ 478',   amount:'14', cents:'90', period:'/mês', save:'Anual · economize R$ 60' },
  };
  const pl = plans[plan] || plans.monthly;
  return (
    <section id="oferta">
      <div className="s-head">
        <span className="eyebrow">Oferta</span>
        <h2>Custa menos que um delivery por mês.</h2>
        <p className="lede">Um único plano. Tudo incluído. Sem pegadinhas.</p>
      </div>
      <div className="pricing-card">
        <div className="pricing-badge"><Icon name="zap" size={11}/> Plano Moovi+</div>
        <div className="pricing-name">Moovi Completo</div>
        <div className="pricing-tagline">Tudo desbloqueado, pra sempre.</div>
        <div className="pricing-price"><span className="pricing-was">{pl.was}</span></div>
        <div className="pricing-price">
          <span className="pricing-currency">R$</span>
          <span className="pricing-amount">{pl.amount}</span>
          <span className="pricing-amount" style={{fontSize:32,opacity:0.85}}>,{pl.cents}</span>
          <span className="pricing-period">{pl.period}</span>
        </div>
        <div className="pricing-save">{pl.save}</div>
        <ul className="pricing-features">
          <li><Icon name="check" size={18}/> Mensagens ilimitadas no WhatsApp</li>
          <li><Icon name="check" size={18}/> Categorias e limites personalizados</li>
          <li><Icon name="check" size={18}/> Alertas inteligentes antes do estouro</li>
          <li><Icon name="check" size={18}/> Insights e relatórios automáticos</li>
          <li><Icon name="check" size={18}/> Gestão de cartões e contas</li>
          <li><Icon name="check" size={18}/> Suporte humano em até 1h</li>
        </ul>
        <a href="#" className="btn btn-whatsapp btn-lg btn-block pricing-cta">
          <Icon name="whatsapp" size={20}/> Começar 7 dias grátis
        </a>
        <div className="guarantee">
          <div className="guarantee-seal"><Icon name="shield" size={18}/></div>
          <div>
            <strong style={{color:'white'}}>Garantia de 14 dias.</strong> Não gostou? Devolvemos 100%, sem perguntas.
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Final CTA ----------
const FinalCTA = () => (
  <section style={{padding:'60px 0'}}>
    <div className="final-cta">
      <div className="final-cta-content">
        <span className="eyebrow dark">Última coisa</span>
        <h2 style={{marginTop:14,marginBottom:14}}>
          Daqui 30 dias, ou você está no controle do seu dinheiro — ou não.
        </h2>
        <p className="lede" style={{color:'rgba(255,255,255,0.85)'}}>
          Os primeiros 30 dias começam hoje. Comece em 30 segundos.
        </p>
        <a href="#oferta" className="btn btn-whatsapp btn-lg">
          <Icon name="whatsapp" size={20}/> Começar agora — é grátis
        </a>
      </div>
    </div>
  </section>
);

// ---------- Footer ----------
const Footer = () => (
  <footer className="footer">
    <div className="footer-logo logo">
      <div className="logo-mark">
        <img src="assets/moovi-pig.png" alt="" />
      </div>
      <span className="logo-text">moovi</span>
    </div>
    <div className="footer-links">
      <a href="#">Termos</a>
      <a href="#">Privacidade</a>
      <a href="#">Suporte</a>
      <a href="#">Contato</a>
    </div>
    <p className="footer-fine">© 2026 Moovi. Seu assistente financeiro pessoal. Feito com 💚 no Brasil.</p>
  </footer>
);

// ---------- Sticky CTA ----------
const StickyCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`sticky-cta ${show?'show':''}`}>
      <div className="sticky-cta-info">
        <div className="sticky-cta-price">R$ 19,90/mês · 7 dias grátis</div>
        <div className="sticky-cta-sub">Sem cartão · Cancele quando quiser</div>
      </div>
      <a href="#oferta" className="btn btn-whatsapp">
        <Icon name="whatsapp" size={16}/> Começar
      </a>
    </div>
  );
};

Object.assign(window, {
  Header, Hero, TrustStrip, HowItWorks, Benefits,
  SocialProof, Compare, Features, FAQ, Pricing,
  FinalCTA, Footer, StickyCTA, Icon
});
