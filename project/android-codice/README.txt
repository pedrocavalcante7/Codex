Códice do Aventureiro 4.83 — versionCode 114
Base APK 4.81, assinatura original preservada.
A reserva de altura agora é temporária: ativa apenas durante renderização,
gesto ou transição; liberada após terminar/cancelar a animação. Cada aba
retoma a altura natural do conteúdo, eliminando o espaço vazio acumulado.
Não força rolagem ao topo; o navegador limita a posição ao fim real da página
quando necessário. Mantém padding/alinhamento, sentidos circulares, gestos,
cliques protegidos, atributos e 480 retratos. Testes qa482.cjs e qa480.cjs.
Sem teste em aparelho físico.
Reempacotar com package482.py, CODICE_BASE_APK=APK 4.81, CODICE_ASSETS=assets.
zipalign antes de assinar com a chave original. Chave privada não incluída.

APK refeito após identificar truncamento do arquivo publicado na versão anterior.
Verificação adicional de tamanho, hash e integridade após disponibilização.
