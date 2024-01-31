import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { studentContext } from '../Context/context';

const SelectedStudentForm = () => {
  const {
    handleSave,
    handleCancelEdit,
    handleDelete,
    handleSlectedEdit,
    handleStudentSelect,
    selectedStudentDetails,
    studentNames,
    selectedStudent,
    isEditMode,
    editedValues,
    setEditedValues,
    name,
    email,
    phone,
    address,
    percentage,
    setName,
    setAddress,
    setPhone,
    setPercentage,
    setEmail,
    topClass,
    setTopClass,
    handleRegister,
  } = useContext(studentContext);

  return (
    <div className='container' style={{ marginTop: '100px' }}>
      <div className='row'>
        <div className='col-md-6'>
          <h2 className='mb-4'>Selected Student Form</h2>
          <h6 className='mb-4'> Percentage 70 to 90 students displayed here</h6>
          <form onSubmit={''}>
            <div className='mb-3'>
              <label className='form-label'>Student Name:</label>
              <select
                style={{ width: '400px', borderRadius: '1px solid black' }}
                className='form-select'
                value={selectedStudent}
                onChange={(e) => handleStudentSelect(e.target.value)}
              >
                <option value=''>Select a student</option>
                {studentNames.map((name) => (
                  <option key={name._id} value={name._id}>
                    {name.name}
                  </option>
                ))}
              </select>
            </div>
            {isEditMode ? (
              <>
                <div className='mb-3'>
                  <label className='form-label'>Email:</label>
                  <input
                    type='text'
                    className='form-control'
                    value={editedValues.email}
                    style={{ width: '400px', borderRadius: '1px solid black' }}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone:</label>
                  <input
                    type='text'
                    style={{ width: '400px' }}
                    className='form-control'
                    value={editedValues.phone}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Address:</label>
                  <input
                    type='text'
                    style={{ width: '400px' }}
                    className='form-control'
                    value={editedValues.address}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Percentage:</label>
                  <input
                    type='text'
                    style={{ width: '400px' }}
                    className='form-control'
                    value={editedValues.percentage}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        percentage: e.target.value,
                      })
                    }
                  />
                </div>
              </>
            ) : null}
            <button
              type='button'
              className='btn btn-primary'
              onClick={() =>
                isEditMode
                  ? handleSave(selectedStudent)
                  : handleSlectedEdit(selectedStudent)
              }
            >
              {isEditMode ? 'Save Changes' : 'Edit Record'}
            </button>
            {isEditMode && (
              <button
                type='button'
                className='btn btn-danger ml-2 mx-4'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
          <h6 className='mt-5 mb-4'>(OR)</h6>
          <p>
            If the name is not shown create a <span>New Record</span>{' '}
          </p>
          <div style={{ marginTop: '40px' }}>
            <h2 className='mb-4'>Create a New Record</h2>
            <button
              type='button'
              class='btn btn-success'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
            >
              Create New Record
            </button>
            <div
              className='modal fade'
              id='exampleModal'
              tabindex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1 className='modal-title fs-5' id='exampleModalLabel'>
                      Enter the Details
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    ></button>
                  </div>
                  <div className='modal-body'>
                    <div className='row'>
                      <label className='label-text mx-2 mb-2'>Name</label>
                      <input
                        type='text'
                        value={name}
                        className='mx-4'
                        style={{ width: '320px', borderRadius: '5px' }}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label className='label-text mb-2 mx-2 mt-3'>Email</label>
                      <input
                        type='email'
                        value={email}
                        className='mx-4'
                        style={{ width: '320px', borderRadius: '5px' }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className='label-text mb-2 mx-2 mt-3'>
                        Phone_No
                      </label>
                      <input
                        type='text'
                        value={phone}
                        className='mx-4'
                        style={{ width: '320px', borderRadius: '5px' }}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <label className='label-text mb-2 mx-2 mt-3'>
                        Address
                      </label>
                      <input
                        type='text'
                        value={address}
                        className='mx-4'
                        style={{ width: '320px', borderRadius: '5px' }}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <label className='label-text mb-2 mx-2 mt-3'>
                        Percentage
                      </label>
                      <input
                        type='text'
                        value={percentage}
                        className='mx-4'
                        style={{ width: '320px', borderRadius: '5px' }}
                        onChange={(e) => setPercentage(e.target.value)}
                      />
                      <div className='mb-3'>
                        <label className='label-text mb-2 mx-2 mt-3'>
                          Above 90% is the top Class
                        </label>
                        <div className='d-flex align-items-center'>
                          <input
                            type='radio'
                            checked={topClass}
                            className='mx-3'
                            onChange={(e) => setTopClass(e.target.checked)}
                          />
                          <label className='label-text mt-3 mb-3'>
                            Top Class
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='modal-footer'>
                    <button
                      type='button'
                      class='btn btn-danger'
                      data-bs-dismiss='modal'
                    >
                      Close
                    </button>
                    <button
                      type='button'
                      onClick={handleRegister}
                      class='btn btn-primary'
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='table-content text-center'>
            <h3>Selected Student Details</h3>
            {selectedStudentDetails ? (
              <table className='table table-bordered table-hover custom-table'>
                <thead className='text-start table-dark'>
                  <tr>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Percentage</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-start'>
                    {isEditMode ? (
                      <>
                        <td>{editedValues.email}</td>
                        <td>{editedValues.phone}</td>
                        <td>{editedValues.address}</td>
                        <td>{editedValues.percentage}</td>
                      </>
                    ) : (
                      <>
                        <td>{selectedStudentDetails.email}</td>
                        <td>{selectedStudentDetails.phone}</td>
                        <td>{selectedStudentDetails.address}</td>
                        <td>{selectedStudentDetails.percentage}</td>
                      </>
                    )}
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => handleSlectedEdit(selectedStudent)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        color='red'
                        onClick={() => handleDelete(selectedStudent)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <>
                <p>No Records to Show</p>
                <h5>Create a new Record</h5>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedStudentForm;
