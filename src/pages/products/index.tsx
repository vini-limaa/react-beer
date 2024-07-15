import styles from "./styles.module.scss";
import { Nav, Hero, ListProduct, ProductCard } from "@/components";
import IconProfile from "@images/icon-profile.png";
import IconBurguer from "@images/icon-hamburguer.png";
import { GetStaticProps } from "next";
import { api } from "@services";
import { productFunctions } from "@utils";
import { useRouter } from "next/router";

const PageProducts = (props) => {
  const { products } = props;
  const { getCurrentPrice, normalizeProductUrl } = productFunctions();
  const router = useRouter();

  const goProduct = (product) => {
    router.push(
      `/product/${normalizeProductUrl({
        sku: product.sku,
        name: product.name,
      })}`
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <Nav
          leftIcon={{ src: IconBurguer }}
          rightIcon={{ src: IconProfile, rounded: true }}
        />
      </div>
      <div className={styles.hero}>
        <Hero title={"Hi Mr. Vinicius"} subtitle={"Welcome Back!"} />
      </div>
      <div className={styles.products}>
        <p className={styles.title}>Our Products</p>

        <div className={styles.list}>
          <ListProduct>
            {products?.map((product, idx) => {
              const { name, image } = product;

              return (
                <ProductCard
                  key={idx}
                  name={name}
                  image={image}
                  price={getCurrentPrice(product)}
                  action={() => {
                    goProduct(product);
                  }}
                />
              );
            })}
          </ListProduct>
        </div>
      </div>
    </div>
  );
};

export default PageProducts;

export const getStaticProps: GetStaticProps = async (context) => {
  const getFilteredList = async () => {
    const { beerApi } = api();
    const response = await beerApi.get("/products");

    return response.data;
  };

  const [filteredList] = await Promise.all([getFilteredList()]);

  return {
    props: {
      products: filteredList,
    },

    // check updates
    revalidate: 5,
  };
};
