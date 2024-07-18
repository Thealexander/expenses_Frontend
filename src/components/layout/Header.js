import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../slices/securitySlices';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, loading } = useSelector((state) => state.security);
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Session logged out successfully');
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/expense.png" alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-6 text-center">
        <h1>Expense Tracker</h1>
      </div>
      <div className="col-12 col-md-3 text-right">
        {user ? (
          <button className="btn btn-danger" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          !loading && (
            <Link className="btn btn-primary" id="login_btn" to="/login">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
