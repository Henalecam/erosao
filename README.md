# Erosão

Idle 2D de física de água: uma pedra fica fixa no centro da tela e a água a corrói.

- **Água real:** simulação de fluido por partículas (SPH viscoelástico de Clavet et al.), com pressão, quase-pressão, viscosidade e tensão superficial. A superfície é desenhada a partir do campo de densidade (metaballs), com brilho na borda e espuma onde a água corre rápido.
- **Erosão:** cada impacto ou escoamento sobre a pedra desgasta a célula atingida, conforme a velocidade da água e a dureza do material. As células quebradas viram sedimento, que a água arrasta até o ralo e que vira dinheiro ao cair nele.
- **Desmoronamento:** um pedaço que se desliga do bloco principal desmorona inteiro.
- **Materiais:** terra (com musgo), pedra, cristal, ouro e gemas.
- **Upgrades:** gota maior, chuva (segurar o clique), água ácida, nuvem (idle), ralo e jato.

Rodar: abra o `index.html` no navegador. É um arquivo único, sem dependências.
