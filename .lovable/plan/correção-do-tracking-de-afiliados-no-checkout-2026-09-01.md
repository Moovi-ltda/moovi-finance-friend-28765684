# Correção do tracking de afiliados no checkout

## Implementação
1. Atualizar a captura para aceitar `afiliado`, `ref`, `aff` e `a`, tanto na página de vendas quanto no checkout.
2. Persistir o último ID válido em `localStorage` usando `moovi_afiliado`, com leitura compatível da chave antiga para não perder atribuições em andamento.
3. Garantir que o checkout capture novamente os parâmetros ao carregar e recupere o ID persistido no envio.
4. Montar `externalReference` como `[telefone]|[plano]|AFILIADO:[id]`, mantendo `AFILIADO:` vazio quando não houver atribuição.
5. Validar o payload gerado e o build da aplicação.

## Detalhes técnicos
- O último link de afiliado acessado continuará sobrescrevendo o anterior.
- O ID será sanitizado antes de entrar no payload para não corromper o separador `|`.
- A limpeza do tracking continuará ocorrendo apenas depois de pagamento confirmado.
