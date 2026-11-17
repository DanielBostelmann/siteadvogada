---
name: claude-animation-base
description: Faz desenhos animados curtos pintados à mão com p5.js e p5.brush (pinceladas, 2D chapado, traço que "ferve"), estrelando o personagem Clawd (31 emoções, vistas, chapéus, danças) ou qualquer personagem novo, renderizados em MP4. Use quando pedirem um desenho animado, cartoon, animação desenhada à mão, aquarela animada, vídeo com o Clawd, clipe animado sincronizado com música, ou citarem "Claude animation base", ClaudeAnimationBase, p5.brush ou ANIMATION_GUIDE.md. Hand-painted cartoon animation starter kit.
---

# Claude Animation Base

Kit para fazer desenhos animados curtos que parecem pintados à mão, quadro a quadro. Tudo está em `kit/`: o guia de animação, o personagem Clawd, o motor de pintura e o renderizador headless que gera contact sheets, recortes, stills e o MP4 final.

O guia `kit/ANIMATION_GUIDE.md` é a fonte das regras e da API. Esta skill só explica como montar o projeto a partir do kit.

## Fluxo

1. **Crie uma pasta de trabalho a partir do kit.** Nunca edite `kit/` direto, porque ele é a base para os próximos vídeos. Destino padrão: `videos/<nome-do-video>/` na raiz do projeto, a menos que a pessoa peça outro lugar.
   ```bash
   mkdir -p videos && cp -r .claude/skills/claude-animation-base/kit videos/<nome-do-video>
   cd videos/<nome-do-video> && npm install
   ```
   O `.gitignore` do kit vai junto e mantém `node_modules/` e `out/` fora do Git.

2. **Leia `ANIMATION_GUIDE.md` inteiro antes de desenhar qualquer coisa**, e veja as model sheets `docs/emotions.jpg` e `docs/views.jpg`.

3. **Siga o fluxo do guia.** Primeiro o storyboard, mostrado à pessoa antes de codar. Depois, construa plano a plano e confira cada um com contact sheets e frame strips (`node render.mjs --sheet=… --out=out/check/…`), olhando as imagens geradas. A pessoa decide **o que** o vídeo conta, e o guia decide **como** ele é feito. Se ela pedir algo que o guia proíbe, como texto na tela, faça o que ela pediu.

4. **Renderize:**
   ```bash
   node render.mjs --clip --out=out/video.mp4
   ```
   - Sem GPU dedicada (como num container na nuvem), acrescente `--soft-gl`. Nesse caso evite os preenchimentos em aquarela (`fill`) do p5.brush, que deixam o render muito lento, e troque por algo equivalente. O README do kit recomenda isso.
   - Se o Chrome não for encontrado, passe `--chrome=<caminho>` ou defina `CHROME_PATH`. No Linux o renderizador também procura o Chromium instalado pelo Playwright.
   - Vídeos longos: `--frames --workers=4`, depois `--encode --out=out/video.mp4`. Esse modo é paralelo e retomável.

5. **Entregue** o caminho absoluto do `out/video.mp4`.

Requisitos: Node.js, Google Chrome ou Chromium, e ffmpeg.

## Origem

Empacotado como skill a partir de [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase), commit `0ac8bf2b31942376cb6b8c4074715595d512acd2`, licença MIT (`kit/LICENSE`). O repositório original não tem formato de skill, então o `npx skills` não o instala nem o atualiza. Para atualizar, clone o repositório de novo e substitua o conteúdo de `kit/`.
