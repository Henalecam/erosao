# Erosão

Idle de física: uma rocha voxel realista no centro de uma clareira, desgastada pela água pouco a pouco.
Os grãos que se soltam precisam ser levados pela correnteza até a calha de garimpo.

## Como jogar
- **Clique** na rocha para pingar uma gota. Cada gota tira quase nada, então insistir no mesmo ponto cava um buraco.
- A água escorre pela rocha, forma um riacho em volta dela e desce pelo canal até a **calha de madeira**.
- Os riffles da calha retêm parte dos grãos. O resto vai embora com a água.
- A calha enche: **lave-a** (botão ou tecla `L`) para transformar o que ela reteve em dinheiro. Com a calha cheia, os grãos se perdem.
- Dentro da rocha há veios de quartzo com ouro, pepitas e, nos geodos, ametista.

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
