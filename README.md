// const handleShowDetails = async () => {
// try {
// await axios.get('http://localhost:4000/api/studentDetail').then((res) => {
// const isTopClass = percentage > 90;
// setDetails([
// ...details,
// { name, email, phone, address, percentage, topClass: isTopClass },
// ]);
// toast.success('Here are the details', {
// icon: '✨',
// style: {
// borderRadius: '10px',
// background: '#333',
// color: '#fff',
// },
// });
// });
// } catch (error) {
// console.log(`Error: ${error}`);
// toast.error('Something went Wrong!', {
// icon: '⚠️',
// style: {
// borderRadius: '10px',
// background: '#333',
// color: '#fff',
// },
// });
// }
// };

useEffect(() => {
const fetchStudentDetails = async () => {
try {
if (selectedStudent) {
const response = await axios.get(
`http://localhost:4000/api/studentDetails/${selectedStudent}`
);

          if (response.data.status) {
            const { email, phone, address, percentage } = response.data.data;
            setSelectedStudentDetails({ email, phone, address, percentage });
          } else {
            console.error(
              'Error fetching student details:',
              response.data.message
            );
          }
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();

}, [selectedStudent]);

const handleSubmit = async (e) => {
e.preventDefault();

    try {
      if (selectedStudent) {
        const response = await axios.put(
          `http://localhost:4000/api/studentDetails/${selectedStudent}`,
          {
            email,
            phone,
            address,
            percentage,
          }
        );

        if (response.data.status) {
          console.log(
            'Student details updated successfully:',
            response.data.message
          );
          setSelectedStudent('');
          setSelectedStudentDetails(null);
        } else {
          console.error(
            'Error updating student details:',
            response.data.message
          );
        }
      } else {
        const response = await axios.post(
          'http://localhost:4000/api/selectedStudent',
          {
            name: selectedStudent,
            email,
            phone,
            address,
            percentage,
          }
        );

        if (response.data.status) {
          console.log(
            'Student details created successfully:',
            response.data.message
          );
          setSelectedStudent('');
          setSelectedStudentDetails(null);
        } else {
          console.error(
            'Error creating student details:',
            response.data.message
          );
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }

};

// <div className='container' style={{ marginTop: '100px' }}>
// <div className='row'>
// <div className='col-md-6'>
// <h2 className='mb-4'>Selected Student Form</h2>
// <form onSubmit={''}>
// <div className='mb-3'>
// <label className='form-label'>Student Name:</label>
// <select
// style={{ width: '400px', borderRadius: '1px solid black' }}
// className='form-select'
// value={selectedStudent}
// onChange={(e) => handleStudentSelect(e.target.value)}
// >
// <option value=''>Select a student</option>
// {studentNames.map((name) => (
// <option key={name._id} value={name._id}>
// {name.name}
// </option>
// ))}
// </select>
// </div>
// <div className='mb-3'>
// <label className='form-label'>Email:</label>
// <input
// type='text'
// className='form-control'
// value={email}
// style={{ width: '400px', borderRadius: '1px solid black' }}
// onChange={(e) => setEmail(e.target.value)}
// />
// </div>
// <div className='mb-3'>
// <label className='form-label'>Phone:</label>
// <input
// type='text'
// style={{ width: '400px' }}
// className='form-control'
// value={phone}
// onChange={(e) => setPhone(e.target.value)}
// />
// </div>
// <div className='mb-3'>
// <label className='form-label'>Address:</label>
// <input
// type='text'
// style={{ width: '400px' }}
// className='form-control'
// value={address}
// onChange={(e) => setAddress(e.target.value)}
// />
// </div>
// <div className='mb-3'>
// <label className='form-label'>Percentage:</label>
// <input
// type='text'
// style={{ width: '400px' }}
// className='form-control'
// value={percentage}
// onChange={(e) => setPercentage(e.target.value)}
// />
// </div>
// <button type='submit' className='btn btn-primary'>
// Create Record
// </button>
// </form>
// </div>
// <div className='col-md-6 '>
// <div className='table-content text-center'>
// <h3>Selected Student Details</h3>
// {selectedStudentDetails ? (
// <table className='table table-bordered table-hover custom-table '>
// <thead className='text-start table-dark'>
// <tr>
// <th>Email</th>
// <th>Phone</th>
// <th>Address</th>
// <th>Percentage</th>
// <th>Edit</th>
// <th>Delete</th>
// </tr>
// </thead>
// <tbody>
// <tr className='text-start'>
// <td>{selectedStudentDetails.email}</td>
// <td>{selectedStudentDetails.phone}</td>
// <td>{selectedStudentDetails.address}</td>
// <td>{selectedStudentDetails.percentage}</td>
// <td>
// <FontAwesomeIcon icon={faEdit} />
// </td>
// <td>
// <FontAwesomeIcon icon={faTrash} color='red' />
// </td>
// </tr>
// </tbody>
// </table>
// ) : (
// <>
// <p>No Records to Show</p>
// <h5>Create a new Record</h5>
// </>
// )}
// </div>
// </div>
// </div>
// </div>
