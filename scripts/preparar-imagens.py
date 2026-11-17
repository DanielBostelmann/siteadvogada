"""Prepara os ativos da cliente (PRD, seções 3 e 7): recorta o fundo preto da
logomarca, gera as versões pedidas e otimiza fotos e imagens das áreas.
Uso: python3 scripts/preparar-imagens.py  (requer Pillow com AVIF e numpy)."""
from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "assets-cliente"
LOGO_SAIDA = RAIZ / "public" / "logo"
AREAS_SAIDA = RAIZ / "public" / "areas"
FOTOS_SAIDA = RAIZ / "src" / "assets" / "fotos"

# Faixas da arte original (1536x1024), medidas pelos pixels acima do preto.
MONOGRAMA = (411, 132, 1122, 646)
NOME = (54, 712, 1488, 809)

SLUGS = {
    "01-direito-tributario": "direito-tributario",
    "02-licitacoes": "licitacoes-e-contratos-administrativos",
    "03-direito-civil": "direito-civil",
    "04-direito-previdenciario": "direito-previdenciario",
    "05-direito-criminal": "direito-criminal",
    "06-direito-ambiental": "direito-ambiental",
}


def recortar_fundo_preto(img: Image.Image) -> Image.Image:
    """Troca o preto por transparência sem alterar o dourado da arte."""
    rgb = np.asarray(img.convert("RGB")).astype(np.float32)
    brilho = rgb.max(axis=2)
    alfa = np.clip((brilho - 10) / 38, 0, 1)
    seguro = np.maximum(alfa, 1e-3)[..., None]
    cor = np.clip(rgb / seguro, 0, 255)
    rgba = np.dstack([cor, alfa * 255]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def com_margem(caixa, margem):
    x0, y0, x1, y1 = caixa
    return (x0 - margem, y0 - margem, x1 + margem + 1, y1 + margem + 1)


def redimensionar_altura(img, altura):
    largura = round(img.width * altura / img.height)
    return img.resize((largura, altura), Image.LANCZOS)


def preparar_logo():
    LOGO_SAIDA.mkdir(parents=True, exist_ok=True)
    arte = recortar_fundo_preto(Image.open(ORIGEM / "logo" / "logo-original.jpeg"))

    completa = arte.crop(arte.getbbox())
    completa.save(LOGO_SAIDA / "logo-completa.png", optimize=True)

    monograma = arte.crop(com_margem(MONOGRAMA, 6))
    lado = max(monograma.size) + 40
    quadrado = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    quadrado.alpha_composite(
        monograma, ((lado - monograma.width) // 2, (lado - monograma.height) // 2)
    )
    quadrado.resize((512, 512), Image.LANCZOS).save(
        LOGO_SAIDA / "monograma.png", optimize=True
    )
    # Versão leve para a tela de abertura, servida sem passar pelo otimizador.
    quadrado.resize((256, 256), Image.LANCZOS).save(
        LOGO_SAIDA / "monograma-abertura.webp", quality=88
    )
    quadrado.resize((256, 256), Image.LANCZOS).save(
        RAIZ / "src" / "app" / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    )

    # Versão horizontal: monograma à esquerda, nome à direita (cabeçalho, 44 px).
    altura = 264
    mono = redimensionar_altura(monograma, altura)
    nome = redimensionar_altura(arte.crop(com_margem(NOME, 4)), 78)
    espaco = 56
    horizontal = Image.new(
        "RGBA", (mono.width + espaco + nome.width, altura), (0, 0, 0, 0)
    )
    horizontal.alpha_composite(mono, (0, 0))
    horizontal.alpha_composite(nome, (mono.width + espaco, (altura - nome.height) // 2))
    horizontal.save(LOGO_SAIDA / "logo-horizontal.png", optimize=True)

    for nome_arquivo in ("logo-completa", "logo-horizontal", "monograma"):
        img = Image.open(LOGO_SAIDA / f"{nome_arquivo}.png")
        print(f"logo/{nome_arquivo}.png {img.size}")


def preparar_areas():
    AREAS_SAIDA.mkdir(parents=True, exist_ok=True)
    for original, slug in SLUGS.items():
        img = Image.open(ORIGEM / "areas" / f"{original}.png").convert("RGB")
        destino = AREAS_SAIDA / f"{slug}.avif"
        img.save(destino, quality=62, speed=4)
        print(f"areas/{slug}.avif {img.size} {destino.stat().st_size // 1024} KB")


def recortar_barras_pretas(img: Image.Image) -> Image.Image:
    """Remove as barras da captura de tela (foto-06), mantendo só a fotografia."""
    cinza = np.asarray(img.convert("L")).astype(np.float32)
    linhas = np.where(cinza.mean(axis=1) > 24)[0]
    blocos, inicio = [], linhas[0]
    for anterior, atual in zip(linhas, linhas[1:]):
        if atual - anterior > 1:
            blocos.append((inicio, anterior))
            inicio = atual
    blocos.append((inicio, linhas[-1]))
    topo, base = max(blocos, key=lambda b: b[1] - b[0])
    return img.crop((0, topo + 2, img.width, base - 1))


def apagar_logo_do_notebook(img: Image.Image) -> Image.Image:
    """foto-05: preenche o logotipo da Apple na tampa do notebook com a cor da
    própria tampa, interpolada linha a linha entre as bordas da área, e funde
    com borda suave. Só o objeto é tocado; rosto e corpo ficam intactos
    (PRD, seções 7 e 10: sem retoque da advogada e sem exibição de marcas)."""
    x0, y0, x1, y1 = 640, 740, 745, 842  # área do logotipo, com folga
    arr = np.asarray(img).astype(np.float32)
    area = arr[y0:y1, x0:x1].copy()
    esquerda, direita = arr[y0:y1, x0 - 6:x0].mean(axis=1), arr[y0:y1, x1:x1 + 6].mean(axis=1)
    t = np.linspace(0, 1, x1 - x0)[None, :, None]
    preenchido = esquerda[:, None, :] * (1 - t) + direita[:, None, :] * t
    # textura leve, para a área não ficar lisa demais ao lado do grão da foto
    rng = np.random.default_rng(5)
    preenchido += rng.normal(0, 0.8, preenchido.shape)
    # máscara elíptica com borda suave
    yy, xx = np.mgrid[0:y1 - y0, 0:x1 - x0]
    cy, cx, ry, rx = (y1 - y0) / 2, (x1 - x0) / 2, (y1 - y0) / 2, (x1 - x0) / 2
    d = np.sqrt(((yy - cy) / ry) ** 2 + ((xx - cx) / rx) ** 2)
    alfa = np.clip((1.0 - d) / 0.45, 0, 1)[..., None]
    arr[y0:y1, x0:x1] = area * (1 - alfa) + preenchido * alfa
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def preparar_fotos():
    FOTOS_SAIDA.mkdir(parents=True, exist_ok=True)
    for origem in sorted((ORIGEM / "fotos").glob("foto-*.jpeg")):
        img = Image.open(origem).convert("RGB")
        if origem.stem == "foto-06":
            img = recortar_barras_pretas(img)
            img.save(FOTOS_SAIDA / f"{origem.stem}.jpg", quality=92)
        elif origem.stem == "foto-05":
            img = apagar_logo_do_notebook(img)
            img.save(FOTOS_SAIDA / f"{origem.stem}.jpg", quality=92)
        elif origem.stem == "foto-08":
            # Corta a faixa esquerda, onde aparece a placa com a logomarca antiga.
            img = img.crop((round(img.width * 0.19), 0, img.width, img.height))
            img.save(FOTOS_SAIDA / f"{origem.stem}.jpg", quality=92)
        else:
            # Sem recompressão: o Next gera AVIF/WebP a partir do arquivo original.
            (FOTOS_SAIDA / f"{origem.stem}.jpg").write_bytes(origem.read_bytes())
        print(f"fotos/{origem.stem}.jpg {img.size}")


def preparar_compartilhamento():
    """Imagem de compartilhamento (Open Graph), 1200x630: logomarca e retrato."""
    grafite = (41, 41, 41)
    dourado = (198, 161, 91)
    tela = Image.new("RGB", (1200, 630), grafite)

    foto = Image.open(FOTOS_SAIDA / "foto-06.jpg").convert("RGB")
    largura_foto, altura_foto = 400, 510
    escala = max(largura_foto / foto.width, altura_foto / foto.height)
    foto = foto.resize(
        (round(foto.width * escala), round(foto.height * escala)), Image.LANCZOS
    )
    sobra_x = (foto.width - largura_foto) // 2
    sobra_y = round((foto.height - altura_foto) * 0.2)
    foto = foto.crop(
        (sobra_x, sobra_y, sobra_x + largura_foto, sobra_y + altura_foto)
    )
    foto_x, foto_y = 720, 60

    # Moldura fina dourada, deslocada atrás da foto, como no site.
    moldura = Image.new("RGB", (largura_foto, altura_foto), dourado)
    miolo = Image.new("RGB", (largura_foto - 2, altura_foto - 2), grafite)
    moldura.paste(miolo, (1, 1))
    tela.paste(moldura, (foto_x + 18, foto_y + 18))
    tela.paste(foto, (foto_x, foto_y))

    logo = Image.open(LOGO_SAIDA / "logo-completa.png")
    largura_logo = 520
    logo = logo.resize(
        (largura_logo, round(logo.height * largura_logo / logo.width)), Image.LANCZOS
    )
    tela.paste(logo, (100, (630 - logo.height) // 2), logo)

    destino = RAIZ / "public" / "compartilhamento.jpg"
    tela.save(destino, quality=88, optimize=True)
    print(f"public/compartilhamento.jpg {tela.size} {destino.stat().st_size // 1024} KB")


if __name__ == "__main__":
    preparar_logo()
    preparar_areas()
    preparar_fotos()
    preparar_compartilhamento()
