# Códice do Aventureiro 5.58

Base atual: 5.58, versionCode 176. Partiu da 5.57 sem mudar DEX, armazenamento, pacote ou certificado.

## Mudanças

- Seletores para adicionar magias usam as opções estilizadas do app. Magias ordenadas pelo nível (Truques = 0), depois pelo nome no idioma atual. Os seletores do criador também respeitam essa ordem.
- Compêndio: seção Magias com todo o catálogo instalado (PHB 2024 e conteúdos já integrados), pesquisa por nome português/inglês ou texto e filtro de nível. Independe da classe e das magias da ficha. Descrições são renderizadas ao expandir cada item.
- Criador: espaços de Invocações correspondem ao nível de Bruxo (1,3,3,3,5,5,6,6,7,7,7,8,8,8,9,9,9,10,10,10). Opções agrupadas pelo nível requerido e ordenadas alfabeticamente pelo nome exibido. Pré-requisitos de nível e de outra Invocação são conferidos, repetições exigem alvos diferentes. Concluir exige exatamente a quantidade e opções válidas.
- As escolhas ficam na ficha em invocations558 e aparecem na lista de características. As regras das 28 opções foram extraídas das páginas 154–156 do livro já fornecido. Textos originais das Invocações preservados em inglês; nomes exibidos em português. Elas são registros de escolhas e referência; esta mudança não automatiza todos os efeitos individuais das Invocações.
- Invocações que se aplicam a truques permitem concluir o alvo na etapa Magias, depois de escolher os truques. Lições dos Primeiros registra o talento escolhido como opção da Invocação; seus efeitos não são aplicados automaticamente por este módulo.

## Compilar

Use tools/build_update558.py, passando --base baseline/Codice-do-Aventureiro-5.57.apk, --project project/android-codice, --tools para Android Build Tools 35.0.0, --keystore para a chave original separada e --output para um caminho novo. Configure CODICE_KEYSTORE_PASSWORD no ambiente. Nunca crie outra chave. O script valida hash da base, versão/código, certificado, CRC, alinhamento, DEX/resources e comparação de todos os assets.

O módulo novo está no final de assets/spell-ui434.js e em docs/update558.js. A função existente spellHtml435 foi exposta como window.spellHtml558 para reutilizar a mesma apresentação de regras no compêndio. Nenhum nome novo de asset é carregado pelo Android.

Chave separada: Codice-assinatura-original.p12, libfile_5f82b26f85c88191ab0660553773df07. Alias codice. Certificado: 7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041.

## Verificação

npm ci --prefix qa --ignore-scripts; node qa/qa558.cjs. Regressões pertinentes: qa/qa557.cjs e qa/qa556.cjs. Os três testes DOM passaram. O teste qa558-browser.cjs está incluído, mas não foi executado com sucesso: o Chromium não conseguiu iniciar neste ambiente devido ao bloqueio de sockets. Sem inspeção visual renderizada, instalação em celular ou teste de FPS.

A próxima versão deve usar código maior que 176. Preserve as escolhas de edição do Feiticeiro, Saurian, Sonhos e as fichas existentes. Não use empacotadores históricos nem adicione JS inacessível ao carregador. Não inclua a chave privada ou node_modules nos fontes.
