import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutAction } from '../../Redux/login.action';

class Menu extends Component {
  state = { menu: false }

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  showMenu = e => {
    this.setState({ menu: this.state.menu ? false : true });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ menu: false });
    }
  }

  handleLogout = e => {
    this.props.logoutAction(false);
  }

  render() {
    return (
      <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div className="container-fluid">

          <div className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">{this.props.navbar}</div>

          <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div className="form-group mb-0">
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-search" /></span>
                </div>
                <input className="form-control" placeholder="Search" type="text" />
              </div>
            </div>
          </form>


          <ul className="navbar-nav align-items-center d-none d-md-flex profileBar" ref={this.setWrapperRef} onClick={this.showMenu}>
            <li className={this.state.menu ? "nav-item dropdown show" : "nav-item dropdown"}>
              <div className="nav-link pr-0" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="media align-items-center">
                  <div className="media-body ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">Nantha</span>
                  </div>
                </div>
              </div>
              <div className={this.state.menu ? "dropdown-menu dropdown-menu-arrow dropdown-menu-right show" : "dropdown-menu dropdown-menu-arrow dropdown-menu-right"}>
                <div className=" dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <div className="dropdown-item profileBar">
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </div>
                <div className="dropdown-divider" />
                <div onClick={this.handleLogout} className="dropdown-item profileBar">
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logoutAction: (logout) => dispatch(logoutAction(logout)),
});

export default connect(null, mapDispatchToProps)(Menu);