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
      </div>
    </nav>
  );
}

export default Navbar;