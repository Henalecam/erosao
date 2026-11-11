# Erosão

Jogo idle de física: numa câmara de experimentos escura, você destrói objetos de voxels minúsculos com água simulada (SPH 3D). Cada objeto destruído rende dinheiro, estrelas e a escolha do próximo.

Jogar: abra `index.html` (gerado por `python3 build.py` a partir de `src/game.html` + `src/fluid.js`). O progresso fica no navegador (chave `erosao3d_v2`).

## Ciclo de jogo

1. **Um espécime por nível.** Um objeto aparece no centro da câmara. Use as ferramentas de água para destruí-lo.
2. **80% conclui.** O resto desmorona em câmera lenta e você recebe um bônus de conclusão.
3. **Estrelas.** De 1 a 3 conforme o tempo (a meta de 3★ depende do tamanho; até o dobro vale 2★).
4. **Escolha o próximo** entre 3 a 5 cartas (tipo, tamanho, material e dica). Sem escolha em 25 s, vai a primeira.
5. A cada nível os objetos ficam maiores e mais resistentes, e valem mais.

Se um espécime demora muito, a **fadiga do material** o enfraquece aos poucos, para ninguém travar.

## Objetos e materiais

Castelo de areia, melancia, queijo suíço, bolo, boneco de neve, bloco de gelo, vaso de argila, caixote, muro de tijolos, aquário, dado gigante, pato de borracha, pirâmide, TV antiga, cofre de aço e as rochas (arenito, granito, geodo, pilar de basalto, arco, pedras gêmeas, fóssil, meteorito, opala, ídolo, baú, Coração da Montanha). Novos tipos se desbloqueiam com o nível.

Cada material reage de um jeito:

| Material | Comportamento |
|---|---|
| Gelo, neve | Derretem com qualquer água; 10× mais rápido com a sala inundada |
| Areia | Desmorona em coluna quando perde a base |
| Vidro | Estilhaça em cadeia |
| Aço, ferro | Quase ignoram gotas; pedem o jato |
| Fruta, cobertura | Muito moles; espirram suco |
| Madeira, plástico | Os pedaços boiam na inundação |
| Ouro, ametista, opala | Valem muito; leve os grãos até as calhas |

Cerca de 60% dos espécimes (do nível 3 em diante) vêm com uma **mutação**: Quebradiça, Veios ricos, Blindada, Porosa, Cristalina, Gravidade baixa, Instável ou Banho ácido.

## Ferramentas e loja

Gota (clique), Jato (segure; penetra conforme os upgrades), Balão (segure para encher e arremesse), Granizo, Onda e Gêiser. A loja tem cinco abas: Ferramentas, Água (melhorias que valem para todas as armas), Torretas, Terreno (nascente, aqueduto, tempestade, represa, comporta do ralo, correnteza) e Garimpo (calhas, riffles, lavadora automática, peixes, britador). A loja destaca a próxima meta e o tempo estimado.

## Garimpo e inundação

Os grãos soltos são levados pela água até as **calhas** na canaleta; lave a calha para receber. Com a **Comporta do ralo**, feche o ralo (botão ou tecla **G**) para inundar a câmara: o que fica submerso erode sozinho. Ao abrir, a água escoa em redemoinho e arrasta os grãos para as calhas.

## Progressão

- **Trilha de estrelas:** o total de estrelas libera, de forma permanente, a 4ª e a 5ª carta, o tamanho Gigante, aumentos de renda e perks grátis. Clique na linha de estrelas sob o dinheiro para ver a trilha.
- **Perks:** a cada 3 espécimes, a cada 4 encomendas e ao vencer chefes.
- **Encomendas:** pedidos com prazo depois do tutorial; dá para trocar (⟳).
- **Pontos fracos:** rachaduras brilhantes; acertar causa uma fratura grande.
- **Chefes** a cada 5 níveis, alternando: Monólito (6 fraturas em 90 s), Núcleo blindado (o ralo trava e a sala inunda; 6 fraturas em 100 s) e Colosso de cristal (regenera a cada 6 s; arranque milhares de blocos em 85 s).
- **Coleção, patentes e conquistas** dão bônus permanentes de renda.
- **Expedição** (prestígio): disponível após 10 espécimes; troca o progresso por âmbar.

## Eventos

Blecaute com luz negra (renda ×2), sobrecarga de pressão (erosão ×2,5), alarme com sprinklers, abalo sísmico, tensão interna (4 pontos fracos seguidos), enxurrada dourada, tempestade seguida de arco-íris (grãos ×2), libélula dourada e **caixas de suprimento** que descem do teto. As **propostas do laboratório** oferecem duas cartas de risco × recompensa. Os efeitos ativos aparecem como etiquetas no topo.

## Controles

Botão esquerdo usa a ferramenta · botão direito gira · roda dá zoom · botão do meio arrasta · WASD move · **C** centraliza · **G** ralo · **L** lava a calha · **B** loja · 1–6 trocam de ferramenta. No celular: toque usa a ferramenta, dois dedos giram e dão zoom.

## Técnica

- Fluido SPH viscoelástico 3D (relaxação de dupla densidade, Clavet 2005) a 120 Hz, com limite de partículas adaptativo.
- Grade de voxels 160×104×160 (2,2 cm), malha por blocos com oclusão por vértice, fragmentos rígidos e checagem estrutural.
- Água em espaço de tela (splat de profundidade com raio por densidade, blur bilateral, refração, Fresnel, espuma).
- three.js 0.169 via CDN; áudio gerado com WebAudio.
- Testes com Playwright e Chrome headless (`#sim` desliga o render).
