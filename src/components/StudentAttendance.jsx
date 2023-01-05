
import React, { useState, useEffect } from 'react';

function StudentAttendance() {
  const [students, setStudents] = useState([]);
  const [studentsPresent, setStudentsPresent] = useState(0);
  const len= students.length > 0;
  // This useEffect hook will run whenever the component mounts
  // or whenever the students array is updated.
  useEffect(() => {
    // Calculate the number of students present in the school
    const studentsPresent = students.filter(s => !s.checkoutTime).length;

    console.log(`There are ${studentsPresent} students present in the school.`);
  }, [students]);

  let rollNumberInput;
let nameInput;

function handleCheckIn(event) {
  event.preventDefault();
  const rollNumber = rollNumberInput.value;
  const name = nameInput.value;

  setStudents(prevStudents => [
    ...prevStudents,
    {
      rollNumber,
      name,
      checkinTime: new Date(),
      checkoutTime: null
    }
  ]);
  setStudentsPresent(studentsPresent + 1);
}




  function handleCheckOut(rollNumber) {
    setStudents(prevStudents =>
      prevStudents.map(s => {
        if (s.rollNumber === rollNumber) {
          return {
            ...s,
            checkoutTime: new Date()
          };
        }
        return s;
      })
    );
    setStudentsPresent(studentsPresent - 1);
  
  }

  return (
    <div>
      <div class="last">
      <form >
        <label >
          Roll Number:
          <input class="first" type="text" name="rollNumber" ref={input => (rollNumberInput = input)} />
        </label>
        <br />
        <label>
          Name:
          <input class="second"type="text" name="name" ref={input => (nameInput = input)}/>
        </label>
        <br />
        <button class="third"type="button" onClick={handleCheckIn}>
          Check In
        </button>
        
      </form>
      </div>
      <br />
     
      { len && (
      <table style={{border: "solid 1px black "}}>
        <thead >
          <tr >
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.rollNumber}>
              <td>{s.rollNumber}</td>
              <td>{s.name}</td>
              <td>{s.checkinTime.toString()}</td>
              <td>
                {s.checkoutTime ? s.checkoutTime.toString() : 'Present'}
              </td>
              <td>
                {!s.checkoutTime && (
                  <button type="button" onClick={() => handleCheckOut(s.rollNumber)}>
                    Check Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <p style={{fontSize:"22px" ,color:"bold"}}>Number of students present in the school: {studentsPresent}</p>
      
    </div>
  );
}

export default StudentAttendance;


