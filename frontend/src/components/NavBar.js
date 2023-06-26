import { Link, useLocation } from "react-router-dom";

function NavBar({ loggedIn, email, signOut }) {
  const { pathname } = useLocation();

  const textBar = pathname === `${"/signin"}` ? "Регистрация" : "Войти";
  const linkRoute = `${pathname === "/signin" ? "/signup" : "/signin"}`;

  return (
    <nav className="navBar__container">
      {loggedIn ? (
        <>
          <h2 className="navBar__link">{email}</h2>
          <Link to="" onClick={signOut} className="navBar__link">
            Выйти
          </Link>
        </>
      ) : (
        <>
          <Link to={linkRoute} className="navBar__link">
            {textBar}
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
