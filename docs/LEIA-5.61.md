# Códice do Aventureiro 5.61

Base atual: 5.61/código 179, construída sobre 5.60. Pacote, assinatura original, origem e formato de armazenamento, classes.dex e resources.arsc preservados.

## Mudanças

- A grade do cabeçalho agora reserva a largura real do brasão: 120 px no celular e 148,333333 px em telas maiores. Antes, a regra móvel reservava somente 88 px. O quadro de título, gênero, classe e demais informações ocupa apenas a coluna restante, com largura mínima zero e quebra de texto. O brasão mantém as dimensões e a proporção 120 × 144 da 5.60, sem margens externas que ultrapassem a coluna. O retrato e seus botões continuam na linha inferior completa.
- O quadro principal de PV é somente leitura: barra e números atuais/máximos e temporários, sem botões de dano, cura, quantidade ou alteração de PV temporários. A restrição permanece após renderizações e atualizações rápidas. Descanso, salvaguardas contra morte e efeitos de jogo continuam com sua função própria.
- Segurar a barra continua abrindo a janela de PV. Ela reutiliza a estrutura visual original dos controles: barra animada, botões de extremos +/−, quantidade/reinicialização, botões azuis de PV temporários e os mesmos estilos de session-vitals. Há também um botão azul de subtração de PV temporários. Ações por toque e repetição do botão mantêm o comportamento existente. A quantidade é controlada pelos botões originais; não há um segundo campo numérico visível.
- A janela atualiza somente valores, atributos de acessibilidade e larguras das barras, preservando os nós dos controles a cada ajuste. Os controles principais não reaparecem ao atualizar PV. A preferência de desativar o atalho permanece; quando desativada, o quadro principal continua apenas para consulta e a janela não abre pelo atalho. A descrição nas Configurações foi ajustada para explicar isso.

## Estrutura

Fontes atuais completos: project/android-codice. O módulo novo está no final de assets/spell-ui434.js e em docs/update561.js. As funções hpControlsBody560 e changeHPControls560 foram ajustadas diretamente para a janela temática; increaseHPAmount e resetHPAmount549 atualizam a janela sem renderizar a ficha inteira. A nova camada de quickHeader/updateHPDisplay remove controles do quadro principal. Nenhum novo nome de asset foi adicionado ao carregador Android.

## Reproduzir o APK

Instale dependências de QA com npm ci --prefix qa --ignore-scripts. Execute tools/build_update561.py com --base baseline/Codice-do-Aventureiro-5.60.apk, --project project/android-codice, --tools para Android Build Tools 35.0.0, --keystore para a chave original separada e --output para um arquivo novo. Defina CODICE_KEYSTORE_PASSWORD. Não execute os empacotadores históricos nem gere uma chave nova.

Chave separada: Codice-assinatura-original.p12, libfile_5f82b26f85c88191ab0660553773df07, alias codice. Certificado SHA-256: 7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041.

## Validação

Aprovados nesta versão: qa/qa561.cjs; qa/qa560.cjs; qa/qa560-startup.cjs; qa/qa559.cjs. A suíte 560 foi atualizada para esperar o quadro principal somente leitura. A suíte 561 verifica o espaço reservado ao brasão, ausência de controles no cabeçalho, controles temáticos na janela, dano absorvido por PV temporários, limites de cura, adição/subtração temporária, preservação dos nós e funcionamento nativo dos botões sem aplicar duas vezes. O início com ficha salva preserva os PV e as preferências. Integridade, alinhamento, versão/código, certificado e todos os assets do APK foram conferidos.

Sem navegador renderizado, conferência visual em celular, instalação Android ou teste de FPS nesta sessão. O alinhamento foi conferido pela definição da grade e pela proporção do SVG, não por captura real de tela.

A próxima versão precisa de código maior que 179. Preserve as opções de animação e gesto, os idiomas, Saurian, Sonhos, Feiticeiro 2014/2024 por personagem, seleção de magias e Invocações. Esta entrega é Android.
