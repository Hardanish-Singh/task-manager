import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/types';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import LoadingIcon from './LoadingIcon';

const ViewTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.log('Error fetching tasks', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <p>Error fetching tasks, please refresh the page and retry</p>;
  }

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <button
          type="submit"
          className="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => navigate('/tasks')}
        >
          Create Task
        </button>
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
