const productFunctions = () => {
  const getCurrentPrice = (product) => {
    return getVariations(product)
      .items?.filter((variation) => variation.sku === product.mainVariation)[0]
      ?.price?.toFixed(2);
  };

  const getVariations = (product) => {
    return product.variations;
  };

  const getInitialVariation = (product) => {
    return getVariations(product).items?.filter(
      (variation) => variation.sku === product.mainVariation
    )[0];
  };

  const getCurrentVariation = ({ product, sku }) => {
    return getVariations(product).items?.filter(
      (variation) => variation.sku === sku
    )[0];
  };

  const normalizeProductUrl = ({
    sku,
    name,
  }: {
    sku: string;
    name: string;
  }) => {
    return `${sku}-${name.toLowerCase().replace(" ", "-")}`;
  };

  return {
    getCurrentPrice,
    getVariations,
    getInitialVariation,
    normalizeProductUrl,
    getCurrentVariation,
  };
};

export default productFunctions;
