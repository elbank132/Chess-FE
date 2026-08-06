import './style.css'
import Konva from 'konva'
import { Chess } from 'chess.js'

const stage = new Konva.Stage({
  container: 'app',
  width: 800,
  height: 800,
})

const layer = new Konva.Layer()
stage.add(layer)

const background = new Konva.Rect({
  x: 0,
  y: 0,
  width: 800,
  height: 800,
  fill: 'white',
})
layer.add(background)
layer.draw()

const chess = new Chess()
