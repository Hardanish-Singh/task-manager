import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status, Task } from '../types/types';
import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';
import LoadingIcon from './LoadingIcon';

const ViewTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks`, {
        params: { sortBy, sortOrder, searchTerm, status },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      // Toggle sort order
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set new column and default to ascending
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, sortBy, sortOrder, searchTerm]);

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
        <>{tasks.length} Tasks</>
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
      <div className="flex justify-end mt-8">
        <input
          type="text"
          name="searchTerm"
          onChange={(event) => {
            setSearchTerm(event?.target.value);
          }}
          placeholder="Search Title, Description..."
          value={searchTerm}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/3"
        />
      </div>
      <div className="flex justify-center items-center mt-8">
        {tasks.length > 0 ? (
          <div className="overflow-y-auto max-h-[70vh] w-full">
            <table className="min-w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th
                    className="border px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    Title
                    {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="border px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort('description')}
                  >
                    Description
                    {sortBy === 'description' &&
                      (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="border px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="border px-4 py-2 text-left cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    Created At
                    {sortBy === 'createdAt' &&
                      (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="border px-4 py-2">Edit task</th>
                  <th className="border px-4 py-2">Delete task</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task: Task) => (
                  <tr key={task.id}>
                    <td className="border px-4 py-2">{task.title}</td>
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
          <p className="text-2xl">No Tasks Available</p>
        )}
      </div>
    </>
  );
};

export default ViewTasks;
