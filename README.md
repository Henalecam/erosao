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

## Celular
Toque na rocha para usar a ferramenta, segure para chover, encher o balão ou disparar o jato. Dois dedos giram a câmera e dão zoom.
A interface se reorganiza na tela pequena, com a loja recolhida, as ferramentas logo acima dela e botões só com ícones.

## Som
Água, vento e pássaros sintetizados, mais **música ambiente generativa** (acordes suaves em pentatônica e notas de sino com eco). O botão 🔊 liga e desliga.

## Ferramentas (cada uma com seu papel)
| Ferramenta | Papel | Limite |
|---|---|---|
| 💧 Gota / Chuva | Constante e barata; constrói o combo | — |
| 🚿 Jato | Maior dano contínuo; **perfura** | **Tanque de pressão**: esvazia e recarrega |
| 🎈 Balão | Explosão em área; **lança blocos** (que só pagam quando são recolhidos) | Recarga de 6 s |
| 🧊 Granizo | Lascador preciso, **×2 contra rocha dura** (granito, quartzo, ouro, meteorito) | Recarga de 3 s |
| 🌊 Onda | Utilidade: empurra os detritos e ativa a **Maré** (+60% de captura nas calhas) | Recarga de 7 s |

Balanceamento medido (20 s, mesmas melhorias, arenito): todas as ferramentas ficam entre $310 e $525. Antes, a diferença chegava a 15×.

## Perks
A cada rank novo e a cada rocha nova, escolha 1 de 3 perks. São 20 no total: gotas gêmeas, pulmão de aço, jato afiado,
mãos rápidas, balão gordo, granizo de diamante, maré alta, erosão em cadeia, olho de geólogo, bateia de ouro, cardume,
calha magnética, embalo, engrenagens, chuva farta, castores amigos, trevo, cartógrafo, vigia noturno e para-raios.

## Britador, rachaduras e conquistas
- **Britador:** puxa os fragmentos soltos e os mói em grãos, que a água leva às calhas. Faz os blocos do balão e do granizo virarem dinheiro.
- **Rachaduras:** voxels danificados escurecem e trincam antes de quebrar.
- **15 conquistas** (🏆): cada uma dá +2% de renda permanente e sobrevive às expedições.

## Libélula dourada e expedição
- **Libélula dourada:** de tempos em tempos ela cruza a clareira; clique nela para ganhar um bônus aleatório:
  - Frenesi: renda ×3.
  - Fôlego infinito.
  - Saco de ouro.
  - Chuva dourada.
- **Expedição (prestígio):** depois de trocar 3 rochas, você pode recomeçar e ganhar **âmbar** 🟠. Cada âmbar dá +8% de renda e +3% de erosão para sempre. A coleção e os objetivos ficam.
- **Gráficos:** Alto, Médio ou Baixo (resolução, sombras, partículas e grama).

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
