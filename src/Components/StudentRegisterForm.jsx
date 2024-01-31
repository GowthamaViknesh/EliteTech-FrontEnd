import React, { useContext } from 'react';
import { studentContext } from '../Context/context';

const StudentRegisterForm = () => {
  const {
    handleRegister,
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
  } = useContext(studentContext);

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 left-content'>
            <h4 className='text-center mt-5'>Welcome to Elite Tech Park</h4>
            <p className='text-center text-2'>
              Register the form to qualify for our elite tech park program.
            </p>
          </div>
          <div className='col-md-6 second-content'>
            <h4 className='text-center mt-5 '>Student Register Form</h4>
            <form className='form-home mt-4'>
              <div className='mb-3'>
                <label className='label-text mb-2'>Name</label>
                <input
                  type='text'
                  value={name}
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
                <label className='label-text mb-2 mt-2'>Email</label>
                <input
                  type='email'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className='label-text mb-2 mt-2'>Phone_No</label>
                <input
                  type='text'
                  value={phone}
                  className='form-control'
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label className='label-text mb-2 mt-2'>Address</label>
                <input
                  type='text'
                  value={address}
                  className='form-control'
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label className='label-text mb-2 mt-2'>Percentage</label>
                <input
                  type='text'
                  value={percentage}
                  className='form-control'
                  onChange={(e) => setPercentage(e.target.value)}
                />
                <div className='mb-3'>
                  <label className='label-text mb-2 mt-3'>
                    Above 90% is the top Class
                  </label>
                  <div className='d-flex align-items-center'>
                    <input
                      type='radio'
                      checked={topClass}
                      onChange={(e) => setTopClass(e.target.checked)}
                    />
                    <label className='label-text mb-2 mt-3 mx-2 mb-3'>
                      Top Class
                    </label>
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleRegister}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegisterForm;
