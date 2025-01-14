export type BlockProperty = {
  name: string;
  value: string;
};

export type BlockItem = {
  type: "hero" | "news-item";
  props?: BlockProperty[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const blockList = (pageId: string) => {
  return [
    {
      type: "hero",
      props: [
        {
          name: "title",
          value: "Hero Item Title",
        },
        {
          name: "imageUrl",
          value: "https://fastly.picsum.photos/id/26/4209/2769.jpg?hmac=vcInmowFvPCyKGtV7Vfh7zWcA_Z0kStrPDW3ppP0iGI",
        },
      ],
    } as BlockItem,
  ];
};

export { blockList };
