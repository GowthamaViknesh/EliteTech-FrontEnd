import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const studentContext = createContext({});

const Context = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [percentage, setPercentage] = useState('');
  const [details, setDetails] = useState([]);
  const [topClass, setTopClass] = useState(false);
  const [studentNames, setStudentNames] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    email: '',
    phone: '',
    address: '',
    percentage: '',
  });

  const handleSetTopClass = (value) => {
    setTopClass(value);
  };

  const handleShowDetails = async () => {
    try {
      await axios
        .get('https://elite-nwwo.onrender.com/api/studentDetail')
        .then((res) => {
          const serverDetails = res.data.data;

          // Assuming the server response has an array of student details
          const updatedDetails = serverDetails.map((student) => ({
            ...student,
            topClass: student.percentage > 90,
          }));

          setDetails(updatedDetails);

          toast.success('Welcome to Elite Tech Park Program', {
            icon: '✨',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        });
    } catch (error) {
      console.log(`Error: ${error}`);
      toast.error('Something went Wrong!', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    handleShowDetails();
  }, []);

  const handleRegister = async () => {
    try {
      if (phone.length !== 10) {
        toast('Please enter a valid 10-digit phone number', {
          icon: '📱',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setPhone('');
        return;
      }
      await axios
        .post('https://elite-nwwo.onrender.com/api/studentRegister', {
          name,
          email,
          phone,
          address,
          percentage,
          topClass,
        })
        .then((res) => {
          if (res.data.status === true) {
            const isTopClass = percentage > 90;
            handleSetTopClass(isTopClass);
            setName('');
            setAddress('');
            setPercentage('');
            setEmail('');
            setPhone('');
            setTopClass('');
            toast.success(res.data.message, {
              icon: '📱',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
          } else {
            toast.error(res.data.message, {
              icon: '📱',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
          }
        });
    } catch (error) {
      console.log(`Error during registration:: ${error}`);
      toast.error('Something went Wrong!', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleEdit = async (id, updatedDetails) => {
    try {
      const response = await axios.put(
        `https://elite-nwwo.onrender.com/api/studentEdit/${id}`,
        updatedDetails
      );
      if (response.data.status === true) {
        const updatedStudent = response.data.updatedStudent;
        setDetails((prevDetails) => {
          return prevDetails.map((student) =>
            student._id === updatedStudent._id ? updatedStudent : student
          );
        });

        toast.success(response.data.message, {
          icon: '📱',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        window.location.reload();
      } else {
        toast.error(response.data.message, {
          icon: '📱',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error(`Error during student update:${error}`);
      toast.error('Error during student update:', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    const fetchStudentNames = async () => {
      try {
        const response = await axios.get(
          'https://elite-nwwo.onrender.com/api/lookup'
        );
        console.log(response);
        if (response.data.status) {
          setStudentNames(response.data.data);
        } else {
          console.error(
            `Error fetching student names: ${response.data.message}`
          );
          toast.error('Error fetching student names:', {
            icon: '⚠️',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }
      } catch (error) {
        console.error(`Error fetching student names: ${error}`);
        toast.error('Error fetching student names:', {
          icon: '⚠️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    };

    fetchStudentNames();
  }, []);

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(
        `https://elite-nwwo.onrender.com/api/student/${studentId}`
      );
      if (response.data.status) {
        const { email, phone, address, percentage } = response.data.data;
        setSelectedStudentDetails({ email, phone, address, percentage });
      } else {
        console.error(
          `Error fetching student details: ${response.data.message}`
        );
        toast.error(`Error fetching student names:${response.data.message}`, {
          icon: '⚠️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      console.error(`Error fetching student details: ${error}`);
      toast.error(`Error fetching student names`, {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudent(studentId);
    fetchStudentDetails(studentId);
    setIsEditMode(false);
  };

  const handleSlectedEdit = (id) => {
    if (selectedStudentDetails) {
      setIsEditMode(true);
      setEditedValues({
        email: selectedStudentDetails.email,
        phone: selectedStudentDetails.phone,
        address: selectedStudentDetails.address,
        percentage: selectedStudentDetails.percentage,
      });
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `https://elite-nwwo.onrender.com/api/studentUpdate/${id}`,
        editedValues
      );
      setIsEditMode(false);
      toast.success('Record updated successfully!', {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#28a745',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error(`Error updating details: ${error}`);
      toast.error('Error updating record', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedValues({
      email: selectedStudentDetails.email,
      phone: selectedStudentDetails.phone,
      address: selectedStudentDetails.address,
      percentage: selectedStudentDetails.percentage,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://elite-nwwo.onrender.com/api/selectedStudentDelete/${id}`
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
    <studentContext.Provider
      value={{
        handleSave,
        handleCancelEdit,
        handleDelete,
        handleSlectedEdit,
        handleStudentSelect,
        fetchStudentDetails,
        studentNames,
        selectedStudent,
        isEditMode,
        editedValues,
        setEditedValues,
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
        handleShowDetails,
        details,
        topClass,
        setTopClass,
        handleEdit,
        selectedStudentDetails,
        setSelectedStudentDetails,
        isEditMode,
        setIsEditMode,
      }}
    >
      {children}
    </studentContext.Provider>
  );
};

export default Context;
