export function rootPath() {
  return "/"
}

export function matchRootPath(path: string) {
  return /^\/?$/.exec(path)
}

export function gamePath(gameCode: string) {
  return `/games/${gameCode}`
}

export function matchGamePath(path: string) {
  return /^\/?games\/([^\/]+)$/.exec(path)
}

export function playerPath(gameCode: string, playerId: string) {
  return `/games/${gameCode}/play/${playerId}`
}

export function matchPlayerPath(path: string) {
  return /^\/?games\/([^\/]+)\/play\/([^\/]+)$/.exec(path)
}
