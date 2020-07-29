import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Sidebars(props) {
  const [state, setState] = useState({ menu: [], active: 'assignment', view: null, roles: [] });

  const handleNavbar = e => {
    let { menu } = state;
    let id = e.target.id;
    if (menu.includes(id)) {
      var index = menu.indexOf(id);
      menu.splice(index, 1);
      setState(state => ({ ...state, ...menu, active: id }));
    } else {
      setState(state => ({ ...state, menu: [...menu, id], active: id }));
    }
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div className="container-fluid">

          <button className="navbar-toggler" onClick={() => setState(state => ({ ...state, view: true }))} type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <Link to='/' className="navbar-brand pt-0">
            <img onClick={handleNavbar} id='dashboard' src="/images/canyon.png" className="navbar-brand-img" alt="..." />
          </Link>

          <span className='navbar-customScroll'>
            <div className={state.view ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="sidenav-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <div className="row">
                  <div className="col-6 collapse-brand">
                  </div>
                  <div className="col-6 collapse-close">
                    <button type="button" onClick={() => setState(state => ({ ...state, view: false }))} className="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                      <span />
                      <span />
                    </button>
                  </div>
                </div>
              </div>

              <ul className="navbar-nav">

                <li className="nav-item">
                  <div onClick={handleNavbar} id='home' className={state.active === 'home' ? "nav-link active collapsed profileBar" : "nav-link collapsed profileBar"} data-toggle="collapse" aria-expanded={state.active === 'home' ? "true" : "false"} >
                    <i className="fas fa-desktop" /> Pages<i className="fa fa-caret-down caret-style" />
                  </div>
                  <div id="collapse1" className={state.menu.includes('home') ? "collapse show" : "collapsing"}>
                    <ul className="list-unstyled menuPadding">
                      <li>
                        <Link to='/page1' onClick={handleNavbar} id='page1' className={state.active === 'page1' ? "nav-link active" : "nav-link"}>
                          <i className="fa fa-user" /> Page 1</Link>
                      </li>
                      <li>
                        <Link to='/page2' onClick={handleNavbar} id='page2' className={state.active === 'page2' ? "nav-link active" : "nav-link"}>
                          <i className="fa fa-user" /> Page 2</Link>
                      </li>
                      <li>
                        <Link to='/page3' onClick={handleNavbar} id='page3' className={state.active === 'page3' ? "nav-link active" : "nav-link"}>
                          <i className="fa fa-user" /> Page 3</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to='/assignment' onClick={handleNavbar} id='assignment' className={state.active === 'assignment' ? "nav-link active" : "nav-link"}>
                    <i className="fas fa-home" /> Assignment Setup
                  </Link>
                </li>

              </ul>
            </div>
          </span>
        </div>
      </nav>
    </React.Fragment >
  )

}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(Sidebars);