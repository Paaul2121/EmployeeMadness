import state from "../Pages/Atom"
import { useState,useEffect } from "react";
import { useAtom } from "jotai";

function MissingEmployees() {

    const [presence, setPresence] = useState([]);

    useEffect(() => {
        fetch("/api/checkBox")
        .then(res => res.json())
        .then(employees => setPresence(employees))
      }, []);

      return (
        <div className="EmployeeTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Position</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
               presence.map(employee => {   
                  return (
                    <tr key={employee._id}>
                      <td>{employee.name}</td>
                      <td>{employee.level}</td>
                      <td>{employee.position}</td>
                      <td>
                      </td>
                    </tr>
                  )
              }       
              )}
            </tbody>
          </table>
        </div>
      )
}

export default MissingEmployees;