const GAME_ID_KEY = 'chess:gameId'

export function saveGameId(gameId: string) {
  localStorage.setItem(GAME_ID_KEY, gameId)
}
