import React, { useState, useEffect } from 'react';

let id = 0;
const getId = () => ++id;

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
];

export default function App() {
  const [members, setMembers] = useState(teamMembers);
  const [editing, setEditing] = useState(null);
  const [formValues, setFormValues] = useState({ fname: '', lname: '', bio: ''});
  

  useEffect(() => {
    if (editing) {
      const memberToEdit = members.find(member => member.id === editing);
      if (memberToEdit) {
        setFormValues({ fname: memberToEdit.fname, lname: memberToEdit.lname, bio: memberToEdit.bio });
      }
    } else {
      setFormValues({ fname: '', lname: '', bio: '' });
    }
  }, [editing, members]);

  const onChange = evt => {
    setFormValues({ ...formValues, [evt.target.id]: evt.target.value });
  };

  const edit = id => {
    setEditing(id);
  };

  const submitNewMember = () => {
    const newMember = { id: getId(), ...formValues };
    setMembers([...members, newMember]);
    setFormValues({ fname: '', lname: '', bio: '' });
  };

  const editExistingMember = () => {
    const updatedMembers = members.map(member =>
      member.id === editing ? { ...member, ...formValues } : member
      );
    setMembers(updatedMembers);
    setEditing(null);
    setFormValues({ fname: '', lname: '', bio: '' });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    if (editing) {
      editExistingMember();
    } else {
      submitNewMember();
    }
  };
  
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {members.map(mem => (
            <div key={mem.id} className="member">
              <div>
                <h4>{mem.fname} {mem.lname}</h4>
                <p>{mem.bio}</p>
              </div>
              <button onClick={() => edit(mem.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input 
              id="fname" 
              type="text"
              value={formValues.fname}
              onChange={onChange} 
              placeholder="Type First Name" 
              />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input 
            id="lname" 
            type="text"
            value={formValues.lname}
            onChange={onChange} 
            placeholder="Type Last Name" 
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea 
            id="bio"
            value={formValues.bio}
            onChange={onChange}
            placeholder="Type Bio" 
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
