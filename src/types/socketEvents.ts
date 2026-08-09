export const Status = {
  ACTIVE: 1,
  CHECKMATE: 2,
  STALEMATE: 3,
  DRAW: 4,
  RESIGNED: 5,
  INSUFFICIENT_MATERIAL: 6,
} as const

export type Status = (typeof Status)[keyof typeof Status]

export interface MatchFoundPayload {
  fen: string
  gameId: string
  whitePlayerId: string
  blackPlayerId: string
}

export interface GameStateUpdatePayload {
  fen: string
  status: Status
}

export interface MovePayload {
  move: string
  gameId: string
}

export interface ServerToClientEvents {
  match_found: (payload: MatchFoundPayload) => void
  game_state_update: (payload: GameStateUpdatePayload) => void
}

export interface ClientToServerEvents {
  move: (payload: MovePayload) => void
}
