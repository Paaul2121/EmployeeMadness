import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const {search} = useParams();
  console.log(search)
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
    .then((employees) => {
      console.log(employees)
      setLoading(false);
      setEmployees(employees);
    })
  }, []);
  
  if (loading) {
    return <Loading />;
  }
  
  return (
    <EmployeeTable search={search ? search : ""} employees={employees} onDelete={handleDelete} />
  ) 
};

export default EmployeeList;
