import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './modal.css';

Modal.setAppElement('#root');

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editNumber, setEditNumber] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const openModal = (index = null) => {
    setEditIndex(index);
    setIsModalOpen(true);
    if (index !== null) {
      setEditNumber(data[index]);
    } else {
      setNumber('');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNumber = () => {
    if (number.trim() !== '') {
      setData([...data, number]);
      setNumber('');
      closeModal();
    }
  };

  const handleSaveEdit = () => {
    data[editIndex] = editNumber;
    setData([...data]);
    setEditIndex(null);
    closeModal();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const draggedItem = data[sourceIndex];

    const newData = [...data];
    newData.splice(sourceIndex, 1);
    newData.splice(destinationIndex, 0, draggedItem);
    setData(newData);
  };

  return (
    <div className="px-4 py-2">
      <div className="text-end">
        <button onClick={() => openModal()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Add Number
        </button>
      </div>

      <div className="flex justify-between gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="left-droppable">
            {(provided) => (
              <div
                className="w-1/2 p-4 border-2 border-red-400 h-[400px]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="text-xl font-semibold mb-2">TODO</h1>
                {data.slice(0, 7).map((item, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border border-gray-100 p-2 mb-2 flex justify-between shadow-md"
                      >
                        {item}
                        <div>
                          <button onClick={() => openModal(index)} className="px-2  border-blue-400 text-blue-500 hover:text-blue-700">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="right-droppable">
            {(provided) => (
              <div
                className="w-1/2 p-4 border-2 border-red-400 h-[400px]"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="text-xl font-semibold mb-2">In Progress</h1>
                {data.slice(7).map((item, index) => (
                  <Draggable key={index + 7} draggableId={(index + 7).toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border border-gray-100 p-2 mb-2 flex justify-between shadow-md"
                      >
                        {item}
                        <div>
                          <button onClick={() => openModal(index + 7)} className="mr-2 text-blue-500 hover:text-blue-700">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(index + 7)} className="text-red-500 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={editIndex !== null ? 'Edit Number Modal' : 'Add Number Modal'}
        className="modal"
        overlayClassName="overlay"
      >
        <div className='p-4'>
          <h2 className="text-lg font-semibold mb-4">{editIndex !== null ? 'Edit Number' : 'Add Number'}</h2>
          <input
            type="number"
            value={editIndex !== null ? editNumber : number}
            onChange={(e) => (editIndex !== null ? setEditNumber(e.target.value) : setNumber(e.target.value))}
            placeholder="Enter a number"
            className="block w-full p-2 border rounded-md mb-4"
          />
          <div className="flex justify-end">
            <button onClick={editIndex !== null ? handleSaveEdit : handleAddNumber}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {editIndex !== null ? 'Save' : 'Add'}
            </button>
            <button onClick={closeModal} 
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;