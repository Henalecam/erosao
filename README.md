# Erosão

Idle de física: um objeto de voxels realista fica no centro de uma clareira e você o desgasta com água de verdade.
A erosão de cada gota é mínima: o progresso vem de melhorias, ferramentas, máquinas e eventos. Os grãos que se soltam
precisam ser levados pela correnteza até as calhas de garimpo, onde viram dinheiro.

**Jogar:** abra o `index.html` num navegador moderno com WebGL2. É um arquivo único; o Three.js vem do CDN.

## Controles
| Ação | Comando |
|---|---|
| Usar a ferramenta | Clique esquerdo (segurar: chuva, jato, encher o balão) |
| Trocar de ferramenta | 1 a 5 |
| Girar a câmera | Botão direito ou Q/E |
| Mover a câmera | WASD ou setas, ou arrastar com o botão do meio |
| Zoom | Roda do mouse (em direção ao cursor) ou R/F |
| Centralizar | C |
| Lavar a calha | L, botão, ou clique na calha |
| Mostrar/ocultar a loja | B |
| Bateia | Clique nos grãos encalhados |

## Ferramentas
- 💧 **Gota:** com a melhoria Chuva, segure para chover.
- 🚿 **Jato:** feixe de alta pressão que **perfura**; as partículas atravessam os voxels que quebram.
- 🎈 **Balão d'água:** segure para encher e solte para arremessar no alvo marcado. Ele estoura numa cratera e **lança os blocos** como fragmentos físicos.
- 🧊 **Granizo:** blocos de gelo rígidos que caem, lascam a rocha, estilhaçam e derretem.
- 🌊 **Onda:** parede de água com espuma que varre a base e empurra os detritos.

As melhorias de água valem para todas as ferramentas:
- **Gota maior:** mais volume em tudo.
- **Força da água:** mais impacto e mais penetração do jato.
- **Acidez:** multiplica toda a erosão.

## Objetos e eventos
- Objetos sorteados a cada rocha:
  - Comuns: arenito, granito, pilar de basalto, arco natural e pedras gêmeas.
  - Raros: geodo de ametista, rocha com fóssil e meteorito.
  - Lendários: ídolo de jade e baú enterrado.
- Lendários com eventos próprios:
  - Ídolo: expor o ouro dá a **Bênção** (renda ×2 por 30 s).
  - Baú: expor o ouro **abre o baú** com um tesouro.
- **Eventos aleatórios:**
  - Chuva de meteoritos: crava meteoritos ao redor.
  - Visitante raro: um ídolo ou baú surge ao lado.
  - Tempestades.
  - Represas surpresa: os castores represam o riacho; clique na represa para estourar e ganhar erosão ×2.
- **Física da rocha:** os pedaços sem apoio viram fragmentos rígidos que caem, rolam, quicam, são empurrados pela água e se desgastam.

## Garimpo e máquinas
- A calha principal e até 3 calhas extras somam capacidade. A **área de extração** amplia a zona de captura e a bateia.
- **Peixes garimpeiros** nadam na água rasa comendo os grãos arrastados.
- **Torretas:** gotejadora, esguicho e lança-balões, mais o upgrade de cadência.
- **Terreno:**
  - Nascente: cria um riacho que bate na rocha.
  - Aqueduto: despeja água no topo da rocha.
  - Tempestades e represas.

## Progressão
- **12 objetivos guiados**, com recompensa, ensinam o jogo.
- **Marcos de erosão** por rocha: 0,01%, 0,025%… até 65%.
- **Próxima rocha:** disponível com 10% erodido; cada rocha nova vale +35%.
- **Ranks de garimpeiro:** +12% de renda por rank.
- **Coleção:** +6% de renda por tipo de objeto.
- **Combo:** cresce com o tempo de erosão contínua, até ×3.
- **Ganhos offline:** até 8 h, proporcionais às máquinas passivas.
- O progresso e a rocha erodida ficam salvos no navegador (localStorage).

## Tecnologia
- **Fluido:** SPH viscoelástico 3D (Clavet et al. 2005), com relaxação de dupla densidade, viscosidade e coesão, a 120 Hz. A busca de vizinhos usa partículas ordenadas por célula e meia-casca. O limite de partículas se adapta ao custo medido.
- **Rocha:** grade voxel de 160×104×160 com voxels de 2,2 cm. A malha é feita por chunks, com oclusão ambiente por vértice. Os materiais são procedurais: estratos, fissuras, veios de quartzo e ouro, musgo e líquen.
- **Colisão água-rocha:** usa a normal suavizada da vizinhança, então a água escorre em vez de parar nos degraus. A erosão depende do impacto e do cisalhamento.
- **Água na tela:** renderização em espaço de tela (profundidade das esferas, blur bilateral, normais, refração, absorção de Beer-Lambert, reflexo de Fresnel e brilho do sol).
- **Rocha molhada:** uma textura 3D de umidade escurece a rocha e a deixa brilhante onde a água passa.
- **Cena:** clareira ao entardecer com sombras suaves, grama animada, árvores, seixos, neblina e tempestade. Os sons são sintetizados com WebAudio.

## Desenvolvimento
```
src/fluid.js   simulação do fluido
src/game.html  jogo
build.py       gera o index.html com o fluido embutido
```
`python3 build.py` gera o `index.html`. Use `#sim` no fim da URL para rodar só a física, sem renderizar (para testes e benchmark).
