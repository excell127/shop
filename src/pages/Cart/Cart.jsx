import { useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantityOfProduct,
  removeProduct,
  useCartSelector,
} from "../../../features/cartSlice";
import Navbar from "../../components/header/Navbar";
import { IoTrashOutline } from "react-icons/io5";

export default function Cart() {
  const cart = useCartSelector();
  const dispatch = useDispatch();

  console.log(cart.products);
  return (
    <>
      <Navbar />
      <main className="app-container flex gap-5 py-5 items-start bg-gray-100 min-h-screen flex-col md:flex-row">
        <section className="flex-1 bg-white p-3 max-md:w-full">
          {cart.products.length > 0 ? (
            cart.products.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 mb-5 border border-black p-3 relative"
              >
                <img
                  className="object-contain max-w-20"
                  src={item.image}
                  alt={item.title}
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="line-clamp-1">{item.title}</h3>
                    <p className="text-xl mt-1 font-bold text-red-500">
                      Rp {(item.finalPrice * 15_000).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex border border-slate-500 item-center max-w-max">
                    <div
                      onClick={() =>
                        dispatch(decrementQuantityOfProduct({ product: item }))
                      }
                      className="p-1 text-xl font-bold px-4 hover:bg-slate-200 cursor-pointer transition-all duration-75"
                    >
                      -
                    </div>
                    <p className="border-x border-slate-500 p-1 px-3 text-xl">
                      {item.quantity}
                    </p>
                    <div
                      onClick={() => dispatch(addToCart({ product: item }))}
                      className="p-1 text-xl font-bold px-4 hover:bg-slate-200 cursor-pointer transition-all duration-75"
                    >
                      +
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeProduct({ product: item }))}
                  className="btn btn-square absolute right-3 bottom-3 bg-white"
                >
                  <IoTrashOutline className="text-sm md:text-xl cursor-pointer" />
                </button>
              </div>
            ))
          ) : (
            <h3 className="text-center font-semibold text-lg capitalize">
              no products in cart...
            </h3>
          )}
        </section>
        <section className="w-full md:max-w-[300px] flex-1 bg-white p-3">
          <h3 className="text-2xl font-semibold">TOTAL</h3>
          <div className="flex items-center justify-between mb-1 mt-2">
            <h5>Total :</h5>
            <p>{cart.totalQuantity}</p>
          </div>
          <div className="flex items-center justify-between mb-5">
            <h5>Total Price :</h5>
            <p>Rp {(cart.total * 15_000).toLocaleString()}</p>
          </div>
          <button
            disabled={cart.products < 1}
            className="btn btn-active btn-primary w-full"
          >
            Choose Payment
          </button>
        </section>
      </main>
    </>
  );
}
