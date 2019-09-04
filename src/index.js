// var jsxgraph = require('jsxgraph')
import JXG from 'jsxgraph'

import * as zeta from './zeta_jsx'

// CSS loader test
import './mycss.css'

// File loader test
import imgJpg from './action-beach-blue-2127969.jpg'
import imgSvg from './drunken_duck_Beer_2.svg'

// console.log(imgJpg)
// console.log(imgSvg)

function showImage(src, width, height, alt, cls) {
  var img = document.createElement('img')
  img.src = src
  if (width) {
    img.width = width
  }
  if (height) {
    img.height = height
  }
  if (alt) {
    img.alt = alt
  }
  if (cls) {
    img.classList.add(cls)
  }
  // img.style = 'border: 10px solid orange;'
  // img.class = 'graphbox'
  var div = document.createElement('div')
  // div.classList.add('orangebox')
  // This next line will just add it to the <body> tag
  document.body.appendChild(div)
  div.appendChild(img)
}

showImage(imgJpg, 0, 0, 0, 'graphbox')
showImage(imgSvg)

var boundingbox = [-25, 25, 25, -25, ]
// console.log(boundingbox)

var board = JXG.JSXGraph.initBoard('jxgbox', {
  showNavigation: false,
  showCopyright: false,
  axis: true,
  grid: true,
  boundingbox: boundingbox,
  keepaspectratio: true,
  /*
  // Não setar isso por que estraga

  //originX: 20,
  //originY: 380,
  //unitX: 30,
  //unitY: 30,
  */
})

var resize = function () {
  const bb = boundingbox
  const bbWidth = bb[2] - bb[0]
  const bbHeight = bb[1] - bb[3]
  const cliWidth = board.containerObj.clientWidth
  const cliHeight = board.containerObj.clientHeight
  const scaleX = bbWidth / cliWidth
  const scaleY = bbHeight / cliHeight
  let newBB = [...bb, ]
  let half = 0
  if (scaleX < scaleY) {
    half = cliWidth * scaleY / 2
    newBB[0] = -half
    newBB[2] = half
  } else {
    half = cliHeight * scaleX / 2
    newBB[1] = half
    newBB[3] = -half
  }
  board.setBoundingBox(newBB, true)
}

window.onresize = resize
resize()

// -------------------------------------------------------------------------
var xDelay = 15
var yDelay = 11
var xRefLeft = 25
var xRefRight = xRefLeft + xDelay
var yRefInf = 0
var yRefSup = yRefInf + yDelay
var i
// Monta área do desenho
var p1 = board.create('point', [xRefLeft, yRefInf, ], { visible: false, })
var p2 = board.create('point', [xRefLeft, yRefSup, ], { visible: false, })
var p3 = board.create('point', [xRefRight, yRefSup, ], { visible: false, })
var p4 = board.create('point', [xRefRight, yRefInf, ], { visible: false, })
var f = board.create('polygon', [p1, p2, p3, p4, ], { fillcolor: 'blue', })
for (i = 0; i < f.borders.length; i++) {
  f.borders[i].setProperty('strokeColor:black')
}
/*
 * Por default, os polígonos tem snap de uma unidade, mas isso pode ser
 * modificado nas propriedades.
 */

// var pol3 =
board.create('polygon',
  [[30, 20, ], [30, 1, ], [50, 1, ], [50, 20, ], ])

const vertices1 = [
  [0.0, 2.0, ],
  [2.0, 2.0, ],
  [4.0, 6.0, ],
  [0.0, 6.0, ],
]
// var poligono1 =
new zeta.TranslatablePolygon(board, vertices1)

const vertices2 = [
  [12.0, 0.0, ],
  [16.0, 0.0, ],
  [16.0, 8.0, ],
  [20.0, 8.0, ],
]
// Propriedades dos vertices
const vProps2 = {
  snapToGrid: true,
  snapSizeX: 4,
  snapSizeY: 4,
}
// Propriedades do polígono
const pProps2 = {
  fillColor: '#FF0000',
  highlightFillColor: '#00FF00',
  fillOpacity: 0.3,
  highlightFillOpacity: 0.3,
  shadow: true,
  ...vProps2, // Faz o snap do poligono ser igual ao dos pontos
}
// var poligono2 =
new zeta.TranslatablePolygon(board, vertices2, vProps2, pProps2)

const vertices3 = [
  [8.0, 4.0, ],
  [14.0, 4.0, ],
  [12.0, 8.0, ],
  [8.0, 8.0, ],
]
// var poligono3 =
new zeta.RotatablePolygon(board, vertices3)

const vertices4 = [
  [-20, -5, ],
  [-10, -5, ],
  [-10, 5, ],
  [-20, 5, ],
]
// g4 = []
// for (p of vertices4) {
//   g4.push(board.create('point', p, { visible: false }));
// }
// var group4 = board.create('group', g4)
let pol4 = new zeta.DiscreteRotationPolygon(board, 7, vertices4)
pol4.rotate(2)

// ------------------------------------------------------------------------------
