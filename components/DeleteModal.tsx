import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  text: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-100 p-4 shadow-md rounded-md z-10">
            <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
            <p className="mb-4">{text}</p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={onClose}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={onConfirm}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
