import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentList from "./Pages/EquipmentList";
import MissingEmployees from "./Pages/MissingEmployees";
import Worklog from "./Pages/Worklog"

import "./index.css";
import TableTest from "./Pages/TableTest";
import FormTest from "./Pages/FormTest";
import EquipmentUpdater from "./Pages/EquipmentUpdater";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/worklog/:id",
        element: <Worklog />
      },
      {
        path: "/employees/:search",
        element: <EmployeeList /> 
      },
      {
        path: "/equipment",
        element: <EquipmentList />
      },
      {
        path: "/createEquipment",
        element: <EquipmentCreator />
      },
      {
        path: "/missing",
        element: <MissingEmployees />
      },
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/employees/name/asc",
        element: <EmployeeList />,
      },
      {
        path: "/employees/name/desc",
        element: <EmployeeList />,
      },
      {
        path: "/employees/level/asc",
        element: <EmployeeList />,
      },
      {
        path: "/employees/level/desc",
        element: <EmployeeList />,
      },
      {
        path: "/employees/position/asc",
        element: <EmployeeList />,
      },
      {
        path: "/employees/position/desc",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/updateEquipment/:id",
        element: <EquipmentUpdater />
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
