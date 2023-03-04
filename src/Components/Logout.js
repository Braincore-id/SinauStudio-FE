import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function ButtonLogout() {
  const [cookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  function Logout() {
    if (cookie.token) {
      console.log("exec ");
      removeCookie("token", "");
      navigate("/");
    }
  }

  return (
    <button className="btn btn-ghost btn-circle" onClick={Logout}>
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  );
}

export default ButtonLogout;
