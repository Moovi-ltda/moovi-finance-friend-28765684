function AnimatedHero() {
  return (
    <div className="w-full">
      <div className="flex gap-3 pt-0 pb-5 md:py-5 items-center justify-center flex-col">
        <div className="flex gap-2 flex-col items-center">
          {/* Header */}
          <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl max-w-5xl tracking-tighter text-center font-bold leading-tight text-gray-900">
            <span className="block text-green-700 whitespace-nowrap md:whitespace-normal">Organize seu dinheiro</span>
            <span className="block">no seu Dashboard </span>
            <span className="block">em segundos.</span>
          </h1>

          {/* SubHeader */}
          {/* AJUSTE AQUI: Adicionei 'mb-0' para garantir zero margem inferior. */}
          <p className="text-base leading-relaxed tracking-tight text-muted-foreground font-bold max-w-2xl text-center px-4 md:text-lg mt-4 mb-0">
            <span className="md:hidden">
              <span>Sem apps complexos ou planilhas chatas. </span>
              <span className="text-green-600 font-bold">Lance tudo no Dashboard e a Moovi </span>
              <span>organiza seus dados automaticamente. </span>
            </span>

            <span className="hidden md:block text-center px-4 md:text-lg mt-4 mb-0">
              Sem apps complexos ou planilhas chatas.{" "}
              <span className="text-green-600 font-bold">Lance tudo no Dashboard e a Moovi </span> organiza seus dados
              automaticamente.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
