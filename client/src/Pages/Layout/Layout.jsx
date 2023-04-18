import { Outlet, Link } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../Atom"


import "./Layout.css";

const Layout = () => {

  const [filter, setFilter] = useAtom(state.filter)

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }
  
  return(
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">Employees</Link>
          </li>
          <li>
              <input onInput={handleFilter} id="filterInput" placeholder="Filter level/position"></input>
            <Link to="/create">
              <button type="button">Create Employee</button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )

  
}

export default Layout;
