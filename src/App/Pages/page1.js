import React from 'react'

export default function page1() {
    return (
        <React.Fragment>
            <div className="card-header bg-transparent">
                <div className="row align-items-center">
                    <div className="col">
                        <h2 className="mb-1">Page 1</h2>
                        <h6 className="text-uppercase text-muted ls-1 mb-0">Home Component Subtitle</h6>
                    </div>
                </div>
            </div>
            <div className="card-body">
                This is page 1
            </div>
        </React.Fragment>
    )
}
