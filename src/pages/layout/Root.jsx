import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import FetchDataContext from "../../context/FetchDataContext";
import Image from "../../images/logo.jpg";

const Root = () => {
  const { checkIfWalletIsConnected, connectWallet, currentAccount } =
    useContext(FetchDataContext);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container p-1">
          <img
            src={Image}
            alt="logo"
            style={{ width: "75px", height: "50px" }}
            className="rounded mx-5"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
              <li className="nav-item mx-2">
                <Link className="nav-link placeholder-active" to="/">
                  <b>Dashboard</b>
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link placeholder-active" to="/voterList">
                  <b>Voter List</b>
                </Link>
              </li>
              <li className="nav-item dropdown mx-2">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Registration
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/candidateRegis">
                      Candidate Registration
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/voterRegis">
                      Voter Registration
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-divider"></Link>
                  </li>
                </ul>
              </li>
            </ul>
            {currentAccount ? (
              <button className="btn btn-outline-black mx-5" type="submit">
                <i className="fa-solid fa-wallet"></i>{" "}
                {currentAccount.slice(0, 5) + "..." + currentAccount.slice(39)}
              </button>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="btn btn-outline-black mx-5"
                type="submit"
              >
                <i className="fa-solid fa-wallet"></i> connect
              </button>
            )}
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
