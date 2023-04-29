import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import state from "../../Pages/Atom"
import Pagination from "../../Pages/Pagination";

let counter = 0;
const EmployeeTable = ({ employees, onDelete, search }) => {

  const [presence, setPresence] = useAtom(state.presence);
  const [filter, setFilter] = useAtom(state.filter)
  const [sort, setSort] = useState(0);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useAtom(state.currentPage);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  setPresence(employees);

  const sortByFirstName = () => {
    employees.map(employee => employee.name = employee.name.split(" "));
    employees.sort((a,b) => a.name[0] > b.name[0] ?  1 : -1)
    employees.map(employee => employee.name = employee.name.join(" "));
    setSort(sort*1 + 1);
  }

  const sortByLastName = () => {
    employees.map(employee => employee.name = employee.name.split(" "));
    employees.sort((a,b) => a.name[a.name.length - 1] > b.name[b.name.length - 1] ?  1 : -1)
    employees.map(employee => employee.name = employee.name.join(" "));
    setSort(sort*1 + 1);
  }

  const sortByMiddleName = () => {
    employees.map(employee => {
      employee.name = employee.name.split(" ")
      if(employee.name.length === 2){
        employee.name.splice(1, 0, "z");
      }
    });
    employees.sort((a,b) => a.name[1] > b.name[1] ?  1 : -1);
    employees.map(employee => {
      if(employee.name[1] === "z"){
        employee.name.splice(1, 1);
      }
      employee.name = employee.name.join(" ")
    });
    setSort(sort*1 + 1);
  }

  const sortByPosition = () => {
    employees.sort((a,b) => a.position > b.position ?  1 : -1)
    setSort(sort*1 + 1);
  }

  const sortByLevel = () => { 
    employees.sort((a,b) => a.level > b.level ?  1 : -1)
    setSort(sort*1 + 1);
  }

  const sortByLevelAscDesc = () => {

    if(counter % 2 === 0){
      employees.sort((a,b) => a.level > b.level ? 1 : -1);
      counter++;
    } else {
      employees.sort((a,b) => b.level > a.level ? 1 : -1);
      counter++;
    }
    console.log(counter);
    setSort(sort*1 + 1);
  }

  const sortByPositionAscDesc = () => {

    if(counter % 2 === 0){
      employees.sort((a,b) => a.position > b.position ? 1 : -1);
      counter++;
    } else {
      employees.sort((a,b) => b.position > a.position ? 1 : -1);
      counter++;
    }
    console.log(counter);
    setSort(sort*1 + 1);
  }

  const sortByFullName = () => {
    if(counter % 2 === 0){
      employees.sort((a,b) => a.name > b.name ? 1 : -1);
      counter++;
    } else {
      employees.sort((a,b) => b.name > a.name ? 1 : -1);
      counter++;
    }
    console.log(counter);
    setSort(sort*1 + 1);
  }

  const handleChange = (employee) => {

    fetch("/api/checkBox", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((res) => res.json()).then(employee => console.log(employee));
  }

  

  return (
    <div className="EmployeeTable">
        <button onClick={sortByFirstName} id="sortButton">Sort by First Name</button>
        <button onClick={sortByLastName} id="sortButton">Sort by Last Name</button>
        <button onClick={sortByMiddleName} id="sortButton">Sort by Middle Name</button>
        <button onClick={sortByPosition} id="sortButton">Sort by Position</button>
        <button onClick={sortByLevel} id="sortButton">Sort by Level</button>
      <table>
        <thead>
          <tr>
            <td>
            </td>
          </tr>
          <tr>
            <th onClick={sortByFullName} >
            <Link to={counter % 2 === 0 ? "/employees/name/asc" : "/employees/name/desc"}>
              Name
            </Link>
            </th>
            <th onClick={sortByLevelAscDesc}> 
            <Link to={counter % 2 === 0 ? "/employees/level/asc" : "/employees/level/desc"}>
              Level
            </Link>
            </th>
            <th onClick={sortByPositionAscDesc}> 
            <Link to={counter % 2 === 0 ? "/employees/position/asc" : "/employees/position/desc"}>
            Position
            </Link>
            </th>
            <th>Present</th>
            <th>Favorite Brands</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
           currentEmployees.map(employee => {   

            if((employee.level.includes(filter) || employee.position.includes(filter)) && employee.name.includes(search)){
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td> <input type="checkbox" onChange={() => handleChange(employee)}></input> </td>
                  <td>{employee.favoriteBrands.name}</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => onDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            } else {
              return <></>
            }
          }       
          )}
        </tbody>
      </table>
      <Pagination employees={employees} employeesPerPage={employeesPerPage} />
    </div>
  )
}


export default EmployeeTable;
