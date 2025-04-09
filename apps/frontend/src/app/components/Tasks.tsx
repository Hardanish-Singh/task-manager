import DeleteIcon from './DeleteIcon';
import EditIcon from './EditIcon';

const Tasks = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <button
          type="submit"
          className="text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {}}
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="overflow-y-auto max-h-[70vh] w-full">
          <table className="min-w-full table-auto border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Edit task</th>
                <th className="border px-4 py-2">Delete task</th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 100 }, (_, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">Title</td>
                    <td className="border px-4 py-2">Description</td>
                    <td className="border px-4 py-2">Open</td>
                    <td className="border px-4 py-2">Date</td>
                    <td className="border px-4 py-2">
                      <EditIcon />
                    </td>
                    <td className="border px-4 py-2">
                      <DeleteIcon />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tasks;
