import React, { useState,useEffect } from 'react'

function Form() {
  const [allSectors,setAllSectors]=useState([]);
  
  const [name, setName] = useState( sessionStorage.getItem("name") ? sessionStorage.getItem("name") : '' );

  const [checkBox, setCheckBox] = useState(sessionStorage.getItem("checkbox") ? sessionStorage.getItem("checkbox") : "" );

  const [profession, setProfession] = useState( sessionStorage.getItem("profession") ? sessionStorage.getItem("profession") : 'Manufacturing' );

  const [mongodbInsertedID,setMongodbInsertedID]=useState(sessionStorage.getItem("mongodb_insertedId") ? sessionStorage.getItem("mongodb_insertedId") : '')

  useEffect(()=>{

    window.sessionStorage.setItem('name',name);
  window.sessionStorage.setItem('checkbox',checkBox);
  window.sessionStorage.setItem('profession',profession);

  // const allData={'name':name,'email':email,'message':message};
  // const myObjString=JSON.stringify(allData);
  // window.sessionStorage.setItem("myObj",myObjString)

  },[name,checkBox,profession])


  // pre-populate input field with stored data...
  useEffect(()=>{
    const storedName= sessionStorage.getItem('name');
    const storedCheckBox=sessionStorage.getItem('checkbox');
    const storedProfession=sessionStorage.getItem('profession');

    if(storedName){
      setName(storedName)
    }
    
    if(storedCheckBox){
      setCheckBox(storedCheckBox)
    }
    if(storedProfession){
      setProfession(storedProfession)
    }
  },[])

  useEffect(()=>{
    fetch("http://localhost:5000/userSector")
    .then(res=>res.json())
    .then(data=>setAllSectors(data))
  },[])

// Updating user function::::::::::
function UpdatingUser(mongodbInsertedID,submittedData){
  fetch(`http://localhost:5000/users/${mongodbInsertedID}`,{
    method:"PUT",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(submittedData)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    if(data.modifiedCount===1 ){
     alert("You have updated data")
      
    }
    
    
  })
}

  // Handle form submission
  function HandleSubmit(event) {
    event.preventDefault();
    
    // Do something with the form data, e.g. send it to a server
    const submittedData={name,checkBox,profession};
    
  if(mongodbInsertedID ){
    console.log("your inserted id is", mongodbInsertedID);

    UpdatingUser(mongodbInsertedID,submittedData)
  
  }

  else{

      // submitted Data Sending to the database

      fetch('http://localhost:5000/users',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(submittedData)
        })
        .then(res=>res.json())
        .then(dataConfirmation=>{
         
          if(dataConfirmation.acknowledged){
          alert("your data is submitted!!")
           
          // Save form data to session storage
        sessionStorage.setItem("mongodb_insertedId",(dataConfirmation.insertedId));
        setMongodbInsertedID(dataConfirmation.insertedId)
          }
        })

  }
    
  }

    // useEffect(()=>{
    //   setProfession(sessionStorage.getItem("profession"))
    //   console.log(profession)
    // },[profession])
    
  return (
    <form type="form" onSubmit={HandleSubmit}>
      <p>
      <label>
        Name:
        </label>
        <input placeholder='enter your name' required type="text" defaultValue={  name } onChange={(e) => setName(e.target.value)} />
      
      </p>

      
      <p>
      <label>
        Select Your Profession:
        </label>

        <select required defaultValue={profession} onChange={(e) => setProfession(e.target.value)}>
         { 
         allSectors.map((pd)=> <option key={pd._id} value={ pd.sector}>{pd.sector}</option>)
        
         
         }
          
        </select>
      
      </p>

      <p>
         
         <input className='w-4 h-4' id='checkbox' onChange={(e) => setCheckBox(!checkBox)} required  type="checkbox"  />
         <label htmlFor="checkbox" className='text-white ml-2'>Agree to Terms & Conditions</label>  
         </p>

      <button type="submit">Submit</button>
    </form>
  )
}

export default Form