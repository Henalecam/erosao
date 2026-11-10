# Erosão

Idle de física: uma rocha voxel realista no centro de uma clareira, desgastada pela água pouco a pouco.
Os grãos que se soltam precisam ser levados pela correnteza até a calha de garimpo.

## Como jogar
- **Clique** na rocha para pingar uma gota. Cada gota tira quase nada, então insistir no mesmo ponto cava um buraco.
- A água escorre pela rocha, forma um riacho em volta dela e desce pelo canal até a **calha de madeira**.
- Os riffles da calha retêm parte dos grãos. O resto vai embora com a água.
- A calha enche: **lave-a** (botão ou tecla `L`) para transformar o que ela reteve em dinheiro. Com a calha cheia, os grãos se perdem.
- Dentro da rocha há veios de quartzo com ouro, pepitas e, nos geodos, ametista.

## Câmera
- WASD ou setas: mover
- Q/E: girar
- R/F: zoom (a roda do mouse também funciona, com zoom em direção ao cursor)
- Botão do meio: arrastar
- Botão direito: orbitar
- C: centralizar na rocha

## Progressão
- **Marcos de erosão:** cada rocha tem marcos (0,08%, 0,2%, 0,4%… até 65%) que pagam recompensas crescentes.
- **Próxima rocha:** depois de 10% erodido, dá para trocar de rocha. Cada nova rocha vale +35% (bônus permanente). Com 65%, a troca é automática.
- **Ranks de garimpeiro:** sobem conforme o total já ganho (de Aprendiz a Titã da erosão), e cada rank aumenta a renda em 12%.
- **Combo:** erodir sem parar aumenta um multiplicador (até ×4) que paga na hora cada voxel arrancado.
- **Bateia:** clique nos grãos encalhados para recolhê-los na mão.
- **Água parada** infiltra no solo e evapora; os grãos esquecidos por muito tempo se perdem.
- A rocha erodida fica salva e continua de onde parou ao recarregar.

## Desbloqueios
- **Ferramentas (teclas 1 a 5):** gota, jato contínuo, balão d'água (erosão em área), granizo (lasca e quica) e onda (parede de água).
- **Torretas:** gotejadora, esguicho e lança-balões. Elas miram sozinhas e o upgrade de cadência acelera todas.
- **Terreno:**
  - Nascente: abre um riacho que bate na rocha.
  - Aqueduto: despeja água no topo da rocha.
  - Tempestades: evento de chuva forte, com raios.
  - Represas surpresa: castores represam o riacho; clique na represa para estourar e causar uma enchente com erosão ×2.
- **Física da rocha:** os pedaços que se soltam viram fragmentos rígidos que caem, rolam, lascam no impacto e são erodidos pela água.
- **Garimpo:** calha maior, riffles e lavagem automática. Clicar na calha também a lava.

## Tecnologia
- **Fluido:** SPH viscoelástico 3D (Clavet et al. 2005), com relaxação de dupla densidade, viscosidade e coesão, a 120 Hz. Os grãos de sedimento são partículas mais pesadas, arrastadas pela água.
- **Rocha:** grade voxel de 128×104×128 (2,2 cm) gerada com ruído: estratos, fissuras, veios, musgo e líquen. A malha é feita por chunks com oclusão ambiente por vértice.
- **Colisão:** a água colide com a normal suavizada da rocha, então escorre em vez de parar nos degraus. A erosão depende da velocidade de impacto e do cisalhamento do escoamento.
- **Água na tela:** renderização em espaço de tela (profundidade das esferas, blur bilateral, normais, refração, absorção de Beer-Lambert, reflexo de Fresnel do céu e brilho do sol).
- **Cena:** Three.js com sombras suaves, céu de entardecer e ambiente PBR. Os sons (água, pássaros, vento, garimpo) são sintetizados com WebAudio.

## Estrutura
- `src/fluid.js`: simulação do fluido
- `src/game.html`: jogo
- `build.py`: gera o `index.html` final, com o fluido embutido

```
python3 build.py && npx serve .
```

Use `#sim` no fim da URL para rodar só a física, sem renderizar (útil para testes).
