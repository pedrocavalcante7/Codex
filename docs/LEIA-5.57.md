# Códice do Aventureiro 5.57 — Feiticeiro de 2014

Versão 5.57, versionCode 175. Atualização sobre a 5.56/código 174, preservando o pacote br.com.codice.aventureiro e o certificado original.

## Como selecionar

No Criador de Personagens, etapa Classe, escolha Feiticeiro. No campo “Versão do Feiticeiro”, escolha “Feiticeiro · D&D 2014”. A edição padrão continua sendo 2024 para todas as fichas existentes que não fizeram essa escolha. A preferência é salva por personagem; as duas edições usam a mesma chave interna de classe para não quebrar espaços, salvaguardas, recursos, multiclasse ou fichas já salvas. Elas não podem ser adicionadas como duas classes simultâneas.

## Comportamento

- 2014: subclasse no nível 1, benefícios posteriores nos níveis 6/14/18; sem a habilidade ou o recurso Feitiçaria Inata.
- 2024: mantém subclasse no nível 3, Feitiçaria Inata e toda a progressão anterior.
- Feitiçaria dos Sonhos: na opção 2014, Destino dos Sonhos e suas duas primeiras magias são recebidos no nível 1; as duas magias seguintes chegam no 3. A opção 2024 preserva a adaptação da 5.56. A tabela, os alvos, os usos e as substituições de magias continuam funcionando.
- Linhagem Dracônica de 2014 também disponível no modo 2014, com benefícios nos níveis originais, PV por nível de Feiticeiro desde o 1º nível e CA 13 + Destreza sem armadura. Essas contas respeitam recálculos repetidos e não curam fichas feridas ao recarregar.
- Metamagia no nível 3: duas opções; outra no 10 e outra no 17 (quatro no total). As oito opções de 2014 estão descritas na habilidade.
- Pontos de Feitiçaria a partir do nível 2, máximo igual ao nível da classe. Progressão de magias conhecidas de 2014: 2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15.
- Aumento de Atributo no nível 19, em lugar da Dádiva Épica da classe de 2024; Restauração Feiticeira no nível 20 recupera 4 Pontos de Feitiçaria no Descanso Curto.
- O Criador, evolução, Catálogo, fichas salvas e troca de personagem respeitam a edição escolhida. Ao alternar edições, as escolhas de subclasse compatíveis são preservadas; escolhas específicas são guardadas por edição.

Esta é uma opção de progressão da classe dentro do Códice. O catálogo de magias, os antecedentes, equipamentos e demais sistemas continuam compartilhados com o aplicativo de 2024. Não é uma conversão de todo o app para D&D 2014. Somente Feitiçaria dos Sonhos e Linhagem Dracônica de 2014 estão disponíveis nessa edição; as outras subclasses de 2024 não são convertidas automaticamente.

## Fontes e implementação

Regras-base oficiais de 2014: https://www.dndbeyond.com/sources/dnd/basic-rules-2014/classes (seção Sorcerer). Feitiçaria dos Sonhos: PDF Planegea fornecido pelo usuário, páginas físicas 71–72. O módulo da 5.56 e os Saurian foram mantidos; ver docs/LEIA-5.56.md como registro histórico.

O módulo novo está no final de project/android-codice/assets/spell-ui434.js e em docs/update557.js. Foram feitos ajustes pontuais no módulo Planegea (nível e tabela por edição), nos limites de subclasse do Criador, em progression47.js, play.js e no cálculo inicial de PV em rules.js. A verificação de PV é feita desde o carregamento inicial para evitar alterações indevidas em fichas feridas.

Não executar scripts históricos com caminhos implícitos. Para reproduzir esta entrega use tools/build_sorcerer557.py. A base 5.56 está incluída. Passe --base, --project, --tools, --keystore e --output explicitamente. Dependências: Python 3, Java e Android Build Tools 35.0.0 (apksigner, zipalign, aapt2). Defina CODICE_KEYSTORE_PASSWORD no ambiente. O DEX e resources.arsc são preservados da 5.56; todos os assets são comparados com os fontes e a versão final é verificada pelo aapt2.

A chave privada original continua separada: Codice-assinatura-original.p12, library_file_id libfile_5f82b26f85c88191ab0660553773df07; alias codice; certificado SHA-256 7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041. Nunca gerar uma chave substituta nem incluir a chave em ZIPs de fontes.

## Validação

qa557.cjs: origem no nível 1, ausência de Feitiçaria Inata na lista e nos recursos, Sonhos 1/3 e substituição no nível 2, limites de magias de 2014, Metamagia 3, Aumento de Atributo 19, Restauração 20, PV/CA dracônicos e isolamento entre personagens de 2014 e 2024.

qa557-browser.cjs: seleção real no Criador, subclasse no nível 1, recursos e magias, persistência após reload, avanço para nível 3, alternância reversível para 2024, Linhagem Dracônica, Catálogo e preservação de PV feridos após reload.

qa556.cjs: regressão da espécie Saurian e Feitiçaria dos Sonhos no modo 2024 aprovada. Testes DOM com jsdom 26.1.0 e navegador real em viewport 412 × 915. Sem instalação Android ou teste de FPS em telefone.

Para DOM: npm ci --prefix qa --ignore-scripts; node qa/qa557.cjs. Para navegador, instalar Playwright e configurar PLAYWRIGHT_PATH e CHROME_PATH antes de executar qa/qa557-browser.cjs. Os testes antigos dentro do projeto podem representar interfaces superadas; não executá-los cegamente.

## Continuidade

A base atual é a 5.57. A próxima versão deve usar código maior que 175 e partir de seus fontes completos, preservando as preferências das fichas. Salvar o APK e os fontes, conferir integridade e assinatura, e recuperar o APK salvo para comparar tamanho e SHA-256 contra o original antes de entregar. Não publicar versão Web/iPhone sem solicitação. Esta entrega é Android.
