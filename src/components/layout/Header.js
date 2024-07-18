import React, { Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../slices/securitySlices';
import { Link } from 'react-router-dom';
import "../../App.css";

const Header = () => {
  const { user, loading } = useSelector((state) => state.security);
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Session logged out successfully');
  };


  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/expense_logo.png" alt='logo' style={{ width: '90px', height: '55px' }} />
            </Link>
          </div>
        </div>
        <div className="app-title ms-3">
          <h1 style={{ color: 'white' }}>ECO</h1>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <span className="text-white">Welcome, {user.username}</span>
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{user && user.userName}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link className="dropdown-item" to="/" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (

            !loading &&
            (
              <Link className="btn ml-4" id="login_btn" to="/login">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
