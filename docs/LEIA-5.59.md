# Códice do Aventureiro 5.59

Base atual: 5.59, versionCode 177, partindo da 5.58. Pacote, origem de armazenamento, assinatura, DEX e resources.arsc preservados.

## Mudanças

- O único mecanismo de gesto existente agora escuta os eventos de toque em document e aceita inícios em toda a tela, inclusive a seleção de personagens, cabeçalho, brasão, atributos e tabelas. Diálogos abertos, campos de edição com foco, áreas de texto e controles de intervalo preservam seus gestos nativos. Movimentos verticais não trocam abas. Distância e velocidade mínimas foram reduzidas sem remover o bloqueio do clique acidental.
- Cache limitado a três páginas já montadas. Ao voltar a uma delas sem alterar a ficha, seus nós são reutilizados sem executar toda a cadeia de renderização. Salvamentos de dados, recálculos normais, troca de personagem e configurações que renderizam a ficha invalidam o cache. A alternativa sem animações também usa o cache.
- O primeiro movimento nunca chama uma fábrica de página. Prévias são preparadas em períodos ociosos; se ainda não houver prévia, uma superfície vazia acompanha o movimento até o conteúdo de destino ser montado ao confirmar. Páginas em cache fornecem prévias completas. O aquecimento adia trabalho enquanto há rolagem ou gesto e só usa um intervalo ocioso com tempo disponível.
- Índice de regras por ID e listas reutilizadas por idioma reduzem buscas repetidas. Traduções são agrupadas durante o render. O observador antigo foi desconectado: o novo processa só subárvores alteradas e ignora partículas sem texto. Registros por nó e idioma/unidade evitam retradução. Salvamentos derivados disparados pelo render de uma troca de aba são agrupados e feitos após a transição; pagehide descarrega o salvamento pendente. Alterações explícitas continuam salvas imediatamente.
- Nomes completos em inglês para todos os 185 itens da loja, incluindo os 135 que não tinham campo en. Removida a substituição isolada de conectores. Roupas de viagem aparece como Traveler’s Clothes em inglês e reverte corretamente. Textos completos das Invocações em português e textos em inglês para as adições de Saurian, Sonhos e Feiticeiro 2014. Nomes e notas personalizados são preservados.
- O quadro do cabeçalho e o brasão limitam a pintura ao próprio espaço; textos do brasão também ficam contidos.

## Código e compilação

Os ajustes do mecanismo de gesto foram feitos diretamente no módulo existente de spell-ui434.js. O módulo adicional está no final do mesmo asset, também registrado em docs/update559.js; as traduções integrais estão em docs/rules-en559.js. Nenhum nome novo de asset é carregado pelo Android.

Use tools/build_update559.py com --base baseline/Codice-do-Aventureiro-5.58.apk, --project project/android-codice, --tools apontando para Android Build Tools 35.0.0, --keystore apontando para a chave original separada e --output apontando para um arquivo novo. Configure CODICE_KEYSTORE_PASSWORD no ambiente. Não use empacotadores históricos, não gere uma nova chave e não descarte os fontes atuais.

Chave separada: Codice-assinatura-original.p12, libfile_5f82b26f85c88191ab0660553773df07, alias codice. Certificado SHA-256: 7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041.

## Verificação e limites

npm ci --prefix qa --ignore-scripts. Executar qa/qa559.cjs e qa/qa559-observer.cjs. Regressões: qa/qa558.cjs, qa/qa557.cjs e qa/qa556.cjs. Auditorias de idioma: qa/audit559.cjs, qa/audit-wide559.cjs e qa/audit-pt559.cjs. Os testes DOM confirmaram o gesto nos elementos permanentes, retorno à aba sem render completo, invalidação do cache, isolamento de rolagem vertical/diálogos e isolamento de partículas do tradutor. As auditorias cobrem telas centrais, oito etapas do criador e seções principais do compêndio; não constituem uma prova de cada frase possível nem incluem textos personalizados do usuário.

O APK passou em CRC, alinhamento, versão/código, certificado e comparação dos assets. Não houve navegador renderizado, teste visual do brasão, instalação Android ou medição de FPS em aparelho nesta versão. Melhorias de desempenho foram verificadas por redução de trabalho e contagem de renders, não por FPS no telefone.

A próxima versão precisa de código maior que 177. Preserve as regras 2014/2024 por personagem, Saurian, Sonhos, seleção de magias e Invocações da 5.58. Não inclua chave privada ou node_modules nos fontes. Esta entrega é Android.
