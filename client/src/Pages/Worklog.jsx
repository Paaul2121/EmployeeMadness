import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";
import "./Pages.css";

const updateWorklog = (id, worklog) => {
  console.log(id)
  return fetch(`/worklog/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(worklog),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const Worklog = () => {
  const hoursRef = useRef(null);
  const workRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setEmployeeLoading(false);
      });
  }, [id]);

  const handleUpdateEmployee = () => {
    setUpdateLoading(true);
    updateWorklog(id, {hoursRef: hoursRef.current.value, workRef: workRef.current.value})
      .then(() => {
        setUpdateLoading(false);
        navigate("/");
      });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <>
      <input ref={hoursRef}  />
      <input ref={workRef}  />
      <button onClick={handleUpdateEmployee}> Add Worklog </button>
    </>
  );
};

export default Worklog

