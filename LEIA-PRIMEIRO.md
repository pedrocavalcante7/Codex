# Codex 5.94 — leia primeiro RESUMO-TECNICO-5.94.md

Android: br.com.codice.aventureiro.novo, versionCode211, certificado da linha Novo preservado. Próximo code>=212. Preserve pacote, origem local, armazenamento e chave existente. Chave privada separada libfile_dd07df089ee881918a5b80286a7ecdeb; nunca incluir nos fontes ou no Site.

5.84: hero incorpora session-header e persistent-abilities471; é um único quadro arrastável na web, mantendo a chave hero:0 e as preferências anteriores. preparePanels583 retira temporariamente unified-character584 para não mudar a chave. Limpar estilos de masonry do summary interno. mountCharacter571 ainda reorganiza nós legados; unifyCharacter584 deve ser executado depois de render. Desativado transform herdado no portrait-band interno para evitar sobreposição.

Criador web fixo, rolagem apenas no wizard-body, roda capturada com preventDefault; fundo fica bloqueado por :has(dialog[open]). Invocações elegíveis agrupadas por nível requerido e ordenadas alfabeticamente no idioma ativo. Lista de Invocações com título e detalhe em linhas separadas, tipografia legível. Hexblood tem chifres branches, pele roxa padrão e paletas roxas/verdes, preservando cores e opções salvas.

Spellcasting mostra símbolos das classes, inclusive várias em multiclasse. Configurações oferecem ordenação manual por setas e ordem alfabética, usando spellOrder445; preserva níveis, classe e grupos de preparação. HP Controls redesenhado com totais, quantidade numérica, dano/cura e temporários; mantém seletores de atualização e handlers existentes. Brasão de nível sem losango inferior e bônus centralizado, legendas HP/CA reposicionadas. Skills web mantém3x2 com largura máxima760px e níveis none/trained/expert visualmente progressivos. Botão+ de ataques no pergaminho junto da engrenagem. Botões do cabeçalho padronizados.

Módulo legível docs/update584.js e código nativo anexado ao spell-ui434.js. Site existente appgprj_6af9aa52b5108191a5573582917356b4, URL https://codice-aventureiro-pedro.richibis14.chatgpt.site/ . Fontes web no repositório do Site. Não recriar ou alterar acesso.

Validação: qa584 Android/web (ordem real das magias no DOM, Invocações, HP, cores do avatar, rodinha isolada, identidade e persistência do painel e das fichas). Prévia real web: rolagem deixou pageY e posição do diálogo imóveis; HP legível; arraste do quadro unificado e reload. Regressões em docs/qa584-results.txt. APK assinatura v2/v3, alinhamento, manifesto, CRC e37assets verificados. Sem instalação em celular físico.


5.85: docs/update585.js e módulo anexado ao spell-ui434.js. Resumo com margens20px, retrato e botões proporcionais sem quebrar palavras; HP/CA lado a lado, controles abaixo e carteira em colunas com rótulos. Mantidos dados, ações e hero:0. Número do coração deslocado -5px por transform, somente HP. Inventory e Character Features têm título idêntico.

Perícias em duas colunas independentes: esquerda STR/DEX/INT, direita WIS/CHA/CON. Preservados seis atributos/salvaguardas,18perícias, scores, modificadores, rolagens, fontes/proficiências e configurações. Ordenação alfabética por idioma dentro dos grupos. Cabeçalho compacto, bônus ao lado, sem SVG ornamental que sobrepunha o nome; SVG oculto só nesses cabeçalhos. Quadro web ocupa uma coluna padrão, proporcional aos demais. Expertise com aura leve. Os wrappers ability-column585 não são cards nem devem mudar chaves de painel. Consultas devem usar descendentes .ability-panel463, sem pressupor filhos diretos do grid. Nova disposição substitui3x2 anterior por pedido do usuário.

Testes5.85 Android/web em qa585.cjs e regressões em docs/qa585-results.txt. Prévia real web confirmou perícias proporcionais, título Inventory/Features26px e transform do coração emmatrix(1,0,0,1,0,-5). Sem instalação em celular físico.


5.86 USER OVERRIDE: título/nível, atributos e HP/CA voltam a ser3quadros separados, como referência anterior. restoreCharacter586 substitui unifyCharacter584/integrateSummary583 e move persistent-abilities471/session-header para character-page571. preparePanels583 volta ao core panelsBefore584 e remove classe unified-character584; chaves e dados preservados. HP/CA verticais à esquerda dos controles, carteira com rótulos abaixo das moedas. Não recombinar quadros.

Recolhimento completo: regras panel-hidden469 têm precedência sobre display:grid dos módulos de perícias/inventário. Títulos26px em todos os pergaminhos, inclusive captions internas. Skills/saves em negrito700 via estilo inline importante para superar fontes legadas. Ícones+ SVG idênticos em Inventory/Spellcasting/Weapons. Inventory tem funil com busca por nome e filtro all/equipped/stored, salvo em playState.inventoryFilter586. Filtro nunca remove ou reordena dados do inventário, apenas oculta barras. Total de peso permanece total real.

Espaçamento externo20px: eliminar margens duplicadas de cards; wrappers nativos verticais display:contents. Web masonry com grid-auto-rows1px precisa OBRIGATORIAMENTE row-gap0 e column-gap20px; não deixar regra vertical gap20 sobrescrever row-gap na web. Altura é medida+20 e pode arredondar até1px. Prévia web confirmou20–20.89px de intervalo. Recolher um quadro deve recalcular masonry.

Testes qa586 Android/web (collapse completo, labels negrito, SVG+, filtros e não mutação, quadros separados, identidade, rerender/switch/reload), regressões docs/qa586-results.txt. Prévia real web confirmou collapse e fontes26px, labels700, funil e gaps. APK code204 assinatura v2/v3/CRC/alinhamento/37assets. Sem instalação em telefone físico. Próximo code>=205.


5.87 USER OVERRIDE: use docs/update587.js. Nome/nível continua separado; atributos agora pertencem ao topo de session-header. Faixa única pergaminho com6atributos, CA à esquerda, totais HP/temporário lado a lado, barra/death saves, descanso/inspiração e moedas dentro da mesma borda ameixa/azul/dourada. Mover nós existentes, nunca reconstruir inputs/handlers. Heart ruby-crest permanece no DOM oculto para compatibilidade com updateHPDisplay. HP tiles mantêm seletores hp-current550/hp-temp550; + abre controles existentes. Death circles usam deathFail/deathSuccess; botão permanece habilitado só em0PV. restoreCharacter586/integrateSummary583/unifyCharacter584 agora delegam integrateReference587; integração depois de cada render. Limpar masonry apenas do atributo interno; chaves hero:0 e session-header:0 preservadas. Carteira5colunas e posição do botão definidas inline!important para superar CSS legado.

Android5.87/code205, certificado preservado. Próximo>=206. Web SHA58cd52e6a10f2ad3bce13d1a61950b1011a473e3. QA587 nativo/web cobre integração, controlesHP/temp, collapse/filtros e persistência. Regressões docs/qa587-results.txt. Prévia real confirmou borda única, seis atributos, alinhamentos, carteira e nenhum overflow horizontal. Sem instalação em celular físico.

Web5.87 publicada com sucesso: Site versão27, deployment appgdep_6afc4c418cb0819191dc6a4492f166d4. URL fixa preservada.


5.88: usuário nomeou session-header como Quadro de HP / HP Panel. docs/update588.js compacta a integração587, remove headings Attributes/Coins doDOM após integração, restaura botão shop-launch510 estático retangular na sexta coluna da carteira e limpa border-top duplicada. Nunca remover handlers nem o ruby-crest oculto. integrateReference587 é envolvida e as3aliases atualizadas; prepare/render chamam a binding nova. BrasãoCA tem SVG e número em regiões separadas e centralizadas, fonte36px para1–2dígitos e25px para3+, margem interna13px; legenda abaixo doSVG. Defense mantém fórmulas, bônus, inputs, seleção, cálculo e handlers; estilo escuro com labelsclaras, inputspergaminho com textoescuro, fecha visível.

Android5.88/code206; próximo>=207. QA588 Android/web: integração compacta e headings ausentes, shop original, fontes CA2/3dígitos, cores Defense, controlesHP/temp, perícias/filtros, troca/reload de fichas. Regressões de navegação579 Android/web e startup581 e persistência web. Prévia real: QuadroHP547.7px de altura em coluna420px (antes~740px), sem títulos extras; CA centralizada; Defense legível. Sem instalação em celular físico.

Web source5.88:57c739a9d8a9fb59322f82d41de7739fdfdc5488.


5.89: Quadro de HP com padding12px, intervalos8px, sem divisórias horizontais internas. Carteira ocupa100% sem padding reservado pelo antigo botão absoluto; loja retangular continua na sexta coluna, alinhada à borda direita. Removido temp-add587; o próprio tile hp-temp550 é botão acessível para HP Controls. Defesa/brasão mantidos.

Segurar450ms e arrastar nomes/linhas de spells, inventory e features reordena por identidade estável na ficha; toque rápido mantém detalhes. Mouse/pointer e touch separados; toque que se move antes do hold mantém scroll nativo. Capture emwindow impede os antigos holds de preparar/excluir. Drag ativo destaca origem/destino, auto-scroll, cancela emEscape/blur/cancel/troca de ficha, e bloqueia click sintético. Botões de quantidade/equipar/conjurar não iniciamdrag. Magias preservam grupos de classe/nível/preparação existentes; preparação agora acessível nas configurações. Setas de ordenação por teclado permanecem.

Exclusão de magias/features apenas em Gerenciar entradas nas respectivas configurações, com confirmação e guarda de proprietário. Filtros finais em progressionRows47/spellEntries preservam remoções após rebuild, inclusive entradas acrescentadas por wrappers mais recentes. Não usar índices DOM como identidade salva. docs/update589.js é fonte legível, anexada ao spell-ui434.js nativo.

QA589: mouse/touch longhold, cancelamento, ordem e metadados, delete guard/settings, reload; compactoHP, Defense, filtros/collapse. Prévia web confirmouHP481.9px em coluna425px, wallet sem espaço ao lado da loja (bordas coincidem), divisórias0px e acesso ao HPtemporário sem+. APK5.89/code207 com assinatura existente v2/v3, CRC/alinhamento,37assets e DEX/resources preservados. Sem instalação em celular físico. Próximo code>=208.

Web5.89 publicada: SHA ecabc8f02690cf5e03ad216f302d624fb188a413; Site versão29; deployment appgdep_6b0339572e2c8191ab92894aa5e7482c succeeded. Regressões completas em docs/qa589-results.txt.

5.90/code208: docs/update590.js. Features default level (explicit manual/name choices preserved). Spells name/level/origin automatic sort buttons in settings; ordering within existing class/level/preparation groups. Drag switches manual. Class451+always tinted muted darker green. qa590 passes native/web; APK signature/alignment/37assets validated. Web SHA5ba43d51bb4402990956bb75c8aa64110e4dc79d, Site30 published. Next code209.

5.91/code209: update591.js introduces preferred spell mode. One-time per-sheet preferredOrder591 selects preferred; subsequent choices retained. Category species0, feats/background feats1, always subclass2, always class3, normal prepared4, unprepared5. Red/blue/green/gold palette; removes broad class-always590 tint. Existing level sections retained. qa591 native/web categories, sorting/settings and storage passed. APK validated. Next code210.


5.92/code210 (next>=211): update592.js. Web layout uses explicit columns/row starts in saved panel order, fixed20px gaps; editing quantity/height no longer triggers column auto-placement. Reordering still uses webPanelOrder583; no storage migration. Skill markers: none empty, trained filled, half left-filled (Jack of All Trades), expertise filled with outer ring; existing rolls remain. Invocation spell keys invocationNNN: receive purple, preserving preferred sort priority. Complete Defense and Passive Skills prose in PT/EN. Save DC/Spell Attack artwork+number top:-8px; temp HP padding reset; coin inputs centered without spinner offsets.
QA592 native/web covers 18 skill markers, all ranks, translation, invocation detection, stable columns after inventory update, manual order persistence. Browser preview verified circles, translations, HP/coin alignment and three-column layout. APK5.92 signaturev2/v3,37assets,CRC/alignment,unchangedDEX/resources verified; no physical-device installation. Web Site32 deployed at SHA4c0f67a34db47a49cc49568843c7b67482423e91. APK SHA256 c8c121fd971ea74324a9975bdbdd5d26911f58ee4b509273079d4cc819ab78a5.

Regressões concluídas: qa568,570,573–580 nativo/web,581-startup,582 nativo/web,589/drag nativo/web,590,591,592 e persistência web aprovados. QA568 ajustado para selecionar explicitamente ordenação alfabética, substituída como padrão na5.90.


5.93/code211: docs/update593.js replaces repacking with saved per-character/per-column-count spatial positions (panelPositions593). Semantic panel IDs remain stable after render and collapse; layout never reads cleared style.order. Drag uses window capture to suppress legacy dragging; snaps to columns/10px vertical increments, shows destination ghost and moves only selected card. Collision chooses nearest free slot; other cards stay fixed. Content growth is capped by next card with internal scroll; collapse retains empty space. Responsive sizes have separate positions. Actual browser verified unchanged x/y for all8cards after inventoryQuantity and only inventory moved on free-space drop.
Full purple/gold spell backgrounds apply to entire row, cells and line containers. Ability score boxed; currency text raised3px through balanced padding; web proficiency number raised8px. Adjust Weapon uses complete English phrases, class/yes/no options and all3checkbox descriptions. Existing package/signature/data preserved. APK SHA256 83c5b516b6823539460895ce3c84731e2cf89b185a35101d05bc5d4579c33906. Web SHA4e5fc510f1883ab38de50c4eea763d7da0f6680a. Next code>=212. No physical-device installation.

5.93 validation complete: qa593 native/web,568,570,581-startup,573–580 native/web,582 native/web,589 web/drag and exact database persistence passed. Site33 deployment succeeded.


5.94/code212: 100 generated avatar assets integrated offline. Read RESUMO-TECNICO-5.94.md for current consolidated requirements, tests, limitations and rebuild instructions. docs/avatar-assets594.js and docs/update594.js replace avatarSvg571; options and portrait persistence preserved. Art extraction in tools/prepare_avatar594.py; install via tools/install_avatar594.py --web-dist PATH/dist. Web commit16b427649f592345882f54401b376170207b48b4, Site34 deployed. Next versionCode>=213. No physical Android install test.
