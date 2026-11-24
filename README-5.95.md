# Codex 5.95 — candidato a lançamento

As mudanças de interface estão em docs/update595.js e nos assets de ambas as plataformas. Não é um APK compilado. A versão 5.94 continua sendo a última instalação validada. O atualizador nativo precisa de compilação e testes em dispositivo.

## GitHub Actions / Pages
1. Crie um repositório privado para os fontes (confirme a licença dos dados antes de tornar conteúdo público). Envie esta pasta, incluindo .github. Não envie a chave de assinatura.
2. Configure Actions secret `CODEX_SIGNING_BACKUP_JSON` com o conteúdo do backup privado original, exclusivamente na interface de secrets do GitHub.
3. Configure Actions variable `CODEX_UPDATE_MANIFEST_URL` com a URL HTTPS final do arquivo `update-manifest.json` no servidor Pages. Habilite Pages com GitHub Actions. O fluxo fornecido pressupõe que a URL de download de releases é pública; para repositório privado, use hospedagem pública separada para os artefatos e ajuste a URL no workflow. Não exponha o backup de assinatura.
4. Execute o workflow manualmente para versão 5.95 / código 213. Valide o APK em dispositivo após exportar as fichas. Verifique o manifesto e a disponibilidade dos artefatos antes de distribuir. A URL do servidor ficará embutida no APK.
5. Para versões futuras de assets, mantenha o código de versão crescente, atualize os assets Android e Web e a versão exibida, execute novamente o workflow. Alterações Java exigem novo APK e adaptação do builder/manifesto.

A hospedagem em novo domínio não compartilha localStorage com o site antigo. Exporte e importe as fichas se mudar de domínio. A origem Android permanece https://appassets.androidplatform.net/.

Validação desta execução: sintaxe JS das alterações e whitelist de 37 assets; pacote de teste assinado localmente. Sem compilação Android, teste visual completo, execução GitHub Actions ou publicação externa confirmada.
