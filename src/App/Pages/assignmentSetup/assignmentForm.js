import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

function AssignmentForm(props) {
  let token = props.user.token;
  const [form, setForm] = useState({ code: '', description: '', dueDate: new Date(), institution: '', mode: '', regoPeriod: 0, semester: 0, totalMarks: '', unicode: '', weight: '', year: '' });
  const [value, setValue] = useState({ data: [], errors: {}, modal: false, id: null });

  useEffect(() => {
    getAssignmentsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAssignmentsList = e => {
    axios.get('http://167.172.242.107:8282/iti/students/assessments', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(response => {
      if (response.status === 200) {
        setValue(value => ({ ...value, data: response.data }));
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const dateChange = date => setForm(form => ({ ...form, dueDate: date }));

  const handleChange = e => {
    e.persist();
    setForm(form => ({ ...form, [e.target.name]: e.target.value }))
  };

  const clearHandle = e => {
    setForm({ code: '', description: '', dueDate: new Date(), institution: '', mode: '', regoPeriod: 0, semester: 0, totalMarks: '', unicode: '', weight: '', year: '' });
  }

  const handleValidation = e => {
    let errors = {};
    let formIsValid = true;

    if (!(form.code)) { formIsValid = false; errors["code"] = "Enter Code"; }
    if (!(form.institution)) { formIsValid = false; errors["institution"] = "Enter Institution"; }
    if (!(form.mode)) { formIsValid = false; errors["mode"] = "Select Mode"; }
    if (!(form.institution)) { formIsValid = false; errors["institution"] = "Enter Institution"; }
    if (!(form.semsester)) { formIsValid = false; errors["semester"] = "Select Semester"; }
    if (!(form.year)) { formIsValid = false; errors["year"] = "Enter Year"; }
    if (!(form.regoPeriod)) { formIsValid = false; errors["rego"] = "Select Rego"; }
    if (!(form.weight)) { formIsValid = false; errors["weight"] = "Enter Weight"; }
    if (!(form.totalMarks)) { formIsValid = false; errors["marks"] = "Enter Marks"; }
    if (!(form.dueDate)) { formIsValid = false; errors["due"] = "Select Due Date"; }

    setValue(value => ({ ...value, errors: errors }));
    return formIsValid;
  }

  const handleSubmit = e => {
    e.persist();
    setValue(value => ({ ...value, load: true }));
    if (handleValidation()) {
      const data = {
        code: form.code, description: form.description, dueDate: form.dueDate, institution: form.institution, mode: form.mode, regoPeriod: form.regoPeriod, semsester: form.semsester, totalMarks: form.totalMarks, unicode: form.unicode, weight: form.weight, year: form.year, branchId: 1,
      }
      axios.post('http://167.172.242.107:8282/iti/students/assessments', data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      }).then(res => {
        if (res.status === 200) {
          getAssignmentsList();
          setValue(value => ({ ...value, load: null, success: 'Created' }));
          setTimeout(() => { setValue(value => ({ ...value, success: null })); }, 4000)
        } else {
          setValue(value => ({ ...value, load: null, error: 'Failed' }));
          setTimeout(() => { setValue(value => ({ ...value, error: null })); }, 4000)
        }
      })
      setValue(value => ({ ...value, load: false }));
    } else {
      setValue(value => ({ ...value, load: false }));
    }
  }

  const deleteHandle = id => {
    axios.delete('http://167.172.242.107:8282/iti/students/assessments/' + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).then(response => {
      getAssignmentsList();
      if (response.status === 200) {
        setValue(value => ({ ...value, success: 'Record Deleted', modal: false }));
        setTimeout(() => setValue(value => ({ ...value, success: null })), 5000);
      } else {
        setValue(value => ({ ...value, error: 'Failed', modal: false }));
        setTimeout(() => setValue(value => ({ ...value, error: null })), 5000);
      }
    }).catch(error => {
      setValue(value => ({ ...value, error: 'Failed', modal: false }));
      setTimeout(() => setValue(value => ({ ...value, error: null })), 5000);
    })
  }

  return (
    <React.Fragment>
      <div className="card-header bg-transparent">
        <div className="row align-items-center">
          <div className="col">
            <h2 className="mb-1">Create New Assignment Setup</h2>
            <h6 className="text-uppercase text-muted ls-1 mb-0">Fill out below details of New Assignment Setup</h6>
          </div>
        </div>
      </div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Exam Code</label>
                <input type="number" name='code' value={form.code} onChange={handleChange} className="form-control form-control-alternative" placeholder="Enter Exam Code" />
                <span className='formError'>{value.errors["code"] ? value.errors["code"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <label className="label-style">Due Date</label>
                <DatePicker
                  className="form-control form-control-alternative"
                  onChange={dateChange}
                  name="dueDate"
                  value={form.dueDate}
                />
                <span className='formError'>{value.errors["due"] ? value.errors["due"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Select Semsester</label>
                <select name='semsester' value={form.semsester} onChange={handleChange} className="form-control form-control-alternative ">
                  <option>Select Semester</option>
                  <option value={1}>Semester 1</option>
                  <option value={2}>Semester 2</option>
                  <option value={3}>Semester 3</option>
                  <option value={4}>Semester 4</option>
                </select>
                <span className='formError'>{value.errors["semester"] ? value.errors["semester"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Select Rego Period</label>
                <select name='regoPeriod' value={form.regoPeriod} onChange={handleChange} className="form-control form-control-alternative ">
                  <option>Select Rego Period</option>
                  <option value={1}>Rego 1</option>
                  <option value={2}>Rego 2</option>
                  <option value={3}>Rego 3</option>
                  <option value={4}>Rego 4</option>
                </select>
                <span className='formError'>{value.errors["rego"] ? value.errors["rego"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Institution</label>
                <input type="number" name='institution' value={form.institution} onChange={handleChange} className="form-control form-control-alternative" placeholder="Enter Institution" />
                <span className='formError'>{value.errors["institution"] ? value.errors["institution"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Mode</label>
                <select name='mode' value={form.mode} onChange={handleChange} className="form-control form-control-alternative ">
                  <option>Select Mode</option>
                  <option value={1}>Mode 1</option>
                  <option value={2}>Mode 2</option>
                  <option value={3}>Mode 3</option>
                  <option value={4}>Mode 4</option>
                </select>
                <span className='formError'>{value.errors["mode"] ? value.errors["mode"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Total Marks</label>
                <input type="number" name='totalMarks' value={form.totalMarks} onChange={handleChange} className="form-control form-control-alternative" placeholder="Enter Total Marks" />
                <span className='formError'>{value.errors["marks"] ? value.errors["marks"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Unicode</label>
                <input type="text" name='unicode' value={form.unicode} onChange={handleChange} className="form-control form-control-alternative" placeholder="Enter Unicode" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Weight</label>
                <input type="number" name='weight' value={form.weight} onChange={handleChange} className="form-control form-control-alternative" placeholder="Enter Weight" />
                <span className='formError'>{value.errors["weight"] ? value.errors["weight"] : null}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label className="label-style">Year</label>
                <input type="number" name='year' value={form.year} onChange={handleChange} className="form-control form-control-alternative" placeholder="Enter Year" />
                <span className='formError'>{value.errors["year"] ? value.errors["year"] : null}</span>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <label className="label-style">Description</label>
                <textarea type="text" name='description' onChange={handleChange} value={form.description} className="form-control form-control-alternative" />
              </div>
            </div>
          </div>
          <div className="text-center"><span className='formError'>{Object.keys(value.errors).length > 0 ? 'Please fill all required Fields' : null}</span></div>
          <div className="row justify-content-center text-center">
            <div className="col-lg-4 col-md-8">
              <span onClick={handleSubmit} className="btn btn-primary">{value.load ? <i className="fa fa-spinner fa-spin"></i> : null}Submit </span>
              <span onClick={clearHandle} className="btn btn-danger ">Clear</span>
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 mt-3">
          <div className="table-responsive">
            <table className="table align-items-center table-flush">
              <thead className="thead-light">
                <tr>
                  <th scope="col">No:</th>
                  <th scope="col">Assignments</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {value.data.length ? value.data.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{++key}</td>
                      <td>{value.code}</td>
                      <td>{value.weight}</td>
                      <td>{value.totalMarks}</td>
                      <td>{moment(value.dueDate).format('DD/MM/YYYY')}</td>
                      <td><button className='btn btn-sm btn-danger' onClick={() => setValue(values => ({ ...values, modal: true, id: value.assessmentsId }))}>Delete</button></td>
                    </tr>
                  )
                }) :
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-3 justify-content-center">
        <div className="col-lg-3 col-md-8">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item disabled">
                <span className="page-link" tabIndex={-1}>
                  <i className="fa fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </span>
              </li>
              <li className="page-item"><span className="page-link">1</span></li>
              <li className="page-item active"><span className="page-link">2</span></li>
              <li className="page-item"><span className="page-link">3</span></li>
              <li className="page-item">
                <span className="page-link">
                  <i className="fa fa-angle-right" />
                  <span className="sr-only">Next</span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div id="myModal" className={value.modal ? "modal d-block" : "modal"} tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className={"modal-dialog modal-dialog-centered"}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Are you sure to Delete?</h5>
              <button type="button" onClick={() => setValue(value => ({ ...value, modal: false }))} className="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-footer">
              <button onClick={() => deleteHandle(value.id)} className="btn btn-danger">Delete</button>
              <button onClick={() => setValue(value => ({ ...value, modal: false }))} className="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            </div>
          </div>
        </div>
      </div>

      {(value.error || value.success) &&
        <div id="snackbar" className={value.error ? "shown danger" : "shown success"}><b> {value.error || value.success}</b></div>}

    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(AssignmentForm);