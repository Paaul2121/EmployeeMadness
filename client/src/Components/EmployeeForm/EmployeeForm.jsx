import { useRef } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipment, brands, colors }) => {

  const levelRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    console.log(employee)
    return onSave(employee);
  };

  const handleSalary = (e) => {

    if(e.target.value * 1 > 0 && e.target.value * 1 < 101){
      levelRef.current.value = "Junior";
    } else if(e.target.value > 100 && e.target.value < 301){
      levelRef.current.value = "Medior";
    } else if(e.target.value > 300 && e.target.value < 401){
      levelRef.current.value = "Senior";
    } else if(e.target.value > 400 && e.target.value < 801){
      levelRef.current.value = "Expert";
    } else if(e.target.value > 800){
      levelRef.current.value = "Godlike";
    } 
  }

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
          ref={levelRef}
          readOnly
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Salary:</label>
        <input
          onChange={(e) => handleSalary(e)}
          defaultValue={employee ? employee.salary : null}
          name="salary"
          id="salary"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
      <select value={employee?.equipment} name="equipment">
        {    
         equipment?.map(equip => {
          return (
            <option> {equip.name} </option>
          )
         }) 
        }
      </select>
      </div>

      <div className="control">
        <label htmlFor="brands">Favorite Brands:</label>
      <select value={brands?.name} name="brands">
        {
          brands?.map(brand => {
            return(
              <option> {brand.name} </option>
            )
          })
        }
      </select>
      </div>

      <div className="control">
        <label htmlFor="colors">Favorite Colors:</label>
      <select value={colors?.name} name="colors">
        {
          colors?.map(color => {
            return(
              <option> {color.name} </option>
            )
          })
        }
      </select>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>

      </div>
    </form>
  );
};

export default EmployeeForm;
