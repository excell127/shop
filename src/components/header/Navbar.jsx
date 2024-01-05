import { useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { openSearch } from "../../../features/productSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const NAVLINKS = [
    { display: "Home", path: "/home" },
    { display: "Cart", path: "/cart" },
  ];

  return (
    <header className="bg-neutral text-neutral-content">
      <div className="app-container navbar">
        {/* Menu */}
        <div className="flex-none md:hidden">
          <details className="dropdown">
            <summary className="btn bg-transparent border-none w-auto m-0 px-0 pe-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="inline-block w-7 h-7 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </summary>

            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-32">
              {NAVLINKS.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={`${({ isActive }) =>
                      isActive ? "text-white" : ""} font-bold text-slate-400`}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Logo */}
        <div className="flex-1">
          <Link to={"/home"} className="text-xl font-semibold text-white">
            E-Commerce
          </Link>
        </div>

        {/* navlink */}
        <nav className="flex-none md:flex hidden">
          <ul className="menu menu-horizontal px-1 gap-3">
            {NAVLINKS.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={`${({ isActive }) =>
                    isActive ? "text-white" : ""} font-bold text-slate-400`}
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* button search */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => dispatch(openSearch())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* icon cart */}
        <div className="flex-none ms-3">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-black">8 Items</span>
                <span className="text-slate-600">Subtotal: $999</span>
                <div className="card-actions">
                  <Link to={"/cart"} className="btn btn-neutral btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
