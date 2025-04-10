import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status, Task } from '../types/types';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import LoadingIcon from './LoadingIcon';

const ViewTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const fetchTasks = () => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tasks?status=${status}`
        );
        setTasks(response.data);
      } catch (error) {
        console.log('Error fetching tasks', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [status]);

  if (error) {
    return <p>Error fetching tasks, please refresh the page and retry</p>;
  }

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-3 text-center"
          onClick={() => navigate('/tasks')}
        >
          Create Task
        </button>
        <div className="flex items-center">
          <select
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"
            onChange={(event) => {
              setStatus(event?.target.value);
            }}
            value={status}
          >
            <option value="" disabled>
              Choose status
            </option>
            <option value="">All</option>
            <option value={Status.OPEN}>Open</option>
            <option value={Status.CLOSED}>Closed</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        {tasks.length > 0 ? (
          <div className="overflow-y-auto max-h-[70vh] w-full">
            <table className="min-w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th className="border px-4 py-2 text-left">Title</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Created At</th>
                  <th className="border px-4 py-2">Edit task</th>
                  <th className="border px-4 py-2">Delete task</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task: Task) => (
                  <tr key={task.id}>
                    <td
                      className="border px-4 py-2 cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/tasks/${task.id}`)}
                    >
                      {task.title}
                    </td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">{task.status}</td>
                    <td className="border px-4 py-2">
                      {new Date(task.createdAt!).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-blue-500">
                      <EditIcon id={task.id!} />
                    </td>
                    <td className="border px-4 py-2 text-red-700">
                      <DeleteIcon
                        id={task.id!}
                        title={task.title}
                        updateTasks={() => {
                          const updatedTasks = tasks.filter(
                            (t) => t.id !== task.id
                          );
                          setTasks(updatedTasks);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Tasks available</p>
        )}
      </div>
    </>
  );
};

export default ViewTasks;
