import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <Link to="/" className="btn">
          Home
        </Link>
        <Link to="/add-job" className="btn">
          Add Job
        </Link>
        <Link to="/signup" className="btn">
          Signup
        </Link>
        <Link to="/login" className="btn">
          Login
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;