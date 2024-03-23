import React, { useState } from 'react';
import './QueryPage.css'; 

const QueryPage = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const responseData = await response.json();
      setResponse(JSON.stringify(responseData, null, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error occurred. Please try again.');
    }
  };

  return (
    <div className="query-page-container">
      <form className="query-form" onSubmit={handleSubmit}>
        <label htmlFor="queryInput">Enter your query:</label>
        <input
          type="text"
          id="queryInput"
          value={query}
          onChange={handleInputChange}
          placeholder="Write your query here"
        />
        <button type="submit">Submit Query</button>
      </form>
      {response && (
        <div className="response-container">
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default QueryPage;
