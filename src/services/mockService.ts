import type { Node, PathResult } from './types'

//test data to be used in mocking
export const mockNodes: Node[] = [
  {
    id: 'A',
    connections: [
      { node: 'B', distance: 4 },
      { node: 'C', distance: 6 },
    ],
  },
  {
    id: 'B',
    connections: [
      { node: 'A', distance: 4 },
      { node: 'E', distance: 2 },
      { node: 'F', distance: 2 },
    ],
  },
  {
    id: 'C',
    connections: [
      { node: 'A', distance: 6 },
      { node: 'D', distance: 8 },
    ],
  },
  {
    id: 'D',
    connections: [
      { node: 'C', distance: 8 },
      { node: 'E', distance: 4 },
      { node: 'G', distance: 1 },
    ],
  },
  {
    id: 'E',
    connections: [
      { node: 'B', distance: 2 },
      { node: 'D', distance: 4 },
      { node: 'F', distance: 3 },
      { node: 'G', distance: 4 },
    ],
  },
  {
    id: 'F',
    connections: [
      { node: 'B', distance: 2 },
      { node: 'E', distance: 3 },
      { node: 'H', distance: 6 },
    ],
  },
  {
    id: 'G',
    connections: [
      { node: 'D', distance: 1 },
      { node: 'E', distance: 4 },
      { node: 'H', distance: 5 },
      { node: 'I', distance: 5 },
    ],
  },
  {
    id: 'H',
    connections: [
      { node: 'F', distance: 6 },
      { node: 'G', distance: 5 },
      { node: 'I', distance: 8 },
    ],
  },
  {
    id: 'I',
    connections: [
      { node: 'G', distance: 5 },
      { node: 'H', distance: 8 },
    ],
  },
]

/**
 * Calculates the shortest path between two nodes in a graph using Dijkstra's algorithm.
 *
 * @param fromNode The starting node for the path calculation.
 * @param toNode The destination node for the path calculation.
 * @param graph The graph containing nodes and connections.
 * @returns An object containing the shortest path as an array of nodes and the total distance of the path.
 */
export const calculateShortestPath = (
  fromNode: string,
  toNode: string,
  graph: Node[],
): PathResult => {
  const distances: { [key: string]: number } = {}
  const previous: { [key: string]: string | null } = {}
  const visited: Set<string> = new Set()
  const unvisited: Set<string> = new Set()

  // Initialize distances and unvisited nodes
  graph.forEach(node => {
    distances[node.id] = Infinity
    previous[node.id] = null
    unvisited.add(node.id)
  })

  distances[fromNode] = 0 // Starting point

  while (unvisited.size > 0) {
    // Find the node with the smallest known distance
    const currentNode = [...unvisited].reduce((a, b) =>
      distances[a] < distances[b] ? a : b,
    )

    if (currentNode === toNode) break // We've reached the destination node

    // Get the node's connections
    const node = graph.find(n => n.id === currentNode)
    if (!node) break

    node.connections.forEach(connection => {
      if (!visited.has(connection.node)) {
        const tentativeDistance = distances[currentNode] + connection.distance
        if (tentativeDistance < distances[connection.node]) {
          distances[connection.node] = tentativeDistance
          previous[connection.node] = currentNode
        }
      }
    })

    // Mark this node as visited and remove from unvisited
    visited.add(currentNode)
    unvisited.delete(currentNode)
  }

  // Reconstruct the shortest path
  const path: string[] = []
  let step: string | null = toNode

  while (step) {
    path.unshift(step)
    step = previous[step]
  }

  // If the path does not start with the fromNode, there's no valid path
  if (path[0] !== fromNode) {
    return { path: [], distance: 0 } // No valid path found
  }

  return { path, distance: distances[toNode] }
}

/**
 * Function to get a list of IDs from the node structure.
 * @returns {string[]} Array of IDs.
 */
export function getNodeIdsForDropdown(): string[] {
  const ids: string[] = [] // Array to store the IDs

  // Traverse the mockNodes to collect IDs
  mockNodes.forEach(node => {
    ids.push(node.id) // Add the node's ID to the list
  })

  return ids // Return the accumulated list of IDs
}
