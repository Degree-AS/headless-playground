import { DWNavigation } from "./navigation.types-dw";

export type NavNode = {
  pageId: string;
  link: string;
  name: string;
};

const rootNavigation = async () => {
  const response = await fetch(
    `${process.env.NEXT_CMS_API_URL}/frontend/navigations/1?IncludeFoldersAndHidden=true&ExpandMode=1&StartLevel=1&StopLevel=2`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = (await response.json()) as DWNavigation;

  const navNodes: NavNode[] = data.nodes.map((node) => ({
    pageId: node.pageId,
    link: node.link,
    name: node.name,
  }));

  return navNodes;
};

export { rootNavigation };
