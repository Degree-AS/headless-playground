import { DWNavigation } from "./navigation.types-dw";

export type NavNode = {
  pageId: string;
  link: string;
  name: string;
};

export async function rootNavigation(): Promise<NavNode[]> {
  try {
    // 1. Check if NEXT_CMS_API_URL exists
    const cmsUrl = process.env.NEXT_CMS_API_URL;
    if (!cmsUrl) {
      console.warn(
        "No NEXT_CMS_API_URL specified. Returning empty navigation."
      );
      return [];
    }

    // 2. Attempt fetch
    const response = await fetch(
      `${cmsUrl}/frontend/navigations/1?IncludeFoldersAndHidden=true&ExpandMode=1&StartLevel=1&StopLevel=2`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // response status is 4xx or 5xx
      throw new Error(`Request failed with status ${response.status}`);
    }

    // 3. Parse data
    const data = (await response.json()) as DWNavigation;

    // 4. Transform into NavNode array
    const navNodes: NavNode[] = data.nodes.map((node) => ({
      pageId: node.pageId,
      link: node.link,
      name: node.name,
    }));

    return navNodes;
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    // return an empty array or handle it however you want
    return [];
  }
}
