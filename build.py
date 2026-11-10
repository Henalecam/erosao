# Junta src/fluid.js dentro de src/game.html -> index.html
import re
g=open('src/game.html',encoding='utf-8').read()
f=open('src/fluid.js',encoding='utf-8').read()
open('index.html','w',encoding='utf-8').write(g.replace('/*FLUID*/',f))
