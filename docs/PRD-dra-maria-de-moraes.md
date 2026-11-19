# PRD — Landing page cinematográfica · Dra. Maria de Moraes Advocacia

> **Instrução ao Claude Code.** Você vai construir, do zero, o site institucional descrito abaixo. Leia o documento inteiro antes de escrever código. Execute na ordem da seção 11 e pare para me mostrar o resultado ao fim dos passos 1, 5 e 8. Os textos entre aspas ou em bloco de citação são definitivos: não os reescreva. Todo o site é em português do Brasil. Onde houver **pendência** (seção 2), use o valor provisório indicado e mantenha-o apenas em `src/config/site.ts`.
>
> **Arquivos que acompanham este PRD**, na pasta `/assets-cliente`:
> - `fotos/` — 9 fotografias profissionais da advogada;
> - `logo/` — a logomarca (JPG dourado sobre fundo preto);
> - `areas/` — 6 imagens, uma por área de atuação, nomeadas `01-direito-tributario`, `02-licitacoes`, `03-direito-civil`, `04-direito-previdenciario`, `05-direito-criminal`, `06-direito-ambiental`.

## 1. Visão geral

Site institucional da **Dra. Maria de Moraes Advocacia**: uma página inicial de rolagem cinematográfica, seis páginas de área de atuação e uma página de política de privacidade, em estética de luxo discreto (branco, dourado, champagne).

- **Objetivo:** transmitir autoridade, credibilidade e excelência técnica, e levar o visitante ao contato por WhatsApp ou formulário.
- **Público:** pessoas físicas, empresas e licitantes de todo o Brasil que buscam assessoria jurídica, com ênfase em Direito Tributário.
- **Tom:** sóbrio, informativo e elegante. Nada de promessa de resultado, urgência comercial ou linguagem de venda (seção 10).
- **Referência estética:** escritório de advocacia de alto padrão — páginas limpas, muito espaço em branco, detalhes dourados, imagens profissionais, navegação intuitiva. A logomarca tem destaque, sem exagero.

## 2. Dados da cliente e pendências

| Campo | Valor |
| --- | --- |
| Nome profissional | Maria de Moraes |
| Marca | Dra. Maria de Moraes — Advocacia |
| Título | Advogada \| Especialista em Direito Tributário |
| Inscrição | OAB 16013 (seccional a confirmar; provisório: OAB/RO 16.013) |
| E-mail | advogadamariademoraes@gmail.com |
| Telefone / WhatsApp | (69) 9259-3775 (a confirmar; ver pendência) |
| Abrangência | Atendimento em todo o Brasil |
| Domínio | mariademoraes.adv.br |

**Pendências** (não bloqueiam o desenvolvimento; liste-as no relatório final):

- **Seccional da OAB:** só foi informado "OAB 16013". Exibir como `OAB/RO 16.013` até confirmação.
- **Telefone:** o número tem 8 dígitos após o DDD; celulares têm 9. Usar `5569992593775` no link do WhatsApp como provisório e exibir "(69) 99259-3775", com comentário `// CONFIRMAR` no arquivo de configuração.
- **Título de especialista:** depende de confirmação da formação. Deixar o texto em uma constante; alternativa pronta: "Atuação com ênfase em Direito Tributário".
- **E-mail profissional:** poderá ser trocado por `contato@mariademoraes.adv.br` após o registro do domínio.
- **Logomarca em vetor:** enquanto não houver SVG, recortar o fundo preto do JPG.
- **Endereço físico:** não informado. Não exibir mapa nem endereço.

## 3. Identidade visual

Luxo discreto: branco predominante, muito espaço em branco, dourado apenas em detalhes. O efeito cinematográfico vem de fotografia, luz e movimento, não de excesso de cor.

### Paleta

| Token | Hex | Uso |
| --- | --- | --- |
| `--branco` | #FFFFFF | Fundo predominante |
| `--off-white` | #FAF8F4 | Fundo de seções alternadas |
| `--champagne` | #E9DFC9 | Blocos de apoio, molduras de foto, hover suave |
| `--dourado` | #C6A15B | Logomarca, filetes, numeração, ícones, sublinhados, títulos grandes |
| `--dourado-texto` | #8C6D2F | Texto dourado pequeno sobre branco (contraste AA) |
| `--grafite` | #292929 | Texto principal, rodapé e a única seção escura |

O dourado #C6A15B não tem contraste suficiente para texto corrido sobre branco: use `--dourado-texto` em textos pequenos.

### Tipografia

- **Títulos e nome:** Cormorant Garamond (400–600), com itálico em palavras de destaque.
- **Textos e interface:** Inter ou Manrope (400–600).
- **Rótulos:** caixa alta, 12–13 px, espaçamento de 0,2em (como "ADVOCACIA" na logomarca).
- Carregar via `next/font` com `display: swap`. Corpo mínimo de 16 px; linhas de até 70 caracteres.

### Logomarca

Monograma **MM** dourado metálico, com balança e espada integradas, sobre o nome "DRA. MARIA DE MORAES" e a palavra "ADVOCACIA" entre dois filetes. Arte original em degradê metálico sobre fundo preto.

- **Cabeçalho (fundo branco):** versão horizontal reduzida — monograma à esquerda, nome à direita, altura máxima de 44 px.
- **Rodapé e seção escura (grafite):** versão completa, como na arte original.
- **Favicon:** apenas o monograma.
- Gerar a partir do JPG: `logo-completa.png` (transparente, 2x), `logo-horizontal.png`, `monograma.png`, `favicon.ico`. Não redesenhar nem "melhorar" o monograma.

### Direção de arte

- Molduras finas douradas deslocadas atrás das fotos; blocos champagne como fundo de retratos.
- Cantos de 2 a 4 px, sombras quase imperceptíveis, filetes de 1 px.
- Sem gradientes chamativos, sem ícones coloridos, sem banco de imagens com pessoas.

## 4. Stack técnica e rotas

- **Framework:** Next.js (App Router) com TypeScript, páginas geradas estaticamente.
- **Estilo:** Tailwind CSS com os tokens da seção 3 como variáveis de tema; nenhum valor de cor solto no código.
- **Movimento:** GSAP + ScrollTrigger via `useGSAP`, e Lenis para rolagem suave. Sem outras bibliotecas de animação.
- **Imagens:** `next/image`, AVIF/WebP, `priority` apenas na foto do hero.
- **Formulário:** validação Zod no navegador; a mensagem é montada e aberta no WhatsApp (sem servidor de e-mail).
- **Hospedagem:** Vercel.
- **Conteúdo:** todos os textos e listas em `src/content/` (um arquivo por área); dados de contato em `src/config/site.ts`.

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial cinematográfica (seção 5) |
| `/areas/direito-tributario` | Área de especialização |
| `/areas/licitacoes-e-contratos-administrativos` | Área |
| `/areas/direito-civil` | Área |
| `/areas/direito-previdenciario` | Área |
| `/areas/direito-criminal` | Área |
| `/areas/direito-ambiental` | Área |
| `/politica-de-privacidade` | Política de privacidade e LGPD |

As seis páginas de área usam um único modelo (`/areas/[slug]`).

## 5. Página inicial, seção a seção

### 5.1 Cabeçalho fixo

Logomarca horizontal à esquerda. Navegação: Início · O escritório · Áreas de atuação · Conheça a advogada · Contato. Botão à direita: "Falar pelo WhatsApp" (contorno dourado). Transparente sobre o hero; branco com filete inferior após 80 px de rolagem. No celular, menu em tela cheia sobre off-white.

### 5.2 Hero

Fundo branco a off-white em degradê muito leve. Texto à esquerda; retrato da advogada à direita, na altura da tela, com moldura fina dourada deslocada.

- **Rótulo:** DRA. MARIA DE MORAES · ADVOCACIA
- **Título (h1):** Advocacia com rigor técnico e análise individual de cada caso.
- **Subtítulo:** Atuação consultiva, administrativa e judicial, com especialização em Direito Tributário. Atendimento em todo o Brasil.
- **Botões:** "Falar pelo WhatsApp" (preenchido, grafite) e "Conhecer as áreas de atuação" (texto com sublinhado dourado).
- **Rodapé do hero:** Maria de Moraes · OAB 16013 · indicador discreto de rolagem.

### 5.3 O escritório

Texto largo em serifada grande sobre branco, com uma foto secundária da advogada.

> A Dra. Maria de Moraes Advocacia atua nas áreas de Direito Tributário, Licitações e Contratos Administrativos, Direito Civil, Direito Previdenciário, Direito Criminal e Direito Ambiental.
>
> Com especialização em Direito Tributário, desenvolvemos uma atuação voltada à análise jurídica estratégica, à prevenção de conflitos e à defesa dos direitos e interesses de nossos clientes.
>
> **Atendimento em todo o Brasil.**

### 5.4 Faixa de identificação

Três itens em linha, separados por filetes: **6** áreas de atuação · **Direito Tributário** como área de especialização · **Todo o Brasil** em atendimento. Não incluir contagem de casos, clientes ou êxitos.

### 5.5 Áreas de atuação (bloco interativo)

Título: "Nossas áreas de atuação". Apoio: "Conheça os serviços jurídicos de cada especialidade." Comportamento e conteúdo na seção 6.

### 5.6 Interlúdio escuro

Única seção de fundo grafite da página, em tela cheia, com a logomarca completa em dourado e a frase em serifada clara:

> Ética, responsabilidade técnica, atualização jurídica e análise individualizada de cada demanda.

### 5.7 Conheça a advogada

Retrato grande à esquerda, com moldura dourada deslocada e bloco champagne atrás; texto à direita.

- **Nome:** Maria de Moraes
- **Linha de título:** Advogada | Especialista em Direito Tributário — OAB 16013

> Maria de Moraes é advogada e atua em diferentes áreas do Direito, com especialização em Direito Tributário.
>
> Sua atuação profissional contempla demandas consultivas, administrativas e judiciais, envolvendo pessoas físicas, empresas e questões relacionadas à Administração Pública.
>
> Com uma visão multidisciplinar, o escritório oferece assessoria jurídica nas áreas tributária, civil, previdenciária, criminal, ambiental e de licitações e contratos administrativos.
>
> O compromisso profissional está pautado na ética, na responsabilidade técnica, na atualização jurídica e na análise individualizada de cada demanda.
>
> **Atendimento jurídico em todo o território nacional.**

Abaixo do texto, galeria horizontal com três das fotos restantes. Deixar pronto, mas oculto, um componente de linha do tempo de formação (graduação, especialização), a ativar quando houver dados.

### 5.8 Contato e atendimento

Duas colunas sobre off-white. À esquerda: "Atendimento em todo o Brasil", "Entre em contato pelos nossos canais profissionais.", e-mail e telefone com botão "Copiar", e o botão "Atendimento pelo WhatsApp". À direita: formulário (seção 9).

### 5.9 Rodapé

Fundo grafite. Logomarca completa, navegação, as seis áreas com link, contatos, "Maria de Moraes · OAB 16013", link para a Política de Privacidade e ano corrente. Botão flutuante de WhatsApp no canto inferior direito em todas as páginas.

## 6. Áreas de atuação

Seis áreas, cada uma com imagem própria, parágrafo de apresentação e lista de serviços. Direito Tributário vem primeiro e leva o selo "Área de especialização".

### Bloco interativo na página inicial

- **Computador:** lista numerada (01 a 06) à esquerda, em serifada grande; painel de imagem fixo à direita. Ao passar o cursor ou focar um item, a imagem da área substitui a anterior com transição de máscara (0,6 s) e leve aproximação; os três primeiros serviços aparecem sob o nome. Clique leva à página da área.
- **Imagem interativa:** dentro do painel, a imagem acompanha o cursor com paralaxe de poucos pixels e exibe, sobre véu grafite, o nome da área e "Ver serviços →".
- **Celular e tablet:** cartões empilhados com imagem, nome, três serviços e link. Sem dependência de cursor.
- **Teclado:** cada item é um link focável; o foco produz o mesmo efeito do cursor.

### Modelo da página de área (`/areas/[slug]`)

1. Hero com a imagem da área em faixa larga (recorte 21:9 da imagem 4:5), véu claro, número, nome e selo (quando houver).
2. Parágrafo de apresentação.
3. "Serviços jurídicos": a lista completa, em duas colunas com marcadores dourados.
4. "Como o escritório atua": três blocos curtos — Consultoria e prevenção · Esfera administrativa · Esfera judicial.
5. Chamada de contato: "Converse com o escritório sobre a sua demanda." com botão de WhatsApp e link para o formulário.
6. Navegação para a área anterior e a seguinte.

### 01. Direito Tributário — área de especialização

Apresentação: Assessoria consultiva e contenciosa em matéria tributária para pessoas físicas e empresas, nas esferas administrativa e judicial.

- Ações declaratórias de inexistência de débito.
- Ações anulatórias de débitos fiscais.
- Execuções fiscais e embargos à execução.
- Exceção de pré-executividade.
- Mandado de segurança tributário.
- Repetição de indébito tributário.
- Planejamento tributário.
- Defesa em autos de infração.
- Recuperação de créditos tributários.
- Consultoria tributária empresarial.

### 02. Licitações e Contratos Administrativos

Apresentação: Assessoria a empresas licitantes e contratadas pela Administração Pública, da análise do edital à execução do contrato.

- Impugnação de editais.
- Recursos administrativos.
- Defesa em processos administrativos.
- Análise de editais e contratos.
- Reequilíbrio econômico-financeiro.
- Revisão e reajuste contratual.
- Processos de aplicação de penalidades.
- Mandados de segurança em licitações.
- Consultoria para empresas licitantes.

### 03. Direito Civil

Apresentação: Atuação em relações contratuais, patrimoniais, familiares e sucessórias, com foco na prevenção e na solução de conflitos.

- Ações de cobrança e execução.
- Indenizações por danos morais e materiais.
- Responsabilidade civil.
- Ações contratuais.
- Rescisão e revisão de contratos.
- Direito de propriedade e posse.
- Usucapião.
- Direito das obrigações.
- Inventários e questões sucessórias.
- Ações de família e questões patrimoniais.

### 04. Direito Previdenciário

Apresentação: Orientação e representação de segurados perante o INSS e o Judiciário na concessão e na revisão de benefícios.

- Concessão de aposentadorias.
- Revisão de benefícios previdenciários.
- Aposentadoria por idade e tempo de contribuição.
- Aposentadoria especial.
- Benefício por incapacidade temporária.
- Aposentadoria por incapacidade permanente.
- Pensão por morte.
- Auxílio-acidente.
- Benefício assistencial BPC/LOAS.
- Recursos administrativos e ações previdenciárias.

### 05. Direito Criminal

Apresentação: Defesa técnica em todas as fases da persecução penal, do inquérito à execução da pena.

- Defesa em inquéritos policiais.
- Acompanhamento em delegacias.
- Defesa em ações penais.
- Habeas corpus.
- Pedidos de liberdade provisória.
- Revogação de prisão preventiva.
- Recursos criminais.
- Tribunal do Júri.
- Execução penal.
- Defesa em crimes patrimoniais e econômicos.

### 06. Direito Ambiental

Apresentação: Defesa e consultoria para produtores rurais e empresas em questões de regularidade, licenciamento e responsabilidade ambiental.

- Defesa em autos de infração ambiental.
- Embargos ambientais.
- Ações civis públicas.
- Responsabilidade por danos ambientais.
- Licenciamento ambiental.
- Regularização ambiental de propriedades.
- Defesa em processos administrativos ambientais.
- Consultoria para atividades rurais e empresariais.
- Questões relacionadas ao CAR e à legislação ambiental.

## 7. Ativos

Antes de montar a página, abra cada uma das nove fotos, descreva enquadramento, orientação e fundo, e proponha a distribuição abaixo.

| Posição | Qtd. | Critério de escolha |
| --- | --- | --- |
| Hero | 1 | Retrato vertical, olhar para a câmera, fundo claro, espaço livre à esquerda |
| O escritório | 1 | Plano médio em ambiente de trabalho ou gesto natural |
| Conheça a advogada (principal) | 1 | Retrato sentado ou de meio corpo, o mais formal do conjunto |
| Conheça a advogada (galeria) | 3 | Variações de ângulo e expressão |
| Interlúdio escuro | 1 | Foto de maior contraste ou perfil, usada com véu grafite |
| Contato | 1 | Expressão acolhedora, enquadramento fechado |
| Imagem de compartilhamento (Open Graph) | 1 | Recorte 1200×630 com a logomarca |

- Não repetir a mesma foto em duas seções visíveis ao mesmo tempo.
- Recortar por `object-position`, sem distorcer nem retocar rosto ou corpo. Não gerar por IA imagens da advogada.
- Exportar em AVIF e WebP, larguras de 640, 1080 e 1920 px, com texto alternativo descritivo.
- **Imagens das áreas:** as seis imagens de `/assets-cliente/areas` foram geradas por IA, em 4:5, sem rostos nem texto. Otimizar e publicar em `/public/areas/<slug>.avif`. Registrar a origem em `assets/CREDITOS.md`.
- Aplicar grão de filme muito leve (até 4% de opacidade, por CSS) sobre todas as fotos, para unificar o conjunto.

## 8. Direção cinematográfica

Ritmo e luz: entradas lentas, cortes por máscara e profundidade na rolagem. Nada pisca, salta ou gira.

| Momento | Movimento |
| --- | --- |
| Carregamento | Tela off-white com o monograma MM revelado por máscara (até 1,2 s, uma vez por sessão), abrindo como cortina para o hero |
| Hero | Título revelado linha a linha por máscara; foto com aproximação lenta de 1,08 para 1,00; moldura dourada desenhada em traço |
| Rolagem do hero | Foto e texto em paralaxe de velocidades diferentes; filete dourado vertical cresce com a rolagem |
| O escritório | Parágrafos revelados palavra a palavra ao entrar na tela |
| Áreas | Seção fixada no computador enquanto os seis itens passam; troca de imagem por máscara |
| Interlúdio escuro | Transição de branco para grafite acompanhando a rolagem; brilho metálico percorre a logomarca uma única vez |
| Conheça a advogada | Retrato revelado de baixo para cima; bloco champagne e moldura entram com atraso |
| Contato | Campos e botões em entrada escalonada curta |

- Durações de 0,6 a 1,2 s; `power3.out` nas entradas e `power2.inOut` nas máscaras. Constantes em um único arquivo.
- Animar somente `transform`, `opacity` e `clip-path`.
- Botões: sublinhado dourado que se desenha no hover; escala de 0,98 ao pressionar.
- Sem vídeo de fundo e sem som.
- Com `prefers-reduced-motion`: todo o conteúdo aparece de imediato, sem fixação, paralaxe ou tela de carregamento.
- No celular: sem seções fixadas e sem paralaxe de cursor; apenas revelações simples.
- Metas no celular (Lighthouse): desempenho de 90 ou mais, LCP abaixo de 2,5 s, CLS abaixo de 0,05.
- Todo o conteúdo deve estar no HTML inicial; nada depende de animação para existir.

## 9. Funcionalidades

### WhatsApp

- Botão no cabeçalho, no hero, na seção de contato, nas páginas de área e flutuante em todas as páginas.
- Link `https://wa.me/<número>?text=<mensagem>`, com o número lido de `site.ts`.
- Mensagem padrão: "Olá, Dra. Maria de Moraes. Gostaria de agendar um atendimento." Nas páginas de área, acrescentar "Área: [nome da área]."

### Formulário de contato

- Campos: nome (obrigatório), e-mail (obrigatório), telefone/WhatsApp, área de interesse (as seis áreas e "Outro assunto"), mensagem (obrigatória, até 2.000 caracteres).
- Caixa de consentimento obrigatória: "Li e concordo com a Política de Privacidade e autorizo o uso dos meus dados para retorno deste contato."
- Aviso sob a mensagem: "Ao enviar, a mensagem com os seus dados abre no WhatsApp para você conferir e confirmar o envio. Não envie documentos nem dados sensíveis por este formulário. O envio não estabelece relação entre advogada e cliente."
- Validação no navegador. Botão "Enviar pelo WhatsApp".
- Destino: WhatsApp do escritório. O formulário monta uma mensagem organizada (saudação, um campo por linha com o rótulo em negrito e a mensagem em bloco próprio; campos opcionais em branco ficam de fora) e a abre em `https://wa.me/<número>?text=<mensagem>`. A pessoa confere e confirma o envio no WhatsApp. Sem servidor de e-mail nem banco de dados.
- Estado depois de abrir: "Sua mensagem foi aberta no WhatsApp.", com botão para abrir de novo e opção de editar a mensagem com os dados preservados.
- Sem JavaScript, o formulário abre a conversa com o escritório no WhatsApp.

### E-mail e telefone

Links `mailto:` e `tel:`, com botão "Copiar" e confirmação visual.

### SEO

- Título da página inicial: "Dra. Maria de Moraes Advocacia | Direito Tributário — atendimento em todo o Brasil". Cada página de área com título e descrição próprios.
- Um `h1` por página, hierarquia coerente, HTML semântico.
- JSON-LD `LegalService` e `Person`, com nome, áreas de atuação, e-mail, telefone e `areaServed: BR`.
- `sitemap.xml`, `robots.txt`, URL canônica (`https://mariademoraes.adv.br`), Open Graph com imagem 1200×630.

### Política de privacidade e LGPD

- Página `/politica-de-privacidade` cobrindo: controladora (Maria de Moraes, OAB 16013), dados coletados pelo formulário, finalidade (retorno do contato), base legal (consentimento), prazo de guarda, compartilhamento com os provedores de hospedagem e e-mail, direitos do titular (art. 18 da Lei nº 13.709/2018) e canal para exercê-los.
- Marcar o texto como minuta sujeita à revisão da advogada (comentário no código, não na página).
- Sem cookies de rastreamento; portanto, sem banner de cookies.

### Responsividade e acessibilidade

- Larguras de referência: 360, 768, 1024, 1440 e 1920 px.
- Áreas de toque de 44 px ou mais, foco visível em dourado escuro, navegação completa por teclado, contraste AA.

## 10. Regras de redação (publicidade da advocacia)

Todo o conteúdo deve ser informativo, verdadeiro e discreto, conforme o Provimento nº 205/2021 do Conselho Federal da OAB e o Código de Ética e Disciplina. Ao escrever qualquer texto que não esteja neste PRD (descrições de SEO, blocos "Como o escritório atua", política de privacidade, textos alternativos):

- **Sem promessa de resultado**, garantia de êxito, prazos de solução ou estatísticas de causas ganhas.
- **Sem autoengrandecimento ou comparação:** nada de "o melhor", "líder", "nº 1", "os maiores especialistas".
- **Sem apelo comercial:** nada de "contrate agora", "consulta grátis", preços, descontos ou formas de pagamento. Chamadas permitidas: "Falar pelo WhatsApp", "Entrar em contato", "Agendar atendimento".
- **Sem depoimentos**, lista de clientes ou casos identificáveis.
- **Sem símbolos ou logotipo da OAB.** A balança e a espada da logomarca permanecem.
- **Sem ostentação:** nenhuma imagem de bens de luxo, veículos ou viagens.
- **Identificação obrigatória:** nome da advogada e número da OAB visíveis no hero, em "Conheça a advogada" e no rodapé.

## 11. Ordem de execução e critérios de aceite

### Ordem de execução

1. Inspecionar `/assets-cliente`, descrever as nove fotos e propor a distribuição da seção 7. **Parar e mostrar.**
2. Criar o projeto, os tokens de tema, as fontes e `src/config/site.ts`.
3. Preparar a logomarca (recorte, versões, favicon) e otimizar fotos e imagens das áreas.
4. Escrever os arquivos de conteúdo das seis áreas a partir da seção 6.
5. Montar a página inicial estática, sem animação, e validar em 360 e 1440 px. **Parar e mostrar.**
6. Montar o modelo de página de área e a política de privacidade.
7. Implementar o formulário e os links de WhatsApp.
8. Acrescentar o movimento da seção 8, seção por seção, com a alternativa de movimento reduzido. **Parar e mostrar.**
9. SEO, dados estruturados, sitemap e imagem de compartilhamento.
10. Rodar Lighthouse e verificação de acessibilidade, corrigir e publicar prévia na Vercel.

### Critérios de aceite

- [ ] As rotas da seção 4 existem e todos os links internos funcionam.
- [ ] Os textos da seção 5 e as listas da seção 6 aparecem sem alteração de redação.
- [ ] Direito Tributário é a primeira área e exibe o selo "Área de especialização".
- [ ] Branco é a cor dominante; há exatamente uma seção de fundo grafite na página inicial, além do rodapé.
- [ ] As nove fotos da advogada estão posicionadas, sem repetição na mesma tela e sem distorção.
- [ ] A logomarca aparece no cabeçalho, no interlúdio e no rodapé, fiel à arte original.
- [ ] O botão de WhatsApp abre a conversa com a mensagem padrão; o formulário entrega o e-mail e exige o consentimento.
- [ ] Nome e número da OAB visíveis no hero, em "Conheça a advogada" e no rodapé.
- [ ] Nenhum texto viola as regras da seção 10.
- [ ] O bloco de áreas funciona com cursor, toque e teclado.
- [ ] Com movimento reduzido, a página é integralmente legível e navegável.
- [ ] Lighthouse no celular: desempenho, acessibilidade, boas práticas e SEO em 90 ou mais.
- [ ] O relatório final lista as pendências da seção 2 ainda abertas.

### Fora do escopo

Blog, área do cliente, agendamento on-line, outros idiomas, anúncios pagos e registro do domínio.

## 12. Referências visuais (apenas inspiração)

A cliente enviou capturas de três sites de advocacia. Aproveitar a ideia, nunca o conteúdo:

- **Site em vinho e bege:** hero limpo com retrato recortado e logomarca; faixa de serviços; citação em serifada; formulário ao lado de foto escurecida.
- **Site em azul-marinho e dourado:** contraste do dourado sobre fundo escuro (usar só no interlúdio e no rodapé); seção "Conheça" com retrato em ambiente; chamada final para contato.
- **Peça com estátua da Justiça:** composição com muito espaço vazio, menu fino, serifada com itálico.

Não reproduzir textos, fotografias, marcas ou slogans desses sites.
