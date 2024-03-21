import React, { useState, useEffect } from 'react';
import CRUDTable, { Fields, Field, CreateForm, UpdateForm, DeleteForm } from 'react-crud-table';
import '../Table.css'; 

const DynamicCRUDTable = ({ tableName, columns, fetchData, onAdd, onUpdate, onDelete }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then((result) => setData(result));
  }, [fetchData]);

  const renderFields = () => {
    return columns.map((column) => (
      <Field
        key={column.name}
        name={column.name}
        label={column.label}
        placeholder={column.placeholder || column.label}
        type={column.type || 'text'} 
        defaultValue={column.defaultValue || ''}
        {...column.additionalProps}
      />
    ));
  };

  const handleAdd = async (newItem) => {
    const newData = await onAdd(newItem);
    setData([...data, newData]);
  };

  const handleUpdate = async (updatedItem) => {
    const updatedData = await onUpdate(updatedItem);
    const newData = data.map((item) =>
      item.id === updatedData.id ? { ...item, ...updatedData } : item
    );
    setData(newData);
  };

  const handleDelete = async (deletedItem) => {
    await onDelete(deletedItem);
    const newData = data.filter((item) => item.id !== deletedItem.id);
    setData(newData);
  };

  return (
    <CRUDTable caption={tableName} fetchItems={() => Promise.resolve(data)}>
      <Fields>{renderFields()}</Fields>

      {/* Create Form */}
      <CreateForm
        title={`Add an entry`}
        //message={`Add a new entry`}
        trigger={`Add ${tableName}`}
        onSubmit={handleAdd}
        submitText="Add"
      />

      {/* Update Form */}
      <UpdateForm
        title={`Update Entry`}
        //message={`Update entry`}
        trigger={`Update`}
        onSubmit={handleUpdate}
        submitText="Update"
      />

      {/* Delete Form */}
      <DeleteForm
        title={`Delete`}
        message={`Are you sure you want to delete this entry?`}
        trigger={`Delete`}
        onSubmit={handleDelete}
        submitText="Delete"
      />
    </CRUDTable>
  );
};

export default DynamicCRUDTable;
