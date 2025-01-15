import { blockList } from "./cms/block-list";
import { login } from "./users/auth";
import { productList } from "./products/product-list";
import { rootNavigation } from "./navigation/navigation";

export const cms = {
  cms: {
    blockList,
  },
  navigation: {
    rootNavigation,
  },
  products: {
    productList,
  },
  users: {
    login,
  },
};
