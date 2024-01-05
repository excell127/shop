import { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProducts } from "../../../features/productSlice";
import CardSkelenton from "../../components/Card/CardSkeleton";
import Card from "../../components/Card/Card";

export default function Home() {
  const dispatch = useDispatch();
  const productsSlice = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log({ productsFIltter: productsSlice.productsFilltered });
  console.log({ products: productsSlice.products });

  return (
    <>
      <Navbar />
      <main className="app-container py-5">
        {productsSlice.isEnableSearch ? (
          <form className="mb-5 grid place-items-center">
            <input
              type="text"
              placeholder="Search Products"
              className="input input-bordered w-full max-w-3xl"
              onChange={(e) => dispatch(searchProducts({ q: e.target.value }))}
            />
          </form>
        ) : null}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {productsSlice.isLoading ? (
            <CardSkelenton />
          ) : productsSlice.error ? (
            <h1 className="text-center col-span-full text-red-500 font-semibold text-3xl">
              {productsSlice.error}
            </h1>
          ) : (
            <Card products={productsSlice.productsFilltered} />
          )}
        </section>
      </main>
    </>
  );
}
