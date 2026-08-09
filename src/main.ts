import './style.css'
import Konva from 'konva'
import './net/socket'
import { drawBoard } from './board/board'
import { renderPieces } from './board/pieces'
import { attachDragHandlers } from './input/dragHandler'
import { GameManager } from './game/GameManager'
import { registerGameEvents } from './net/gameEvents'

const BOARD_SIZE = 800
const SQUARE_SIZE = BOARD_SIZE / 8

const stage = new Konva.Stage({
  container: 'app',
  width: BOARD_SIZE,
  height: BOARD_SIZE,
})

const boardLayer = new Konva.Layer()
const pieceLayer = new Konva.Layer()
stage.add(boardLayer)
stage.add(pieceLayer)

drawBoard(boardLayer, BOARD_SIZE)
boardLayer.draw()

const game = new GameManager()
registerGameEvents(game, render)

let renderInFlight: Promise<void> | null = null
let renderQueued = false

async function render() {
  if (renderInFlight) {
    renderQueued = true
    return
  }
  renderInFlight = doRender()
  await renderInFlight
  renderInFlight = null
  if (renderQueued) {
    renderQueued = false
    await render()
  }
}

async function doRender() {
  const orientation = game.getOrientation()
  await renderPieces(pieceLayer, game.getBoard(), SQUARE_SIZE, orientation)
  attachDragHandlers(pieceLayer, game, SQUARE_SIZE, render, orientation)
}

render()
