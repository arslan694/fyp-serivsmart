import React, { useState } from 'react';

const EditServiceModal = ({ service, onSave, onClose }) => {
  const [name, setName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [icon, setIcon] = useState(service.icon);
  const [banner, setBanner] = useState(service.banner);

  const handleSave = () => {
    onSave({ name, description, icon, banner });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Service</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Service Name"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
          />
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Icon"
          />
          <input
            type="text"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Banner"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;