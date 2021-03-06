import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';

interface Props {
  match: any;
}

const EditExercise = (props: Props) => {
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState<Array<string>>([]);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setUserName(res.data.userName);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })

      .catch(function (error) {
        console.log(error);
      });
    return () => {
      console.log('CreateExercise Unmounted successfully');
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/users').then((res) => {
      setUsers(res.data.map((user: any) => user.userName));
    });
    return () => {
      console.log('CreateExercise Unmounted successfully');
    };
  }, []);

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
    const id = props.match.params.id;

    const exercise = {
      userName,
      description,
      duration,
      date,
    };
    console.log(exercise);
    axios
      .post('http://localhost:5000/exercises/update/' + id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

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
            value='Update The Exercise'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
