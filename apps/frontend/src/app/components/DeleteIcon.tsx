import { useState } from 'react';
import ConfirmDeletion from './ConfirmDeletion';

type Props = {
  id: string;
  updateTasks: () => void;
};

const DeleteIcon = ({ id, updateTasks }: Props) => {
  const [showDeletionModal, setShowDeletionModal] = useState(false);

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
        onClick={() => {
          setShowDeletionModal(true);
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>

      {showDeletionModal && (
        <ConfirmDeletion
          id={id}
          onModalClose={(type) => {
            if (type === 'delete') updateTasks();
            setShowDeletionModal(false);
          }}
        />
      )}
    </div>
  );
};

export default DeleteIcon;
