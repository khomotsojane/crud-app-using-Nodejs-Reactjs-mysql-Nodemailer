import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [profilepic, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8081/create', {id, name, surname, position, profilepic, email, phone})
    .then(res => {
      console.log(res);
      navigate('/');
    }).catch(err => console.log(err));
  }
  return (
    <div className='d-flex vh-500 bg-primary justify-content-center align-items-center'>
      <div className='w-60 rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Employees</h2>
          <div className='mb-2'>
          <label htmlFor=''>ID</label>
          <input type='number' placeholder='Enter Id' onChange={e => setId(e.target.value)}  />
          </div>
          <div className='mb-2'>
          <label htmlFor=''>Name</label>
          <input type='text' placeholder='Enter name' onChange={e => setName(e.target.value)} />
          </div>
          <div className='mb-2'>
          <label htmlFor=''>Surname</label>
          <input type='text' placeholder='Enter surname' onChange={e => setSurname(e.target.value)}  />
          </div>
          <div className='mb-2'>
          <label htmlFor=''>Position</label>
          <input type='text' placeholder='Enter position' onChange={e => setPosition(e.target.value)} />
          </div>
          <div className='mb-2'>
          <label htmlFor=''>Profile Picture</label>
          <input type="file" placeholder='Enter Profile Picture' onChange={e => setProfile(e.target.value)} />
          </div>
          <div className='mb-2'>
          <label htmlFor=''>Email</label>
          <input type='email' placeholder='Enter email address' onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='mb-2'>
          <label htmlFor=''>Phone</label>
          <input type='tel' placeholder='Enter phone' onChange={e => setPhone(e.target.value)} />
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateEmployee

