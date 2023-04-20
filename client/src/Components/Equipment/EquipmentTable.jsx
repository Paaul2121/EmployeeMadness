import { Link } from "react-router-dom";
import "./Equipment.css";
import { useAtom } from "jotai";
import { useState } from "react";
import state from "../../Pages/Atom"

const EquipmentTable = ({equipments, onDelete}) => {

  console.log(equipments)

//   const [filter, setFilter] = useAtom(state.filter)
//   const [sort, setSort] = useState(0);

//   const sortByFirstName = () => {
//     employees.map(employee => employee.name = employee.name.split(" "));
//     employees.sort((a,b) => a.name[0] > b.name[0] ?  1 : -1)
//     employees.map(employee => employee.name = employee.name.join(" "));
//     setSort(sort*1 + 1);
//   }

//   const sortByLastName = () => {
//     employees.map(employee => employee.name = employee.name.split(" "));
//     employees.sort((a,b) => a.name[a.name.length - 1] > b.name[b.name.length - 1] ?  1 : -1)
//     employees.map(employee => employee.name = employee.name.join(" "));
//     setSort(sort*1 + 1);
//   }

//   const sortByMiddleName = () => {
//     employees.map(employee => {
//       employee.name = employee.name.split(" ")
//       if(employee.name.length === 2){
//         employee.name.splice(1, 0, "z");
//       }
//     });
//     employees.sort((a,b) => a.name[1] > b.name[1] ?  1 : -1);
//     employees.map(employee => {
//       if(employee.name[1] === "z"){
//         employee.name.splice(1, 1);
//       }
//       employee.name = employee.name.join(" ")
//     });
//     setSort(sort*1 + 1);
//   }

//   const sortByPosition = () => {
//     employees.sort((a,b) => a.position > b.position ?  1 : -1)
//     setSort(sort*1 + 1);
//   }

//   const sortByLevel = () => { 
//     employees.sort((a,b) => a.level > b.level ?  1 : -1)
//     setSort(sort*1 + 1);
//   }

  return (
    <div className="EmployeeTable">
      <table> 
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>  
        {
           equipments.map(equipment => {   
            // if(employee.level.includes(filter) || employee.position.includes(filter)){
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
            // } else {
            //   return <></>
            // }
          }       
          )}
        </tbody>
      </table>
    </div>
  )
}


export default EquipmentTable;
