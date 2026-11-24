# Codex — resumo técnico de continuidade, versão 5.94

Documento preparado para continuar o desenvolvimento em outra conversa do ChatGPT. Estado consolidado em 23/11/2026, horário de Brasília. Leia este documento antes dos registros cronológicos: requisitos posteriores substituem decisões antigas.

## 1. Estado entregue

- Aplicativo: **Codex**, anteriormente Códice do Aventureiro / Adventurer’s Codex.
- Finalidade: fichas de personagens de D&D, com foco em regras de 2024 / edição 5.5e, criação guiada, gerenciamento durante sessões e personalização visual.
- Plataformas: aplicação web estática e aplicação Android com WebView e conteúdo local.
- Web publicada: https://codice-aventureiro-pedro.richibis14.chatgpt.site
- Versão do produto: **5.94**. Versão de publicação do Site: **34**. São contagens diferentes.
- APK: `Codex-5.94.apk`, versionCode **212**, 25.807.901 bytes.
- SHA256 do APK: `09243b4b9515c2d637e25ee5c0ea9842f49679a352b00979b253b9f4b12efe8d`.
- Pacote Android: `br.com.codice.aventureiro.novo`.
- Certificado SHA256: `5cf3155973dd295d9755f057142f8f5c3f7ffc01f0514dfa5d65f8d720f93b36`.
- Site ID: `appgprj_6af9aa52b5108191a5573582917356b4`. Preservar esse Site e seu acesso público.
- Commit web publicado: `16b427649f592345882f54401b376170207b48b4`.
- Saved version: `appgprj_6af9aa52b5108191a5573582917356b4~appgver_5e776bc2376c8191b1d0818807195c59`.
- Deployment: `appgdep_6b04e44f57a88191b3197b0b5bcbefb8`, resultado `succeeded`.
- Próxima atualização Android: versionCode **213 ou superior**.

A 5.94 integra os assets de avatar gerados pelo ChatGPT. A 5.93 anterior já continha o posicionamento espacial persistente dos quadros e as últimas correções de cores de magias e alinhamento. Não tratar a 5.93 como a versão atual.

## 2. Arquitetura e persistência

A interface usa HTML, CSS e JavaScript sem framework de componentes. Muitas funções são globais e foram estendidas por wrappers sucessivos. Os números nos nomes (`571`, `593` etc.) indicam a versão que introduziu o comportamento, não que sejam descartáveis.

O Android contém uma `MainActivity.java` com WebView, ponte `CodiceAndroid` e origem fixa `https://appassets.androidplatform.net/`. Essa origem é parte da identidade do armazenamento. A ponte permite operações nativas, como exportação de JSON. O carregador intercepta os recursos locais e permite **37 nomes de assets específicos**. Arquivos novos com nomes arbitrários não serão servidos pelo APK atual. Os módulos novos são anexados a `spell-ui434.js`; imagens novas do avatar são incorporadas como data URIs. A web pode carregar os módulos em arquivos separados.

Persistência principal:

| Informação | Local / estrutura |
|---|---|
| Fichas e seleção atual | `localStorage['codice2024']`, objeto `db` com `chars` e `selected` |
| Preferências globais | `localStorage['codice-settings48']`, objeto `SETTINGS48` |
| Ficha ativa | `c()` |
| Estado de jogo da ficha | `playState()` / `playInit(x)`, em `x.play` |
| Retratos | `portraitUpload`, catálogo de uploads e armazenamento através de `storePortrait` |
| Opções do avatar | `x.avatar571` |
| Rascunho do avatar | `avatarDraft571`, com `owner` e `options` |
| Criação guiada | `creationWizard`, `wd()`, `ensureCreator554()` |
| Invocações | `invocations558`, identidades `uid570`, escolhas `choices580` |
| Ordem manual de magias | `spellOrder445` e wrappers posteriores |
| Filtros de inventário | `playState().inventoryFilter586` |
| Posições dos quadros web | `playState().panelPositions593`, separadas por quantidade de colunas |

As fichas são locais ao navegador ou à instalação. **Não existe sincronização automática entre celular e web**; preservar a exportação/importação de backups. A atualização deve preservar pacote, assinatura, origem local, IDs e formatos dos dados. Não limpar o armazenamento como solução para um bug.

## 3. Funcionalidades existentes

### Personagens e criação

- Múltiplas fichas independentes; criar, selecionar, editar e excluir personagem, com proteções de confirmação e preservação da seleção.
- Nome, espécie, antecedente, classe/subclasse, nível, atributos, biografia, anotações, condições, retrato e histórico.
- Multiclasse, progressão de nível, histórico de níveis, proficiências e cálculos derivados.
- Criador guiado com seleção de espécie, antecedente, classes, atributos, magias, perícias, talentos e características.
- Compra de atributos por pontos e escolhas de bônus. Ajustes rápidos atualizam os controles sem reconstruir toda a janela a cada clique; aplicação do modelo é adiada aproximadamente 170 ms e descarregada ao avançar/fechar.
- Seleções em lote para grupos compatíveis, respeitando opções elegíveis por slot.
- Magias aparecem antes de perícias/características no fluxo visual, preservando os IDs internos das etapas.
- Na web, a janela do criador permanece fixa e a roda do mouse rola seu conteúdo, sem deslocar a página de fundo.
- Invocações são filtradas pelos pré-requisitos, agrupadas por nível requerido e ordenadas alfabeticamente no idioma ativo. Escolhas que se tornam inválidas são removidas do rascunho dependente.
- Hexblood: suporte a tamanhos, tipo Fey, opções de atributo de conjuração e magias/recursos da espécie. Avatar inferido com galhos e pele roxa; opções verdes e cores personalizadas permanecem disponíveis.

### Resumo e Quadro de HP

- Quadro de nome/nível separado, com retrato, proficiência, tamanho, tipo, deslocamento, histórico, proficiências, subir de nível e dados.
- **Quadro de HP** é o nome adotado para o painel que integra os seis atributos/modificadores, CA, HP, HP temporários, barra de vitalidade, salvaguardas contra morte, dados de vida/descanso, inspiração e moedas/loja.
- CA calculada por armadura/fórmula, escudo, bônus mágicos e modificadores; também existe modo manual.
- HP Controls com totais e ações de dano, cura e HP temporários. O tile de HP temporários é clicável; não contém mais um botão “+”.
- Defense acessível pelo brasão de CA; reúne armadura, escudo, bônus e condições com texto contrastante.
- Descansos curto/longo, dados de vida, recuperação de recursos e espaços de pacto. Nem toda regra especial de suplemento é automaticamente simulada; campos e controles manuais continuam relevantes.
- Salvaguardas contra morte com caveira/asas e indicadores de sucessos/falhas.
- Inspiração heroica, moedas de cinco denominações, lançamentos e compra de itens.

### Saving Throws and Skills

- Seis atributos/salvaguardas e 18 perícias, com valores, modificadores, rolagens e ajustes.
- Perícias agrupadas por atributo. **Disposição atual:** duas colunas independentes; STR/DEX/INT à esquerda, WIS/CHA/CON à direita. A antiga solicitação de 3 colunas × 2 linhas foi substituída pela referência posterior do usuário.
- Títulos e nomes de skills/saves em negrito. Expertise com aura discreta.
- Marcadores: vazio = sem proficiência; cheio = proficiência; meio cheio = meia proficiência; cheio com anel externo = Expertise.
- Janela de perícias passivas; ajustes específicos, vantagem/desvantagem e bônus extras.
- Recolhimento completo ao tocar no título; controles internos não devem iniciar arraste de quadros.

### Character Features e Invocações

- Características derivadas de classe, nível, espécie, talentos e escolhas, com detalhes consultáveis.
- Organização e edição através da engrenagem do quadro, com modo de gerenciamento de entradas.
- Invocações individuais aparecem somente dentro da janela aberta por **Eldritch Invocations**, evitando duplicação de barras no quadro principal.
- Título e detalhes em linhas separadas, com espaçamento legível na janela de invocações.
- Seleção e escolhas associadas, incluindo Lessons of the First Ones, Pact of the Tome, Pact of the Chain e Pact of the Blade.
- Tome integra truques/rituais; Chain concede Find Familiar; Blade gera ataque associado, removido quando sua origem é retirada; Investment mantém escolhas relacionadas ao familiar.
- Características podem ser reordenadas por toque prolongado e arraste; toque rápido abre informação; exclusão de feature apenas pelo gerenciamento nas configurações.

### Spellcasting

- Lista de magias, detalhes, preparação, espaços, usos, concentração, fontes e classes de conjuração.
- Save DC e Spell Attack, rolagem de ataque mágico e modificadores extras.
- Ícone/símbolo da classe junto do título, incluindo múltiplas classes; sem substituir por nome textual comprido.
- Adicionar magia, filtrar, configurar, ordenar manualmente por setas ou arraste e aplicar ordenação automática por nome, nível, origem e **preferencial**.
- Ordenações respeitam os grupos existentes de classe/nível/preparação; não presumir uma lista global plana.
- Modo preferencial: espécie, talento, sempre preparada pela subclasse, sempre preparada pela classe, preparada normal; não preparadas ficam posteriormente. Preferência explícita/manual do usuário deve ser preservada.
- Cores: espécie vermelha; talento azul; subclasse sempre preparada verde; classe sempre preparada dourada; origem em invocação roxa. As barras de invocação e de classe sempre preparada recebem a cor por inteiro, inclusive seus contêineres internos.
- Em 5.90, nível tornou-se padrão; em 5.91 uma migração selecionou preferencial uma vez. Não reexecutar essa migração a cada render nem impor nível sobre uma escolha salva.
- Magias por invocação são detectadas por suas chaves de origem, não pelo nome da magia isolado.
- Exclusão de magias por configurações; toque rápido para informações, segurar aproximadamente 450 ms e arrastar para reorganizar.

### Weapons and Attacks

- Armas do catálogo e ataques personalizados, atributo automático/manual, proficiência, bônus mágico, dano/tipo, propriedades e maestrias.
- Configurações de duas mãos/Versatile, Dueling e ataque extra da propriedade Light.
- Controles de ajustes de ataque e dano; rolagens e estado persistente.
- Botão de adicionar no cabeçalho, ao lado da engrenagem.
- Janela Adjust Weapon teve opções e descrições principais revisadas para inglês completo.

### Inventário, loja e recursos

- Itens, quantidade, peso, estado equipado/guardado, preço e detalhes; total de peso.
- Compra de itens e gerenciamento de moedas, com rótulos dependentes de idioma. Prata em inglês é **SP**; em português permanece PP.
- Funil no Inventory: busca por nome e filtros all/equipped/stored; filtrar não remove itens nem altera o peso total real.
- Reordenação manual por arraste e configurações, preservando IDs dos itens.
- Alterar quantidade não deve mudar a posição dos quadros na web.
- Recursos personalizados e derivados, usos disponíveis, gasto/recuperação e configuração por quadro.
- Gerenciamento automático de equipamentos é opt-in; não reativar implicitamente preferências antigas.

### Interface, navegação e conteúdo

- Compêndio/catálogo local e textos de regras, magias, espécies, talentos e progressões.
- Idiomas português/inglês. Nomes e cores fornecidos pelo usuário não passam por tradução textual.
- Rolador de dados, modos normal/vantagem/desvantagem e controles de jogo integrados.
- Android: abas por padrão, modo vertical selecionável, ordem visual interna 3/0/1/2 (Personagem primeiro); cache limitado das páginas e invalidação controlada.
- Web: dashboard de quadros, sem abas. Preferência antiga de abas não pode esconder seções na web.
- Opção de retorno ao topo ao atingir o final do modo vertical, sem interferir com diálogos/listas internas.
- Quadros recolhíveis, configurações e estados persistentes por ficha.

## 4. Decisões visuais vigentes e pedidos substituídos

Estética de fantasia: pergaminho dourado, ameixa/bordô, azul-petróleo, metais envelhecidos, títulos serifados e pequenos brasões. Preservar essa estética; não redesenhar como dashboard genérico.

| Tema | Regra vigente |
|---|---|
| Nome do produto | Codex nos dois idiomas |
| Quadros do personagem | Nome/nível separado; atributos incorporados ao Quadro de HP |
| Cabeçalho do HP | Sem “Attributes/Atributes” e sem “Coins” |
| Compactação HP | Padding e intervalos reduzidos; sem divisórias horizontais douradas internas |
| Moedas/loja | Uma faixa de largura total, cinco moedas e botão de loja retangular na sexta coluna, sem reserva vazia lateral |
| Títulos dos quadros | 26 px, inclusive Inventory e Character Features |
| Botões “+” | Mesmo SVG para inventário, magias e ataques |
| CA | Número central, margem interna e redução de fonte para números maiores; evitar vazamento |
| Proficiência | Sem losango inferior; bônus centralizado considerando “+”; web deslocado 8 px para cima |
| HP temporário | Número centralizado; sem “+” interno |
| Moedas | Valores centralizados e deslocados 3 px para cima |
| Save DC / Spell Attack | Ícones e números deslocados 8 px para cima |
| Atributos no quadro de perícias | Score dentro de caixa retangular, em vez de simples barra divisória |
| Diálogos escuros | Texto claro no fundo escuro e texto escuro nos inputs claros |
| Skills | Negrito, círculos de treinamento e aura leve para Expertise |

O coração de HP antigo permanece oculto no DOM por compatibilidade com atualizações legadas. O pedido histórico de elevar seu número 5 px não implica fazê-lo reaparecer. Não restaurar versões antigas de unificação/separação lendo um trecho isolado de LEIA-PRIMEIRO.

## 5. Posicionamento dos quadros web — cuidado crítico

`docs/update593.js` substitui o empacotamento/masonry automático antigo. Os quadros usam chaves semânticas e posições explícitas `{col,y,height}`, persistidas por ficha e por quantidade de colunas. O arraste usa pointer events em captura, evita os handlers legados, mostra uma indicação de destino e encaixa em colunas e incrementos verticais de 10 px.

- Só o quadro escolhido deve mudar de posição.
- Colisão procura o espaço livre mais próximo; não empurrar automaticamente os demais.
- Editar inventário, magias, HP ou qualquer conteúdo deve preservar as coordenadas.
- Crescimento do conteúdo pode ser limitado pelo quadro seguinte, com rolagem interna.
- Recolher conserva o espaço salvo; **vazios após recolhimento/arraste podem ser intencionais**.
- Espaçamento de referência de 20 px; evitar margens duplicadas nos wrappers.
- Não usar `style.order` como fonte de verdade: renderizações antigas limpam esse valor.
- Não reintroduzir layout por altura mínima de coluna a cada render. Esse foi o motivo das mudanças indesejadas após editar quantidade.
- IDs e handlers existentes devem ser movidos no DOM, não reconstruídos sem necessidade.

## 6. Avatar ilustrado da 5.94

O usuário pediu explicitamente imagens geradas pelo ChatGPT para as peças e sua integração ao aplicativo. Foram produzidas oito pranchas e corrigidas, pelo gerador, as transparências problemáticas de corpos, equipamentos e expressões. Foram extraídas **100 peças**:

| Categoria | Quantidade |
|---|---:|
| Bases por corpo/espécie | 10 |
| Cabelos | 13 |
| Roupas superiores (12 classes, trapos e finas) | 14 |
| Equipamentos de mão | 24 |
| Chifres, orelhas, presas e caudas | 16 |
| Expressões e referências de idade | 11 |
| Físicos e roupas inferiores | 12 |

“None” é ausência de camada, não imagem. Tamanho pequeno/médio e cores são transformações. O catálogo atual conserva corpo humano, reptiliano, aviário, peludo, parrudo, parrudo baixo, reptiliano pequeno, pequeno esguio, pterossauro e aasimar; quatro físicos; oito expressões; três idades; quatro tipos de orelha; presas de orc; sete tipos de chifre; quatro caudas; 24 equipamentos por mão; quatro roupas inferiores e dois caimentos.

Implementação:

- `art/avatar594/sheets/`: pranchas usadas na extração.
- `art/avatar594/*.png`: recortes individuais; `manifest.json` registra origem, célula, caixa e dimensão.
- `tools/prepare_avatar594.py`: extração por células e limites alfa; produz catálogo de data URIs WebP, qualidade 88, mantendo PNGs de trabalho. Usa Pillow.
- `docs/avatar-assets594.js`: `AVATAR_ASSETS594`, aproximadamente 3,8 MB em texto, 100 assets offline.
- `docs/update594.js`: substitui `avatarSvg571(options)` por composição SVG com imagens incorporadas. Camadas: cauda, corpo, roupa inferior, superior, orelhas/rosto, cabelo, chifres, efeitos e equipamentos.
- Filtros SVG preservam sombreamento e aplicam as seis cores selecionáveis; os equipamentos mantêm suas cores próprias.
- Âncoras de empunhadura por objeto, tamanho/físico, margem para chifres e roupas ampliadas em corpos largos.
- Expressões de não humanos mantêm bicos/focinhos; sobreposição restringe-se principalmente à região dos olhos. Idade usa linhas SVG complementares; nem toda referência gerada de idade é usada como camada inteira.
- Exportação continua pelo fluxo existente: SVG autocontido → Image → canvas 384×422 → PNG → `storePortrait`. Opções ficam em `avatar571`.
- Prévia não altera a ficha; salvar substitui o retrato apenas após “Use as portrait”. Retratos antigos não são regenerados automaticamente.
- `tools/install_avatar594.py --web-dist CAMINHO/dist`: instala o mesmo catálogo/módulo no JS nativo e nos arquivos web. O marcador `// BEGIN AVATAR594` torna a reinstalação idempotente.

### Limitações visuais reais

Não é um sistema de esqueleto/animação ou modelagem 3D. As roupas são imagens frontais escaladas por corpo. Combinações extremas podem mostrar ombros/mãos parcialmente expostos ou empunhaduras que precisam de ajuste individual. As expressões usam sobreposições sobre bases já desenhadas e podem ter transições de pele perceptíveis. Os corpos não humanos, caudas e cabelos longos precisam de mais cobertura visual combinatória. Não prometer encaixe perfeito para todas as combinações só porque todas as opções produzem um SVG válido.

## 7. Estrutura dos arquivos

O ZIP de continuidade contém uma pasta `Codice-Continuidade/`:

| Caminho relativo | Responsabilidade |
|---|---|
| `RESUMO-TECNICO-5.94.md` | Este documento, estado atual consolidado |
| `LEIA-PRIMEIRO.md` | Histórico técnico cronológico; decisões antigas podem ter sido substituídas |
| `AGENTS.md` | Invariantes, requisitos de validação e cuidado com dados/assinatura |
| `project/android-codice/assets/index.html` | Documento e ordem de scripts Android |
| `assets/app.js` | Modelo inicial, CRUD de fichas, render e persistência base |
| `assets/rules.js` | Cálculos, regras derivadas, classes, defesa, descanso |
| `assets/play.js` | Estado de jogo, armas, inventário, recursos e UI de sessão |
| `assets/wizard.js` | Base do criador guiado, escolhas e aplicação |
| `assets/book-data.js`, `catalog.js` | Dados e interface do catálogo |
| `assets/progression-data47.js`, `progression47.js` | Dados e lógica de progressão |
| `assets/language48.js`, `spell-language434.js`, `spell-translations434.js` | Localização e tradução |
| `assets/update41.js`, `update48.js`, `spell-ui434.js` | Extensões históricas e wrappers; o último contém patches novos no APK |
| `assets/style.css`, `fantasy-theme.js` | Aparência base e tema |
| `assets/crop.js` | Tratamento de retratos |
| `assets/*.webp`, `*.svg` | Cenários, retratos e texturas existentes |
| `src/br/com/codice/aventureiro/MainActivity.java` | WebView e ponte Android, sob `project/android-codice/` |
| `docs/update571.js` até `update594.js` | Patches legíveis separados; nem toda versão é necessariamente um arquivo independente |
| `docs/avatar-assets594.js` | Catálogo ilustrado incorporado |
| `art/avatar594/` | Recortes, metadados e pranchas do avatar |
| `qa/*.cjs` | Testes Node/JSDOM históricos e atuais |
| `tools/` | Extração, instalação, build e verificações |
| `baseline/Codice-do-Aventureiro-5.73.apk` | Base binária controlada para reconstruir o APK |
| `web-source/dist/` | Snapshot integral dos arquivos web publicados, sem credenciais |
| `web-source/.openai/hosting.json` | Identidade/configuração do Site |
| `SHA256.json` | Inventário de hashes do pacote de fontes |

Na tabela, caminhos `assets/...` são relativos a `project/android-codice/`. Não confundir o snapshot web com o repositório autenticado do Site: para publicar, reabrir o Site existente e sincronizar com seu HEAD.

No ambiente desta conversa: raiz `/workspace/scratch/1f0b99f433da`; projeto em `project/Codice-Continuidade`; checkout web em `web/.sites-checkout`; saídas em `deliver`. Esses caminhos são temporários e não devem ser presumidos em outra conversa.

## 8. Build e publicação

### APK

O processo reaproveita o APK-base, substitui assets e metadados e assina novamente com a chave existente. Mantém DEX/resources da base; isso explica a limitação dos 37 nomes. Uma alteração real no Java exigirá outro fluxo de compilação, não apenas editar o fonte e executar o empacotador atual.

Exemplo, adaptando caminhos:

```bash
python3 tools/build-codice-novo.py \
  --base baseline/Codice-do-Aventureiro-5.73.apk \
  --project project/android-codice \
  --tools /caminho/android-build-tools \
  --signing-backup /caminho-privado/Codice-Novo-assinatura-backup.json \
  --output /saida/Codex-PROXIMA.apk \
  --version PROXIMA --code 213
```

O diretório de ferramentas precisa de `aapt2`, `zipalign`, `apksigner` e dependências. O builder verifica a base, assinatura, manifesto, launcher, alinhamento, CRC, 37 assets e DEX/resources. Não reutilizar caminho de saída existente: o script exige saída nova.

**Chave privada:** não está no ZIP, APK, documento ou Site. Backup separado identificado na conversa como `Codice-Novo-assinatura-backup.json`, Library ID `libfile_dd07df089ee881918a5b80286a7ecdeb`. Esse ID apenas localiza o arquivo privado; não é seu conteúdo. Solicitar/acessar pelo meio autorizado na nova conversa. Nunca gerar outra chave para uma atualização da mesma linha. A linha `.novo` foi criada porque uma assinatura antiga não estava disponível; não voltar ao pacote antigo.

### Web

Manter o Site e a URL existentes. Abrir o repositório do Site antes de editar, obter credencial temporária sem gravá-la em arquivos, preservar `.openai/hosting.json`, validar, empacotar a partir do mesmo commit enviado, salvar a versão e publicar. O projeto é estático: `dist/index.html` e assets. Não recriar Site nem mudar permissões. Atualizar cache/service worker quando necessário; há código legado de versão no projeto, portanto pesquisar antes de assumir que um único número atualiza tudo.

Entregar **web e APK juntos**. Não publicar chaves, backups de fichas reais, credenciais, node_modules ou páginas temporárias de QA.

## 9. Validação e evidências

5.94:

- `qa594` nativo/web: 100 assets offline; todas as opções válidas geram saídas distintas; sem dimensões inválidas; prévia não altera a ficha.
- Regressões: `qa593` nativo/web; `qa568`; `qa570`; `qa581-startup`; `qa573` a `qa580` nativo e equivalentes web; `qa582` nativo/web; `qa589` e `qa589-drag` web.
- Três falhas iniciais eram expectativas da arte SVG anterior: marcador da sombra e cores convertidas por filtro. Foram corrigidas de forma explícita e os testes afetados passaram novamente. Os logs iniciais são preservados, não apagados.
- Testes de orelhas/presas foram atualizados para os identificadores das novas camadas. Não reaproveitar testes que exigem os paths SVG antigos como prova de regressão visual.
- Inspeção real no navegador: montagem de guerreiro humano, Hexblood, reptiliano e corpo largo; ajustes de roupas/chifres; fluxo de aplicar retrato observado no aplicativo.
- APK: assinatura v2/v3, pacote/code, alinhamento, CRC, assets e DEX/resources verificados.
- **Não houve instalação em celular físico**, nem teste visual de todas as combinações possíveis.

Logs: `docs/qa594-regressions.txt`, `docs/qa594-final.txt`, `docs/qa594-web.txt`, `docs/build594.log`. O comprovante externo `Codex-5.94.apk.json` descreve o APK.

Os testes usam `JSDOM_PATH` apontando para o módulo jsdom instalado. Para testar web, também definir `ASSET_DIR573` para o `dist` e `WEB583=1` quando o teste usar essa variável. Testes históricos podem exigir adaptação quando um requisito mudou; justificar a mudança, não retirar uma asserção apenas para obter verde. JSDOM não prova alinhamento visual, arraste real ou rasterização de SVG no Android.

## 10. Bugs pendentes, riscos e melhorias recomendadas

### Observados ou com cobertura incompleta

1. **Localização ainda não é integral.** As janelas Defense, Passive Skills e Adjust Weapon receberam correções, mas a inspeção web mostrou rótulos/aria residuais mistos, como “Ability Scores principais do character”, “Abrir Defense”, “Details de Second Wind”, “Add weapon ou Attack” e “Diminuir/Aumentar” em itens. Revisar as funções de origem com traduções completas por idioma; não multiplicar tradutores globais.
2. **Acabamento de avatar.** Revisar especificamente corpos largos, roupas com mangas volumosas, mãos/empunhaduras, rostos não humanos e expressão/pele. O resultado é utilizável, mas não uma malha perfeitamente ajustada para todas as combinações.
3. **Cobertura em Android real pendente.** Verificar WebView, memória, abertura/troca rápida de opções, cores/filtros SVG, exportação PNG e reabertura offline em aparelho físico.
4. **Posicionamento responsivo:** há posições independentes por número de colunas. Testar mudanças frequentes de largura, zoom, fontes maiores e conteúdo muito comprido. Rolagem interna e espaços livres são decisões intencionais, mas precisam continuar acessíveis.
5. **Regras fora dos fluxos testados:** o aplicativo não é um motor universal de todas as interações de D&D. Confirmar talentos/subclasses/suplementos específicos com testes dirigidos antes de anunciar automação completa.

### Dívida técnica

- Grande cadeia de wrappers globais, sobrescritas, CSS incremental e observers: risco de ordem de execução, duplicação e loops.
- Não remover guardas de comparação antes de `setAttribute` e não traduzir continuamente conteúdo oculto; houve ciclo de localização corrigido em 5.81.
- O rebuild Android preserva binários legados. Uma futura migração para build nativo convencional precisa manter assinatura/origem/dados e validar a lista de assets.
- Catálogo de imagens em JS aumenta o tamanho do script. Já foi reduzido de aproximadamente 12,6 MB de PNG/base64 para 3,8 MB de WebP/base64; medir em dispositivos modestos antes de ampliar.
- Extração das pranchas usa células e recorte alfa, com limites especiais na prancha inferior. Se regenerar uma prancha, rever coordenadas e âncoras; não assumir que o gerador manteve posições exatas.
- Nome de versão em arquivos antigos não é necessariamente versão efetiva; a última extensão define o comportamento atual.

Não há evidência de que a alteração de quantidade ainda mova os quadros depois da correção 5.93; esse cenário passou em teste real e regressões. Se reaparecer, reproduzir com a ficha e breakpoint envolvidos antes de substituir o algoritmo novamente.

## 11. Como retomar em outra conversa

Anexe este Markdown e `Codex-5.94-fontes.zip`. O APK ajuda a instalar/testar; não substitui os fontes. Disponibilize separadamente o backup privado de assinatura somente quando for reconstruir Android. Não colar a chave em prompts nem colocá-la no ZIP.

Prompt sugerido:

> Continue o desenvolvimento do Codex a partir da versão 5.94. Leia RESUMO-TECNICO-5.94.md, AGENTS.md e os arquivos relacionados à alteração antes de editar. Preserve minhas fichas, pacote Android, assinatura, origem local e Site existente. O Quadro de HP contém os atributos; o quadro de nome/nível continua separado. Preserve o posicionamento espacial persistente dos quadros web. As peças ilustradas de avatar já estão integradas. Verifique os bugs pendentes e faça apenas as alterações que eu solicitar. Entregue APK assinado e web atualizada, com testes e limitações claramente informados.

Prioridade para a próxima rodada: validar APK em aparelho; polir combinações do avatar; eliminar rótulos mistos PT/EN; manter regressão de quantidade de inventário e posição dos quadros. Este documento registra o estado e as decisões, não exige implementar toda a lista de melhorias sem novo pedido.
