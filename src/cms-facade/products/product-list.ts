export type ProductItem = {
  id: string;
  name: string;
  description: string;
};

const productList = () => {
  return [
    {
      id: "1",
      name: "Test Product 1",
      description: "Test product 1 description",
    } as ProductItem,
    {
      id: "2",
      name: "Test Product 2",
      description: "Test product 2 description",
    } as ProductItem,
    {
      id: "3",
      name: "Test Product 3",
      description: "Test product 3 description",
    } as ProductItem,
  ];
};

export { productList };
