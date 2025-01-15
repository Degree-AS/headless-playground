export type DWNavigation = {
  nodes: DWNavigationNode[];
};

export type DWNavigationNode = {
  pageId: string;
  groupId?: string;
  name: string;
  link: string;
  nodes: DWNavigationNode[];
};
