import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar navbar-dark navbar-expand-sm bg-dark fixed-top'>
      <div className='container'>
        <Link to='/' className='navbar-brand mr-auto'>
          <FontAwesomeIcon icon={faWpforms} /> Elite Tech Park
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarCollapse'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div id='navbarCollapse' className='collapse navbar-collapse'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to='/' className='nav-link' activeClassName='active' exact>
                Student Form
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/studentDetails'
                className='nav-link'
                activeClassName='active'
              >
                Detail Report
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/selectedStudent'
                className='nav-link'
                activeClassName='active'
              >
                Selected Student
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
