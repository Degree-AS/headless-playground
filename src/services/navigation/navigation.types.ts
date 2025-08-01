export type NavigationNode = {
  pageId: number
  name: string
  showInMenu: boolean
  nodes: NavigationNode[]
}

export type NavigationResponse = {
  nodes: NavigationNode[]
}
