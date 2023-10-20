// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EmployeeTable = ({ employees, onDelete, onEdit }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Surname</th>
//           <th>Position</th>
//           <th>Profile Picture</th>
//           <th>Email</th>
//           <th>Phone</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {employees.map(employee => (
//           <tr key={employee.id}>
//             <td>{employee.id}</td>
//             <td>{employee.name}</td>
//             <td>{employee.surname}</td>
//             <td>{employee.position}</td>
//             <td>
//               <img src={employee.profilePicture} alt="Profile" />
//             </td>
//             <td>{employee.email}</td>
//             <td>{employee.phone}</td>
//             <td>
//               <button onClick={() => onEdit(employee)}>Edit</button>
//               <button onClick={() => onDelete(employee.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const EmployeeForm = ({ onSubmit, onEdit, editedEmployee }) => {
//   const [employee, setEmployee] = useState({
//     id: '',
//     name: '',
//     surname: '',
//     position: '',
//     profilePicture: '',
//     email: '',
//     phone: '',
//     ...editedEmployee
//   });

//   useEffect(() => {
//     if(editedEmployee) {
//       setEmployee({...editedEmployee})
//     }

//   }, [editedEmployee])

//   useEffect(()=> {
//     axios.get('')
//     .then(res => setEmployee(res.data))
//     .catch(err => console.log(err));
//   }, [])

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setEmployee(prevEmployee => ({ ...prevEmployee, [name]: value }));
//   };

//   const handleFileChange = event => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setEmployee(prevEmployee => ({ ...prevEmployee, profilePicture: reader.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (editedEmployee) {
//       onEdit(employee);
//     } else {
//       onSubmit(employee);
//     }
//     setEmployee({
//       id: '',
//       name: '',
//       surname: '',
//       position: '',
//       profilePicture: '',
//       email: '',
//       phone: ''
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         ID:
//         <input type="text" name="id" value={employee.id} onChange={handleInputChange} />
//       </label>
//       <label>
//         Name:
//         <input type="text" name="name" value={employee.name} onChange={handleInputChange} />
//       </label>
//       <label>
//         Surname:
//         <input type="text" name="surname" value={employee.surname} onChange={handleInputChange} />
//       </label>
//       <label>
//         Position:
//         <input type="text" name="position" value={employee.position} onChange={handleInputChange} />
//       </label>
//       <label>
//         Profile Picture:
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         {employee.profilePicture && (
//           <img src={employee.profilePicture} alt="Profile" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
//         )}
//       </label>
//       <label>
//         Email:
//         <input type="email" name="email" value={employee.email} onChange={handleInputChange} />
//       </label>
//       <label>
//         Phone:
//         <input type="text" name="phone" value={employee.phone} onChange={handleInputChange} />
//       </label>
//       <button type="submit">{editedEmployee ? 'Update Employee' : 'Add Employee'}</button>
//     </form>
//   );
// };

// const Employee = () => {
//   const [employees, setEmployees] = useState([]);
//   const [editedEmployee, setEditedEmployee] = useState(null);
//   const [searchId, setSearchId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);

//   const handleSubmit = employee => {
//     setEmployees(prevEmployees => [...prevEmployees, employee]);
//   };

//   const handleDelete = id => {
//     setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
//   };

//   const handleEdit = employee => {
//     setEditedEmployee(employee);
//   };

//   const handleUpdate = updatedEmployee => {
//     setEmployees(prevEmployees =>
//       prevEmployees.map(employee => (employee.id === updatedEmployee.id ? updatedEmployee : employee))
//     );
//     setEditedEmployee(null);
//   };

//   const handleSearch = () => {
//     const result = employees.find(employee => employee.id === searchId);
//     setSearchResult(result);
//   };

//   return (
//     <div className="Employee">
//       <h1>Employee Management System</h1>
//       <EmployeeForm onSubmit={handleSubmit} onEdit={handleUpdate} editedEmployee={editedEmployee} />
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchId}
//           onChange={e => setSearchId(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {searchResult && (
//         <div>
//           <h2>Search Result</h2>
//           <EmployeeTable employees={[searchResult]} onDelete={handleDelete} onEdit={handleEdit} />
//         </div>
//       )}
//       <h2>All Employees</h2>
//       <EmployeeTable employees={employees} onDelete={handleDelete} onEdit={handleEdit} />
//     </div>
//   );
// };

// export default Employee;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Employee() {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try{
        await axios.delete('http://localhost:8081/employee/' + id )
        window.location.reload()
    }catch(err){
        console.log(err);
    }
  }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add +</Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Position</th>
              <th>Profile Picture</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((data, i) => (
              <tr key={i}>
                <td>{data.ID}</td>
                <td>{data.Name}</td>
                <td>{data.Surname}</td>
                <td>{data.Position}</td>
                <td>
                  <img src={data.ProfilePicture} alt="Profile" />
                </td>
                <td>{data.Email}</td>
                <td>{data.Phone}</td>
                <td>
                  <Link to='/update/:ID' className="btn btn-primary" >Edit</Link>
                  <button className="btn btn-danger ms-2" onClick={ e => handleDelete(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
