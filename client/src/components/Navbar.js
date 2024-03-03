import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const isPayPage = location.pathname === "/pay";

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      {!user && <div className="hideHeader"></div>}
      {user && (
        <div className="container">
          <button
            className="btnNavBar"
            disabled={isPayPage}
            onClick={() => navigate("profile")}
          >
            <p>
              <i className="fa-solid fa-user"></i>
            </p>
            <p>
              <strong>Profile</strong>
            </p>
          </button>
          <button
            className="btnNavBar"
            disabled={isPayPage}
            onClick={() => navigate("pay")}
          >
            <p>
              <i className="fa-solid fa-receipt"></i>
            </p>
            <p>
              <strong>Top Up</strong>
            </p>
          </button>
          <button
            className="btnNavBar"
            disabled={isPayPage}
            onClick={() => navigate("transaction")}
          >
            <p>
              <i className="fa-sharp fa-solid fa-clock-rotate-left"></i>
            </p>
            <p>
              <strong>Transaction</strong>
            </p>
          </button>
          <button
            className="btnNavBar"
            disabled={isPayPage}
            onClick={handleClick}
          >
            <p>
              <i className="fa-solid fa-right-from-bracket"></i>
            </p>
            <p>
              <strong>Logout</strong>
            </p>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
