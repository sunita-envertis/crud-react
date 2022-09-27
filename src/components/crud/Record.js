import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Record() {

  
    const [FirstName,setFirstName]=useState('');
    const [LastName,setLastName]=useState('');
    const [Users,setUsers]=useState([]);
    const [show,setShow]=useState(false);
    const [edit,setEdit]=useState(false);
    const [item,setItem]=useState(null);

    const formSubmit = (event) =>{
     event.preventDefault()
      const newArr = {id:new Date().getTime().toString(),'FirstName': FirstName ,'LastName':LastName};
    
      setUsers([...Users,newArr]);
      setFirstName('');
     setLastName('');
     setShow(false);
    }

    const modalHandle =()=>{
      setShow(true);
    }
    const handleClose =()=>{
      setShow(false);
    }
    const handleEdit =(e)=>{
      setEdit(true);
      const editId =e.target.value
      let updatedItem = Users.find((elem)=>{
        return elem.id===editId
      })
      setShow(true);
      setFirstName(updatedItem.FirstName);
      setLastName(updatedItem.LastName);
      setItem(updatedItem.id);
     
    }
    const formEdit = (e) =>{
      e.preventDefault()
      let newList = Users.map((elem)=>{
          if(elem.id===item){
            return {...elem,'FirstName': FirstName ,'LastName':LastName}        
          }
          return elem;
       });
       setUsers(newList)
    
       
       setShow(false);
       setItem(null);
       setEdit(false);
       setFirstName('');
       setLastName('');
    

    }
    const handleDelete =(e)=>{
      let newList = Users.filter((elem)=>{
        
          return elem.id !== e.target.value       
               
     });
     setUsers(newList)
    }
   

  return (
    <div className="container my-3">
     
        <div className="row d-flex">
           <h3>User Lists</h3>
           <button className="btn btn-sm btn-primary ml-auto p-2" onClick={modalHandle}>Add User</button>
        </div>
        
      <table className="table table-striped my-3">
            <thead>
                <tr>
                <th scope="col">#Sl No</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
           { Users.map((elem,index) =>{
              return(<tr key={elem.id}>
                <th scope="row">{index+1}</th>
                <td>{elem.FirstName}</td>
                <td>{elem.LastName}</td>
                <td><button onClick={handleEdit} value={elem.id}>Edit</button></td>
                <td><button onClick={handleDelete} value={elem.id}>Delete</button></td>
                </tr>
              )   
           }

            )
            }
            </tbody>
        </table>



<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit User':'Add User'}</Modal.Title>
        </Modal.Header>
        {/* { edit ? <form onSubmit={formSubmit}> : <form onSubmit={ formEdit }> } */}
        
        <Modal.Body>   
        
            <div className="form-group" >
                <label >First Name</label>
                <input type="text" value={FirstName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter First Name"
                 onChange={ e =>{setFirstName(e.target.value)}}/>
                
            </div>
            <div className="form-group">
                <label >Last Name</label>
                <input type="text" value={LastName} onChange={ e =>{setLastName(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder="Last Name"/>
            </div>
            
      </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!edit?<Button type="submit" variant="primary" onClick={formSubmit}>
            Save Changes
          </Button>:<Button type="submit" variant="primary" onClick={formEdit}>
            Update Changes
          </Button>}
          
        </Modal.Footer>
        {/* </form> */}
      </Modal>
    </div>
  )
}
