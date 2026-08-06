import './style.css'
import Konva from 'konva'
import { Chess } from 'chess.js'
import { drawBoard } from './board'

const stage = new Konva.Stage({
  container: 'app',
  width: 800,
  height: 800,
})

const layer = new Konva.Layer()
stage.add(layer)

drawBoard(layer)
layer.draw()

const chess = new Chess()
