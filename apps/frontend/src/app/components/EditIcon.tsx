import { useNavigate } from 'react-router-dom';

const EditIcon = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <svg
        className="text-themeColor-500 w-5 h-5 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => navigate(`/tasks/${id}`)}
        data-testid="edit-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </div>
  );
};

export default EditIcon;
