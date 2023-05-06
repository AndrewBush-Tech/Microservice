import React, { useState, useEffect } from 'react';

function Page2() {
  const [entries, setEntries] = useState([
    { id: 1, title: 'Meeting with client', date: '2023-05-10', time: '14:00' },
    { id: 2, title: 'Team stand-up', date: '2023-05-11', time: '10:00' },
    { id: 3, title: 'Presentation rehearsal', date: '2023-05-12', time: '13:30' },
    { id: 4, title: 'Product launch', date: '2023-05-15', time: '09:00' }
  ]);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const filteredEntries = entries.filter(entry => entry.id !== id);
      setEntries(filteredEntries);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: entries.length + 1,
      title,
      date,
      time
    };
    setEntries([...entries, newEntry]);
    setTitle('');
    setDate('');
    setTime('');
  };

  useEffect(() => {
    const result = window.confirm('Do you want a demo on the new features?');
    if (result) {
      window.location.href = '/page3';
    }
  }, []);

  return (
    <div>
      <h1>Calendar Agenda</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
              <td>{entry.title}</td>
              <td><button onClick={() => handleDelete(entry.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <label htmlFor="time">Time:</label>
        <input type="time" id="time" value={time} onChange={(event) => setTime(event.target.value)} />
        <button type="submit">Add Entry</button>
      </form>
      <p>_</p>
      <p>_</p>
    </div>
  );
}

export default Page2;

