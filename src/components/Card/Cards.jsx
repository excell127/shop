import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";

export default function Cards({ products }) {
  const dispatch = useDispatch();

  return products.map((product) => (
    <div className="card bg-base-100 shadow-xl p-5" key={product.id}>
      <figure>
        <img src={product.image} alt="Shoes" className="object-contain h-28" />
      </figure>
      <div className="card-body p-0 mt-10 mb-5">
        <h2 className="card-normal line-clamp-2">{product.title}</h2>
        <h3 className="card-title text-lg md:text-xl line-clamp-1">
          Rp {(product.price * 15_000).toLocaleString()}
        </h3>
      </div>
      <div className="card-actions justify-end">
        <button
          className="btn btn-primary btn-outline w-full"
          onClick={() => dispatch(addToCart({ product }))}
        >
          Add To Cart
        </button>
      </div>
    </div>
  ));
}
