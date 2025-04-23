import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
	  	<span className="navbar-brand mb-0 h1 neon-title">Jackie’s Contact Book</span>
        <div className="ml-auto">
          <Link to="/submit">
            <button
              onClick={() => {
                const emptyContact = {
                  name: "",
                  email: "",
                  phone: "",
                  address: ""
                };
                dispatch({ type: "set_single_contact", payload: emptyContact });
              }}
              className="btn btn-pink mt-3"

            >
              Add New Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
