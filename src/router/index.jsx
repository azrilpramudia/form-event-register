import { Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import DataTable from "../components/DataTable";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/datatable" element={<DataTable />} />
    </Routes>
  );
}
