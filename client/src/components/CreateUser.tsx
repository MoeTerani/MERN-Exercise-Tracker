import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {}

const CreateUser = (props: Props) => {
  const [userName, setUserName] = useState('');

  // useEffect(() => {
  //   //some code here
  //   return () => {
  //     console.log('CreateExercise Unmounted successfully');
  //   };
  // }, []);

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const user = {
      userName,
    };

    console.log(user);

    axios
      .post('http://localhost:5000/users', user)
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            type='text'
            required
            className='form-control'
            value={userName}
            onChange={onChangeUserName}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
