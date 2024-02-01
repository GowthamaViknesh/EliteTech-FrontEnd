import React, { useContext, useState } from 'react';
import { studentContext } from '../Context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

const StudentDetails = () => {
  const { details, handleEdit } = useContext(studentContext);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editPercentage, setEditPercentage] = useState('');

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setEditedName(student.name);
    setEditedEmail(student.email);
    setEditedPhone(student.phone);
    setEditedAddress(student.address);
    setEditPercentage(student.percentage);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setEditedName('');
    setEditedEmail('');
    setEditedPhone('');
    setEditedAddress('');
    setEditPercentage('');
  };

  const handleSaveEdit = async () => {
    const updatedDetails = {
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      address: editedAddress,
      percentage: editPercentage,
    };
    await handleEdit(editingStudent._id, updatedDetails);
    handleCancelEdit();
    document.getElementById(`exampleModal-${editingStudent._id}`).click();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://elite-nwwo.onrender.com/api/studentDelete/${id}`
      );
      toast.success('Student deleted successfully', {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(`Error during student delete: ${error}`);
      toast.error('Error during student delete', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className='container det-container'>
      <table className='table table-sm'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone_No</th>
            <th scope='col'>Address</th>
            <th scope='col'>Percentage</th>
            <th scope='col'>TopClass</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {details.map((student, index) => (
            <tr
              key={index}
              className={student.percentage > 90 ? 'table-success' : ''}
            >
              <th scope='row'>{index + 1}</th>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>{student.percentage}</td>
              <td>{student.topClass ? 'True' : 'False'}</td>
              <td>
                <button
                  type='button'
                  class='btn '
                  data-bs-toggle='modal'
                  data-bs-target={`#exampleModal-${student._id}`}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => handleEditClick(student)}
                  />
                </button>

                <div
                  class='modal fade'
                  id={`exampleModal-${student._id}`}
                  tabindex='-1'
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div class='modal-dialog'>
                    <div class='modal-content'>
                      <div class='modal-header'>
                        <h1 class='modal-title fs-5' id='exampleModalLabel'>
                          Edit Student Details
                        </h1>
                        <button
                          type='button'
                          class='btn-close'
                          data-bs-dismiss='modal'
                          aria-label='Close'
                        ></button>
                      </div>
                      <div class='modal-body'>
                        {editingStudent && (
                          <div className='row'>
                            <label className='label-text mx-2 mb-2'>Name</label>
                            <input
                              type='text'
                              className='mx-4'
                              style={{ width: '320px' }}
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                            <br />
                            <label className='label-text mx-2 mb-2'>
                              Email:{' '}
                            </label>
                            <input
                              type='text'
                              className='mx-4'
                              style={{ width: '320px' }}
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                            />
                            <br />
                            <label className='label-text mx-2 mb-2'>
                              Phone:{' '}
                            </label>
                            <input
                              type='text'
                              className='mx-4'
                              style={{ width: '320px' }}
                              value={editedPhone}
                              onChange={(e) => setEditedPhone(e.target.value)}
                            />
                            <br />
                            <label className='label-text mx-2 mb-2'>
                              Address:{' '}
                            </label>
                            <input
                              type='text'
                              className='mx-4'
                              style={{ width: '320px' }}
                              value={editedAddress}
                              onChange={(e) => setEditedAddress(e.target.value)}
                            />
                            <br />
                            <label className='label-text mx-2 mb-2'>
                              Percentage:{' '}
                            </label>
                            <input
                              type='text'
                              className='mx-4'
                              style={{ width: '320px' }}
                              value={editPercentage}
                              onChange={(e) =>
                                setEditPercentage(e.target.value)
                              }
                            />
                          </div>
                        )}
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
                          onClick={handleSaveEdit}
                          class='btn btn-success'
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: 'red' }}
                  onClick={() => handleDelete(student._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
