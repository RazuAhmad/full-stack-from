import React, { useState,useEffect } from 'react'

function Form() {

  const [name, setName] = useState('' || sessionStorage.getItem("name"));
  const [email, setEmail] = useState('' || sessionStorage.getItem("email"));
  const [profession, setProfession] = useState( sessionStorage.getItem("profession"));

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    alert("Want to submit data?")
    // Do something with the form data, e.g. send it to a server
    console.log({ name, email, profession });
    
  }

    useEffect(()=>{

      window.sessionStorage.setItem('name',name);
    window.sessionStorage.setItem('email',email);
    window.sessionStorage.setItem('profession',profession);

    // const allData={'name':name,'email':email,'message':message};
    // const myObjString=JSON.stringify(allData);
    // window.sessionStorage.setItem("myObj",myObjString)

    },[name,email,profession])

    // pre-populate input field with stored data...
    useEffect(()=>{
      const storedName= sessionStorage.getItem('name');
      const storedEmail=sessionStorage.getItem('email');
      const storedProfession=sessionStorage.getItem('profession');

      if(storedName){
        setName(storedName)
      }
      if(storedEmail){
        setEmail(storedEmail)
      }
      if(storedProfession){
        setProfession(storedProfession)
      }
    },[])

  return (
    <form type="form" onSubmit={handleSubmit}>
      <p>
      <label>
        Name:
        </label>
        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
      
      </p>

      <p>
      <label>
        Email:
        </label>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
     
      </p>
      <p>
      <label>
        Select Your Profession:
        </label>
        <select required value={profession} onChange={(e) => setProfession(e.target.value)}>
          <option value="farmer">Farmer</option>
          <option value="teacher">Teacher</option>
          <option value="businessman">BusinessMan</option>
          <option value="web developer">web developer</option>
        </select>
      
      </p>
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form