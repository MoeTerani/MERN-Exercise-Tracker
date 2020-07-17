import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

interface Props {}

const CreateExercise = (props: Props) => {
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState<Array<string>>([]);

  useEffect(() => {
    setUsers([...users, 'Moe']);
    setUserName('Moe');
    return () => {
      console.log('CreateExercise Unmounted successfully');
    };
  }, [userName]);

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  const onChangeDuration = (e: any) => {
    setDuration(e.target.value);
  };
  const onChangeDate = (date: any) => {
    setDate(date);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();

    const exercise = {
      userName,
      description,
      duration,
      date,
    };

    console.log(exercise);

    //@ts-ignore-start
    window.location = '/';
    //@ts-ignore-end
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            // ref='userInput'
            required
            className='form-control'
            value={userName}
            onChange={onChangeUserName}
          >
            {users.map((user, i) => {
              return (
                <option key={i} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            required
            className='form-control'
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className='form-group'>
          <label>Duration (in minutes): </label>
          <input
            type='text'
            className='form-control'
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create Exercise Log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
