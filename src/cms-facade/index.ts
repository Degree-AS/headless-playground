import { blockList } from "./cms/block-list";
import { login } from "./users/auth";
import { productList } from "./products/product-list";

export const cms = {
  cms: {
    blockList,
  },
  users: {
    login,
  },
  products: {
    productList,
  },
};
