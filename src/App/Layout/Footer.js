import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020 <div className="font-weight-bold ml-1 footerText">Canyon Technologies</div>
            </div>
          </div>
        </div>
      </footer>

    )
  }
}
