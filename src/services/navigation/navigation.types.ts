export interface NavigationNode {
  pageId: number
  name: string
  showInMenu: boolean
  nodes: NavigationNode[]
}

export interface NavigationResponse {
  nodes: NavigationNode[]
}
