import { Link } from "react-router-dom";
import "./Equipment.css";
import { useAtom } from "jotai";
import { useState } from "react";
import state from "../../Pages/Atom"

const EquipmentTable = ({equipments, onDelete}) => {

  return (
    <div className="EmployeeTable">
      <table> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Present</th>
            <th />
          </tr>
        </thead>
        <tbody>  
        {
           equipments.map(equipment => {   
              return (
                <tr key={equipment._id}>
                  <td>{equipment.name}</td>
                  <td>{equipment.type}</td>
                  <td>{equipment.amount}</td>
                  <td>
                    <Link to={`/updateEquipment/${equipment._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => onDelete(equipment._id)}>
                      Delete
                    </button>
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


export default EquipmentTable;
