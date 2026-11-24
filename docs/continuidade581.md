# Correção 5.81 — 16/11/2026

Pacote e assinatura preservados; versionCode 199, próximo >=200. Atualiza Códice Novo sem limpar dados. Fontes: Codice-do-Aventureiro-5.81-fontes.zip.

Causa do travamento 5.80: brand580 reescrevia aria-label observado mesmo sem mudança, criando ciclo infinito de MutationObserver/microtasks. Corrigido no módulo580 nativo e web com comparação antes de escrever título/atributo. Teste qa581-startup.cjs deixa o event loop executar e limita microtasks para detectar regressão. Não encerrar testes antes dos callbacks assíncronos.

Verificado: prévia real abriu e Inventory recolheu via clique; inicialização assíncrona sem erros/ciclo; qa580 e persistência web passaram. APK validado, sem teste em telefone físico. Web publicada no commit 6bfc7fa9b7c4d701d5b2cf397b0c3264b9ed6bf0.

Histórico anterior:

# Códice do Aventureiro Novo / Adventurer's Codex — 5.80

Linha ativa: pacote br.com.codice.aventureiro.novo, versão5.80, versionCode198. Nome do aplicativo Android separado: Códice do Aventureiro Novo. Nome e logo internos em inglês: Adventurer's Codex. Atualiza Códice Novo5.79 preservando chave e armazenamento. O original br.com.codice.aventureiro permanece independente. Entregar APK por link direto; ZIP é somente fonte.

Preservar a chave NOVA em Codice-Novo-assinatura-backup.json, Library libfile_dd07df089ee881918a5b80286a7ecdeb, alias codice-novo. O backup contém senha e PKCS12 em base64. Nunca o publique em um repositório ou dentro dos fontes. Certificado:5cf3155973dd295d9755f057142f8f5c3f7ffc01f0514dfa5d65f8d720f93b36. Próximo versionCode>=199. Não gerar outra chave nem pedir a antiga senha perdida.

Fontes atuais: Codice-do-Aventureiro-5.80-fontes.zip. Builder build-codice-novo.py (mesma identidade Library libfile_da55037f259c81918f4beb7505b10653) usa baseline5.73 e assets atuais; modifica somente versão, pacote e nome no manifesto, preservando DEX/resources e37assets nativos. --base --project --tools --signing-backup --output --version5.80 --code198. Use espaços entre as opções e os valores ao executar.

5.80: web sem abas em grade responsiva, com cartões lado a lado e sem esticar sua altura; seleção de Invocações em conjunto seguida de tabela; detalhes+escolhas+talentos no mesmo diálogo, pendências vermelhas com?;28 opções2024 visíveis com motivos de pré-requisitos; Investment of the Chain Master incluída; Pactos concedem magias/ataques e removem concessões ao retirar a Invocação. Spells antes de Skills and Features, preservando IDs internos. Diálogos no tema de pergaminho. PWA tem manifesto em inglês.

Validações: assinatura v2/v3, pacote/code, atividade Java absoluta, integridade/alinhamento e todos os assets iguais aos fontes. Testes580 Android/web, regressões e persistência web aprovados. A prévia visual não abriu, e não houve instalação em telefone físico.

Web fixa: https://codice-aventureiro-pedro.richibis14.chatgpt.site/

Commit web5.80:94172c1a7bd6a1ee0030f91bdbd3eb338685e817.
APK5.80 SHA256:606dd789adc376d39a373104573a2496164ea717345844dac11625e1b3ebc681.
