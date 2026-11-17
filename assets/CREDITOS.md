# Créditos das imagens

## Fotografias da advogada

As nove fotografias em `assets-cliente/fotos/` foram fornecidas pela cliente.
Nenhuma imagem da advogada foi gerada ou retocada por IA. O tratamento se
limita a recorte, sem distorção:

- `foto-06`: a original é uma captura de tela; foram removidas as barras pretas.
- `foto-08`: foi cortada a faixa esquerda, onde aparecia uma placa com a logomarca antiga.
- `foto-05`: o logotipo da Apple na tampa do notebook foi preenchido com a cor
  da própria tampa (sem ostentação de marcas, PRD seção 10). Rosto e corpo da
  advogada não foram tocados.

## Imagens das áreas de atuação

As seis imagens em `assets-cliente/areas/` foram **geradas por IA** e fornecidas
pela cliente, em 4:5, sem rostos nem texto. Estão publicadas em
`public/areas/<slug>.avif`.

| Arquivo publicado | Área |
| --- | --- |
| `direito-tributario.avif` | Direito Tributário |
| `licitacoes-e-contratos-administrativos.avif` | Licitações e Contratos Administrativos |
| `direito-civil.avif` | Direito Civil |
| `direito-previdenciario.avif` | Direito Previdenciário |
| `direito-criminal.avif` | Direito Criminal |
| `direito-ambiental.avif` | Direito Ambiental |

## Logomarca

Arte original da cliente (JPG dourado sobre fundo preto), em
`assets-cliente/logo/`. As versões em `public/logo/` foram geradas por
`scripts/preparar-imagens.py`, que apenas recorta o fundo preto.
