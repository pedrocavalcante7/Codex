# Códice do Aventureiro 5.60

Base atual: 5.60/código 178, construída sobre 5.59. Pacote, assinatura original, origem e formato de armazenamento, classes.dex e resources.arsc preservados.

## Mudanças

- Termos completos de idioma e descrições de acessibilidade de PV, incluindo Arcano Místico / Mystic Arcanum e Escolher arma / Choose weapon. A auditoria percorreu as 12 classes no nível 20, suas características e todas as subclasses disponíveis, em inglês e português. O resultado está em docs/language-audit560.json. Não é uma prova formal de cada texto dinâmico ou personalizado possível.
- Cinco descrições de características com OCR danificado foram recuperadas dos trechos íntegros já presentes nos próprios dados da subclasse: Magias Psiônicas, Fala Telepática, Superioridade de Combate, Poder dos Ermos e Mente Desperta. Também foram corrigidos dois cabeçalhos danificados. As regras e a progressão não foram alteradas.
- Auditoria de referências nos 19 arquivos de código/texto do runtime. Removidas três funções sem referências, duas capturas antigas sem uso, 50 chamadas redundantes de renderização e oito chamadas redundantes de localização durante a inicialização. Detalhes em docs/cleanup560.json. Os módulos antigos ainda utilizados pela cadeia atual foram preservados; arquivos históricos fora do APK não afetam a fluidez do aplicativo.
- Preferência global Desativar todas as animações. Não sobrescreve as preferências individuais. Interrompe as animações CSS/JavaScript, partículas e transições; desmarcar restaura o comportamento permitido pelas preferências individuais e pelo sistema.
- Brasão de nível/proficiência preserva a proporção original de 120 × 144, usando xMidYMid meet e um contêiner na mesma proporção. Permanece contido no cabeçalho.
- Segurar a barra de PV por 450 ms abre controles de dano, cura e PV temporários. Movimentos acima de 6 px, término/cancelamento do ponteiro, perda de foco, troca de personagem ou desativação da preferência impedem a abertura indevida. Os controles existentes permanecem disponíveis. O atalho é ativado por padrão e pode ser desativado nas Configurações. Enter/Espaço na barra também abre a janela quando habilitado. Abrir a janela não altera PV; cada ajuste exige seu botão. Quantidades válidas: inteiros entre 1 e 1.000.000. Dano consome PV temporários primeiro e cura respeita os PV máximos.

## Fontes e estrutura

Os arquivos completos em project/android-codice/assets são a fonte atual. O módulo novo está no final de spell-ui434.js e em docs/update560.js. Correções pontuais anteriores a ele: remoção de inicializações redundantes, remoção das funções/capturas sem uso, preservação de proporção no render do brasão, integração do botão global com a decisão de animar abas e reparos de textos em progression-data47.js e FEATURE_PT435. Nenhum asset com nome novo é carregado pelo Android.

## Reproduzir

Instale dependências de QA com npm ci --prefix qa --ignore-scripts. Para o APK, execute tools/build_update560.py, passando --base baseline/Codice-do-Aventureiro-5.59.apk, --project project/android-codice, --tools para Android Build Tools 35.0.0, --keystore para a chave original separada e --output para um caminho novo. Defina CODICE_KEYSTORE_PASSWORD no ambiente. Não execute os empacotadores históricos nem gere uma chave nova.

Chave separada: Codice-assinatura-original.p12, libfile_5f82b26f85c88191ab0660553773df07, alias codice. Certificado SHA-256: 7f5e77dd090f1ac3b80c48fd0b9b377c5e9130c75c10c8c132c9a1130c8a1041.

## Verificações

Aprovados: qa/qa560.cjs; qa/qa560-startup.cjs; qa/qa559.cjs; qa/qa559-observer.cjs; qa/qa558.cjs; qa/qa557.cjs; qa/qa556.cjs. A auditoria qa/audit560.cjs encontrou zero padrões de idioma incorreto nos cenários analisados e nenhuma exceção. Ela pode ser repetida; usa qa-output por padrão ou CODICE_QA_OUTPUT. tools/audit_runtime560.cjs gera o levantamento de referências, sem modificar o projeto. O manifesto, o certificado original, a integridade ZIP/DEX, o alinhamento e todos os assets do APK foram verificados.

Sem navegador renderizado, conferência visual do brasão, instalação em celular ou medição de FPS nesta sessão. A melhora de inicialização é sustentada pela remoção de trabalho redundante; o ganho de fluidez no telefone precisa de teste físico.

A próxima versão deve usar código maior que 178. Preserve Saurian, Sonhos, Feiticeiro 2014/2024 por personagem, seleção de magias, Invocações e os gestos/cache da 5.59. Esta entrega é Android.
