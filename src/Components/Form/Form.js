import React, { useState,useEffect } from 'react'

function Form() {

  const [name, setName] = useState( sessionStorage.getItem("name") ? sessionStorage.getItem("name") : '' );

  

 
  const [email, setEmail] = useState(sessionStorage.getItem("email") ? sessionStorage.getItem("email") : '' );
  const [profession, setProfession] = useState( sessionStorage.getItem("profession") ? sessionStorage.getItem("profession") : 'farmer' );


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


  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    alert("Want to submit data?")
    // Do something with the form data, e.g. send it to a server
    console.log({ name, email, profession });
    
  }

    
    

  return (
    <form type="form" onSubmit={handleSubmit}>
      <p>
      <label>
        Name:
        </label>
        <input placeholder='enter your name' required type="text" defaultValue={  name } onChange={(e) => setName(e.target.value)} />
      
      </p>

      <p>
      <label>
        Email:
        </label>
        <input placeholder='enter your email' required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
     
      </p>
      <p>
      <label>
        Select Your Profession:
        </label>
        <select required defaultValue={profession} onChange={(e) => setProfession(e.target.value)}>
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