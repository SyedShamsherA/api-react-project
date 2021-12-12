import React, {useState , useEffect} from 'react';
import axios from 'axios';

var x=0;

export default function CrudComponent() {
    const [user,setuser]=useState([]);
    const [userId,setuserId]=useState('');
    const [title,settitle]=useState('');
    const [body,setbody]=useState('');
    const [id,setid]=useState('');
    const [saveInProgress,setsaveInProgress]=useState(false);
  

  useEffect ( async () => { 
    var response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    await setuser(response.data );
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (x) {
      updateData();
      alert('data updated');
    } else {
      createData();
      alert('data created');
    }
  };

  const updateData = async () => {
    var response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${x}`,
      {
        id:x,
        userId: userId,
        title: title,
        body: body,
      }
    );
    var index = user.findIndex((row) => row.id === x);
    var user1 = [...user];
    user1[index] = response.data;
    setuser(user1);
    setuserId('');
    setbody('');
    settitle('');
    setid('');
  };

  const createData = async () => {
    setsaveInProgress(true);
    var response = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        userId:userId,
        title: title,
        body:body,
      }
    );
    var user1 = [...user];
    user1.push(response.data);
    setuser(user1);
    setuserId('');
    setbody('');
    settitle('');
    setsaveInProgress(false);
  };

 const onPopulateData = (id) => {
    var selectedData = user.filter((row) => row.id === id)[0];
    
      x=id;
      setuserId(selectedData.userId);
      settitle(selectedData.title);
      setbody(selectedData.body);
    
  };

  const handleDelete = async (id ) => {
    var response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    var user1 = user.filter((row) => row.id !== id);
    setuser( user1 );
    alert('data deleted');
  };

    return (
      <>
        <h3> User Form</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label> UserId </label>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => this.setuserId(e.target.value)}
            />
          </div>{' '}
          <br />
          <div>
            <label> Title </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>{' '}
          <br />
          <div>
            <label> Body </label>
            <input
              type="text"
              name="body"
              value={body}
              onChange={(e) => setbody(e.target.value)}
            />
          </div>{' '}
          <br />
          <button disabled={saveInProgress}> Submit </button>
        </form>
        <h3> Post Data </h3>
        <table>
          <thead>
            <tr>
              <td> UserId </td>
              <td> Title </td>
              <td> Body </td>
              <td> Actions </td>
            </tr>
          </thead>
          <tbody>
            {user.map((data) => (
              <tr key={data.id}>
                <td> {data.userId} </td>
                <td> {data.title} </td>
                <td> {data.body} </td>
                <td>
                  <button onClick={() => onPopulateData(data.id)}>
                    {' '}
                    Update{' '}
                  </button>{' '}
                  &nbsp;&nbsp;
                  <button onClick={() => handleDelete(data.id)}>
                    {' '}
                    Delete{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

