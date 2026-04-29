const { useState } = React;

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "main",
  "plan": "monthly",
  "showStickyCTA": true
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAKS_DEFAULTS);

  return (
    <div className="app">
      <Header />
      <div className="mobile-shell">
        <Hero headline={tweaks.headline} />
        <TrustStrip />
        <HowItWorks />
        <Benefits />
        <SocialProof />
        <Compare />
        <Features />
        <Pricing plan={tweaks.plan} />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>

      {tweaks.showStickyCTA && <StickyCTA />}

      <TweaksPanel title="Tweaks · Moovi LP">
        <TweakSection title="Hero">
          <TweakRadio
            label="Headline"
            value={tweaks.headline}
            onChange={(v) => setTweak('headline', v)}
            options={[
              { value: 'main',    label: 'WhatsApp' },
              { value: 'benefit', label: 'Dor' },
              { value: 'simple',  label: 'Simples' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Oferta">
          <TweakRadio
            label="Plano"
            value={tweaks.plan}
            onChange={(v) => setTweak('plan', v)}
            options={[
              { value: 'monthly', label: 'Mensal' },
              { value: 'annual',  label: 'Anual' },
            ]}
          />
        </TweakSection>
        <TweakSection title="UX">
          <TweakToggle
            label="Sticky CTA mobile"
            value={tweaks.showStickyCTA}
            onChange={(v) => setTweak('showStickyCTA', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
