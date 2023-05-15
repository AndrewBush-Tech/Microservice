import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../images/back-arrow.png';
import './backArrow.css';
import './calendar.css';

function Page2() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([
    { id: 1, title: 'Meeting with client', date: '2023-05-10', time: '14:00' },
    { id: 2, title: 'Team stand-up', date: '2023-05-11', time: '10:00' },
    { id: 3, title: 'Presentation rehearsal', date: '2023-05-12', time: '13:30' },
    { id: 4, title: 'Product launch', date: '2023-05-15', time: '09:00' }
  ]);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

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

  const handleEdit = (event) => {
    event.preventDefault();
    const updatedEntries = entries.map(entry => {
      if (entry.id === selectedEntry.id) {
        return {
          ...entry,
          title: selectedEntry.title,
          date: selectedEntry.date,
          time: selectedEntry.time
        };
      } else {
        return entry;
      }
    });
    setEntries(updatedEntries);
    setSelectedEntry(null);
  };

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }} className="page-container">

      <h1>Calendar Agenda</h1>
      <img
        src={backArrow}
        alt="back arrow"
        className="back-arrow"
        onClick={() => handleBack()}
      />
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
    <td>
      <button onClick={() => handleDelete(entry.id)}>Delete</button>
      <button onClick={() => setSelectedEntry(entry)}>Edit</button>
    </td>
  </tr>
))}

        </tbody>
      </table>
      {selectedEntry && (
  <form onSubmit={handleEdit}>
    <label htmlFor="title">Title:</label>
    <input type="text" id="title" value={selectedEntry.title} onChange={(event) => setSelectedEntry({...selectedEntry, title: event.target.value})} />
    <label htmlFor="date">Date:</label>
    <input type="date" id="date" value={selectedEntry.date} onChange={(event) => setSelectedEntry({...selectedEntry, date: event.target.value})} />
    <label htmlFor="time">Time:</label>
    <input type="time" id="time" value={selectedEntry.time} onChange={(event) => setSelectedEntry({...selectedEntry, time: event.target.value})} />
    <button type="submit">Save Entry</button>
    <button onClick={() => setSelectedEntry(null)}>Cancel</button>
  </form>
)}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <label htmlFor="time">Time:</label>
        <input type="time" id="time" value={time} onChange={(event) => setTime(event.target.value)} />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default Page2;
