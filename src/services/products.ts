import { cache } from "react";

import { api } from "@services";

const products = () => {
  const { beerApi } = api();
  const getProducts = cache(async () => {
    const data = await beerApi.get("/products");
    return data;
  });

  return {
    getProducts,
  };
};

export default products;
