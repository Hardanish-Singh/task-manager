import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialTask, intialToast } from '../constants';
import { Status, Task } from '../types/types';
import LoadingIcon from './LoadingIcon';
import Toast from './Toast';

const Tasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Task>(initialTask);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(intialToast);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/api/tasks/${id}`
          );
          setData(response.data);
        } catch (error) {
          console.log('Error fetching task', error);
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setData(initialTask);
    }
  }, [id]);

  if (error) {
    return <p>Error fetching task, please refresh the page and retry</p>;
  }

  if (loading) {
    return <LoadingIcon />;
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (id) {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/tasks/${data.id}`,
          data
        );
        if (response.status === 200) {
          setToast({
            message: response.data.message,
            type: 'success',
            show: true,
          });
        }
      } catch (error) {
        console.error('Error updating task', error);
        setToast({
          message: 'Error updating task',
          type: 'error',
          show: true,
        });
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/tasks',
          data
        );
        if (response.status === 201) {
          setToast({
            message: response.data.message,
            type: 'success',
            show: true,
          });
        }
      } catch (error) {
        console.error('Error creating task:', error);
        setToast({
          message: 'Error creating task',
          type: 'error',
          show: true,
        });
      }
    }
  };

  return (
    <>
      <div className="flex items-center mt-8">
        <label htmlFor="title" className="block mb-2 text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Enter Title"
          value={data.title}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2 ml-16"
        />
      </div>
      <div className="flex items-center mt-8">
        <label htmlFor="description" className="block mb-2 text-sm font-medium">
          Description
        </label>
        <textarea
          name="description"
          onChange={handleChange}
          value={data.description}
          rows={6}
          className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2 ml-4"
          placeholder="Write your description here..."
        ></textarea>
      </div>

      {id && (
        <div className="flex items-center mt-8">
          <label htmlFor="status" className="block mb-2 text-sm font-medium">
            Status
          </label>
          <select
            name="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-12"
            onChange={handleChange}
            value={data.status}
          >
            <option value="" disabled>
              Choose status
            </option>
            <option value={Status.OPEN}>Open</option>
            <option value={Status.CLOSED}>Closed</option>
          </select>
        </div>
      )}

      <div className="flex items-center mt-8">
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-white"
        >
          Status
        </label>
        <div className="w-1/2 ml-12 flex justify-center">
          <button
            type="submit"
            disabled={data.title.length === 0 || data.description.length === 0}
            className="text-white bg-blue-700 disabled:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => {
            setToast({ ...toast, show: false });
            if (toast.type !== 'error') navigate('/');
          }}
        />
      )}
    </>
  );
};

export default Tasks;
