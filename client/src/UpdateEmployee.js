import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [profilepic, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const {id} = useParams();
  const navigate = useNavigate()

  function handleUpdate(event) {
    event.preventDefault();
    axios.put('http://localhost:8081/update' +id, { name, surname, position, profilepic, email, phone})
    .then(res => {
      console.log(res);
      navigate('/');
    }).catch(err => console.log(err));
  }
  return (
    <div className='d-flex vh-500 bg-primary justify-content-center align-items-center'>
      <div className='w-60 rounded p-3'>
        <form onSubmit={handleUpdate}>
          <h2>Update</h2>
          <div className='mb-2'>
          <label htmlFor=''>ID</label>
          <input type='number' placeholder='Enter Id'  />
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
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateEmployee


