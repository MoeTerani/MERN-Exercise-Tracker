import React, { useState, useEffect, ReactElement, ReactNode } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Props {
  exercise: {
    _id: string;
    userName: string;
    description: string;
    duration: number;
    date: any;
  };
  deleteExercise: (id: string) => void;
  key: string;
}

const ExerciseComponent = (props: Props) => {
  return (
    <tr>
      <td>{props.exercise.userName}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={'/edit/' + props.exercise._id}>edit</Link> |{' '}
        <a
          href='#'
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
        >
          delete
        </a>
      </td>
    </tr>
  );
};

const ExercisesList = (props: Props) => {
  const [exercises, setExercises] = useState([]);
  const [state, setState] = useState({ exercises: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const usersArray = await axios.get('http://localhost:5000/exercises/');

        setExercises(usersArray.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
    return () => {
      console.log('ExerciseList unmounted successfuly');
    };
  }, []);

  interface exerciseObject {
    _id: string;
    userName: string;
    description: string;
    duration: number;
    date: number;
    __v?: 0;
  }
  const deleteExercise = (id: string) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res));
    setExercises(
      exercises.filter((exercise: exerciseObject) => exercise._id !== id)
    );
  };

  const exerciseList = (): any => {
    return exercises.map((currentexercise: exerciseObject) => {
      return (
        <ExerciseComponent
          exercise={currentexercise}
          deleteExercise={deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
