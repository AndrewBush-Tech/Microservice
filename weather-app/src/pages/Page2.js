import React, { useState, useEffect } from 'react';

function Page2() {
  const [entries, setEntries] = useState([
    { id: 1, text: 'Entry 1' },
    { id: 2, text: 'Entry 2' },
    { id: 3, text: 'Entry 3' },
    { id: 4, text: 'Entry 4' },
    { id: 5, text: 'Entry 5' },
    { id: 6, text: 'Entry 6' }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const filteredEntries = entries.filter(entry => entry.id !== id);
      setEntries(filteredEntries);
    }
  };

  useEffect(() => {
    const result = window.confirm('Do you want a demo on the new features?');
    if (result) {
      window.location.href = '/page3';
    }
  }, []);

  return (
    <div>
      <h1>Agenda</h1>
      <ul>
        {entries.map(entry => (
          <div key={entry.id}>
            {entry.text}
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Page2;
