import React, { useState, useEffect } from 'react';
import CRUDTable, { Fields, Field, CreateForm, UpdateForm, DeleteForm } from 'react-crud-table';
import './DynamicCRUDTable.css';

const DynamicCRUDTable = ({ tableName, columns, fetchData, onAdd, onUpdate, onDelete, uniqueKey, errorMessage }) => {
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
      item[uniqueKey] === updatedData[uniqueKey] ? { ...item, ...updatedData } : item
    );
    setData(newData);
  };

  const handleDelete = async (deletedItem) => {
    await onDelete(deletedItem);
    const newData = data.filter((item) => item[uniqueKey] !== deletedItem[uniqueKey]);
    setData(newData);
  };

  return (
    <div>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <CRUDTable caption={tableName} fetchItems={() => Promise.resolve(data)}>
      <Fields>{renderFields()}</Fields>

      <CreateForm
        title={`Add an Entry`}
        trigger={`Add ${tableName}`}
        onSubmit={handleAdd}
        submitText="Add"
      />

      <UpdateForm
        title={`Update Entry`}
        trigger={`Update`}
        onSubmit={handleUpdate}
        submitText="Update"
      />

      <DeleteForm
        title={`Delete Entry`}
        message={`Are you sure you want to delete this entry?`}
        trigger={`Delete`}
        onSubmit={handleDelete}
        submitText="Delete"
      />

    </CRUDTable>
    </div>
  );
};

export default DynamicCRUDTable;
