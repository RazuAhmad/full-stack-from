import React, { useState } from 'react'

function Form() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    // Do something with the form data, e.g. send it to a server
    console.log({ name, email, message });
    
  }

  sessionStorage.setItem('name',name);
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('message',message)

  return (
    <form onSubmit={handleSubmit}>
      <p>
      <label>
        Name:
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      
      </p>

      <p>
      <label>
        Email:
        </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
     
      </p>
      <p>
      <label>
        Message:
        </label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      
      </p>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form