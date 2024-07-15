import styles from "./styles.module.scss";
import IconBack from "@images/icon-back.png";
import IconDots from "@images/icon-dots.png";
import router from "next/router";
import { AddToCart, Button, CartButton, Description, Nav } from "@/components";
import { productFunctions } from "@/utils";
import { GetStaticProps } from "next";
import { api } from "@/services";
import { useEffect, useState } from "react";

const PageProducts = (props) => {
  const back = () => {
    router.push("/products");
  };
  const {
    getVariations,
    normalizeProductUrl,
    getInitialVariation,
    getCurrentVariation,
  } = productFunctions();

  const { product } = props;
  const initialVariation = getInitialVariation(product);

  const [currentVariation, setCurrentVariation] = useState(initialVariation);
  const [selectedVariation, setSelectedVariation] = useState<any>({});

  useEffect(() => {
    if (selectedVariation?.sku) {
      setCurrentVariation(
        getCurrentVariation({ product: product, sku: selectedVariation?.sku })
      );
    }
  }, [selectedVariation]);

  const selectVariation = (variation) => {
    setSelectedVariation(variation);
  };

  const addToCart = () => {
    alert(JSON.stringify(currentVariation));
  };

  return (
    <div className={styles.page}>
      <div className={styles.product}>
        <div className={styles.top}>
          <div className={styles.nav}>
            <Nav
              leftIcon={{
                src: IconBack,
                action: () => {
                  back();
                },
              }}
              rightIcon={{ src: IconDots }}
            >
              Detail
            </Nav>
          </div>
          <div className={styles.image}>
            <img src={product?.image} />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.section}>
            <div className={styles.hero}>
              <div className={styles.title}>
                <p className={styles.name}>{product?.name}</p>
                <p className={styles.price}>
                  $ {currentVariation?.price?.toFixed(2)}
                </p>
              </div>
              <div className={styles.subtitle}>
                <p>{`Origin: ${product?.origin} I Stock: ${currentVariation?.stock}`}</p>
              </div>
            </div>

            <div className={styles.description}>
              <p className={styles.title}>Description</p>
              <Description>{product?.description}</Description>
            </div>

            <div className={styles.variations}>
              <div className={styles.title}>{product?.variations?.type}</div>
              <div className={styles.buttons}>
                {product?.variations?.items?.map((variation, idx) => (
                  <Button
                    actived={variation?.sku === currentVariation?.sku}
                    key={idx}
                    action={() => {
                      selectVariation(variation);
                    }}
                  >
                    {variation?.type}
                  </Button>
                ))}
              </div>
            </div>

            <div className={styles.groupButton}>
              <CartButton />
              <AddToCart
                action={() => {
                  addToCart();
                }}
              >
                Add to cart
              </AddToCart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageProducts;

export async function getStaticPaths() {
  const getFilteredList = async () => {
    const { beerApi } = api();
    const response = await beerApi.get("/products");

    return response.data;
  };

  const { normalizeProductUrl } = productFunctions();

  const [filteredList] = await Promise.all([getFilteredList()]);

  const paths = filteredList.map((product) => ({
    params: {
      name: normalizeProductUrl({ sku: product.sku, name: product.name }),
    },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const currentProduct = async () => {
    const { beerApi } = api();

    const sku = String(context.params?.name).split("-")[0];

    const response = await beerApi.get(`/product/${sku}`);

    return response.data;
  };

  const [product] = await Promise.all([currentProduct()]);

  return {
    props: {
      product: product,
    },
    // check updates
    revalidate: 5,
  };
};
