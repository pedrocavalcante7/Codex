# Códice do Aventureiro 5.56 — Planegea

Versão 5.56, versionCode 174. Base recuperada: 5.55/código 173. Pacote br.com.codice.aventureiro. Certificado original SHA-256 7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041.

## Implementação

- Espécie Saurian com quatro linhagens: Asa de Couro (Leatherwing), Cauda de Martelo (Hammertail), Presa Afiada (Sharpfang) e Pé Palmado (Webfoot).
- Memória Ancestral: Sentir Sussurros no nível 1, Bênção no 3 e Augúrio no 5; concessões por nível total, dois recursos gratuitos independentes a partir dos níveis correspondentes.
- Sentir Sussurros incluído no catálogo com descrição em português, metadados e referências em negrito/itálico.
- Traços específicos exibidos apenas para a linhagem selecionada. Voo e natação no resumo; CA +1 da Cauda de Martelo aplicada sem acumular em recálculos ou persistir após trocar a linhagem. Demais efeitos condicionais são descritos; o app não controla tabuleiro, voo físico ou agarrões.
- Subclasse Feitiçaria dos Sonhos, com seis características, dez magias adicionais e tabela de sonhos, disponível no Criador e Catálogo.
- Tabela d8 dentro de Destino dos Sonhos; registro de criaturas amistosas, resultado persistente, usos separados por criatura, progressão 1/2/3 usos, duas rolagens no nível 6 com livre escolha quando iguais, e limpeza no Descanso Longo.
- Destino Focado permite conceder um novo sonho a uma criatura com usos esgotados por 1 Ponto de Feitiçaria. Esse fluxo usa uma rolagem simples (a rolagem dupla é opcional no livro).
- Substituição de uma magia da subclasse por nível de Feiticeiro após adquirir a subclasse: mesmo círculo, Encantamento ou Ilusão, lista de Feiticeiro/Bruxo/Mago; trava por nível para impedir trocas ilimitadas ao retroceder/avançar no editor.
- Manifestar Visão tem recurso próprio e opção de pagar 10 Pontos de Feitiçaria após gastar o uso gratuito. Os efeitos do simulacro são aplicados pelo jogador; não é criada uma ficha de criatura automaticamente.

## Adaptações explícitas de 2024

O livro original concede a subclasse no nível 1. No Códice ela é adquirida no nível 3, com os benefícios iniciais e as quatro magias dos níveis originais 1 e 3; os demais benefícios permanecem nos níveis 6, 14 e 18. A descrição informa isso.

Aumentos de atributos continuam vindo do Antecedente, como nas demais espécies de 2024. As opções e variantes de aumento do livro estão documentadas na descrição da espécie, mas não são somadas automaticamente ao Antecedente. O livro não define atributo de conjuração para Memória Ancestral; o Criador permite registrar Inteligência, Sabedoria ou Carisma em acordo com o mestre.

## Fonte

PDF fornecido pelo usuário: Planegea_Indice_Clicavel(1).pdf. Páginas físicas do PDF 57–59 (Saurian), 71–72 (Feitiçaria dos Sonhos), 112 (Sentir Sussurros); numeração impressa 55–57, 69–70 e 110. PDF composto por imagens; as páginas foram renderizadas e lidas, com OCR auxiliar. O PDF não foi duplicado neste ZIP.

## Código

Fontes completos em project/android-codice. O módulo incremental está integrado no fim de assets/spell-ui434.js e reproduzido em docs/update556.js. O CSS novo está no fim de assets/style.css. Nenhum novo nome de asset foi adicionado ao carregador nativo. Todos os 37 assets são acessíveis. classes.dex e resources.arsc são idênticos à base 5.55.

Não executar package484.py ou build-android.sh históricos com seus caminhos e versões implícitos. Para reproduzir esta entrega use tools/build_planegea556.py com caminhos explícitos e a base 5.55 incluída. Ferramentas externas necessárias: Python 3, Java e Android Build Tools 35.0.0 (apksigner, zipalign, aapt2). O script exige a chave privada original separada e CODICE_KEYSTORE_PASSWORD no ambiente.

```
python3 tools/build_planegea556.py --base baseline/Codice-do-Aventureiro-5.55.apk --project project/android-codice --tools /caminho/build-tools/35.0.0 --keystore /caminho/Codice-assinatura-original.p12 --output /pasta/nova/Codice-do-Aventureiro-5.56.apk
```

Chave separada: Codice-assinatura-original.p12, library_file_id libfile_5f82b26f85c88191ab0660553773df07; alias codice. Não gerar chave substituta e não colocar chave privada em ZIPs de fontes. Não desinstalar o app para atualizar; exportar JSON antes de testes físicos. Preservar dados, identificador, origem WebView e certificado.

## Validação

Testes qa556.cjs e qa556-browser.cjs aprovados. Cobrem as quatro linhagens, concessões 1/3/5, CA sem acumular e reversível, seleção de subclasse e níveis, magias, tabela, rolagem, recursos, reposição, descanso, substituições e persistência após reload. qa555.cjs (Point Buy) aprovado. Navegador real em viewport 412 × 915 e testes DOM com jsdom 26.1.0.

O teste histórico qa480.cjs procura checkboxes de perícias que foram removidos nas versões 5.x e falha também na base sem o módulo Planegea. É obsoleto para esta interface; não é usado como validação desta entrega. Os testes históricos preservados dentro de project não devem ser executados cegamente.

Sem teste de instalação ou FPS em aparelho físico. APK validado por CRC, estrutura, alinhamento, assinatura v2/v3, certificado original, versão real e comparação de todos os assets com os fontes. Conferir tamanho/hash do APK recuperado após disponibilizar por causa de um truncamento ocorrido em uma entrega antiga.

Este ZIP contém a implementação Android. Não houve publicação da versão web/iPhone hospedada nesta tarefa.

Para os testes DOM: npm ci --prefix qa --ignore-scripts; node qa/qa556.cjs. Para Point Buy: executar node qa555.cjs a partir de qa/. Para navegador: instalar Playwright e configurar PLAYWRIGHT_PATH (módulo) e CHROME_PATH (executável do Chromium), depois executar node qa/qa556-browser.cjs. As capturas são apenas locais para revisão, não fazem parte da entrega.
