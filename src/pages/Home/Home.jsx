import { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import { useDispatch, useSelector } from "react-redux";
import CardSkelenton from "../../components/Card/CardSkeleton";
import Cards from "../../components/Card/Cards";
import { getProducts, searchProducts } from "../../../features/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const productsSlice = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Navbar />
      <main className="app-container py-5">
        {productsSlice.isOpenSearch ? (
          <section className="mb-5">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered"
                onChange={(e) =>
                  dispatch(searchProducts({ q: e.target.value }))
                }
              />
            </div>
          </section>
        ) : null}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {productsSlice.isLoading ? (
            <CardSkelenton />
          ) : productsSlice.error ? (
            <h1 className="text-center col-span-full text-red-500 font-semibold text-3xl">
              {productsSlice.error}
            </h1>
          ) : (
            <Cards products={productsSlice.productsFiltered} />
          )}
        </section>
      </main>
    </>
  );
}
