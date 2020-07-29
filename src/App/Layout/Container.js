import React from 'react';


const Container = ({ children }) => {

  return (
    <React.Fragment>
      <div className="header bg-blue-clr pb-8 pt-5 pt-md-8">
        <div className="container-fluid">
          <div className="header-body">
          </div>
        </div>
      </div>
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-12">
            <div className="card bg-secondary shadow ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}

export default Container;