interface PieceLike {
  type: string
  color: string
}

export function pieceImageUrl(piece: PieceLike): string {
  return `/pieces/${piece.color}${piece.type.toUpperCase()}.svg`
}

const imageCache = new Map<string, HTMLImageElement>()

export function loadPieceImage(url: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(url)
  if (cached) return Promise.resolve(cached)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      imageCache.set(url, img)
      resolve(img)
    }
    img.onerror = reject
    img.src = url
  })
}
