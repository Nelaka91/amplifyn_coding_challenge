export interface Connection {
  node: string
  distance: number
}

export interface Node {
  id: string
  connections: Connection[]
}

export interface PathResult {
  path: string[]
  distance: number
}
