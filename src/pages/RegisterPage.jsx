import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>
      <form>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
      </form>
      <Link to="/">
        <button>Register</button>
      </Link>
    </div>
  );
};
export default RegisterPage;
