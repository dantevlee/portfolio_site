import { useState } from 'react';

export default function Form({ fields }) {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {};
    fields.forEach(field => {
      data[field.name] = formData.get(field.name);
    });

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json()
      if (res.ok) {
        setStatus('success');
        console.log(result.message)
        e.target.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            id={field.name}
          />
        </div>
      ))}
      <button type="submit">Submit</button>

      {status === 'success' && <p>Message sent!</p>}
      {status === 'error' && <p>Error sending message.</p>}
    </form>
  );
}
