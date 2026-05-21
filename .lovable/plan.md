## Plano de correção

1. **Resolver as telas brancas e travamentos no scroll**
   - Remover/parar efeitos pesados vinculados ao scroll no hero, especialmente `useScroll/useTransform` do fundo.
   - Reduzir camadas com blur gigante e elementos decorativos que causam repintura pesada no Safari/mobile.
   - Manter o visual da página, mas com menos custo de renderização.

2. **Otimizar o vídeo do mockup**
   - Trocar o carregamento automático do iframe do Panda por carregamento sob demanda ou somente quando o mockup estiver visível.
   - Exibir thumbnail leve primeiro, evitando que o iframe pese o carregamento inicial e o scroll.
   - Manter o vídeo funcional, mas impedir que ele seja injetado cedo demais no mobile.

3. **Otimizar imagens dos mockups e depoimentos**
   - Adicionar `loading="lazy"`, `decoding="async"` e dimensões estáveis nas imagens usadas dentro do componente `Iphone`.
   - Priorizar só imagens acima da dobra; deixar imagens abaixo carregarem conforme entram na viewport.
   - Reduzir risco de layout shift e tela branca por carregamento simultâneo.

4. **Recriar a seção de funcionalidades no mobile**
   - No desktop, manter o efeito de cards empilhados com GSAP.
   - No mobile, desativar `pin/scrub/ScrollTrigger` e renderizar os cards em uma lista vertical normal.
   - Isso evita o bug do scroll “pular” cards automaticamente e melhora muito a fluidez no celular.

5. **Limpar triggers e listeners corretamente**
   - Garantir que `ScrollTrigger` só rode em desktop e seja removido ao sair da seção.
   - Evitar listeners ou animações contínuas desnecessárias no mobile.

6. **Validação após implementar**
   - Checar console/logs do Vite se houver erro.
   - Testar visualmente em viewport mobile para confirmar: sem telas brancas, cards passando um por vez em scroll natural, vídeo/imagens sem travar o carregamento.