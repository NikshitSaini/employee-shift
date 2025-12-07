import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ShiftForm from "../components/ShiftForm";
import ShiftTable from "../components/ShiftTable";
import client from "../api/client";

export default function Dashboard() {
  const [shifts, setShifts] = useState([]);
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const fetchShifts = async () => {
    try {
      const res = await client.get("/shifts");
      setShifts(res.data);
    } catch (err) {
      console.error("Failed to fetch shifts", err);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {isAdmin && (
            <div className="md:col-span-4">
              <ShiftForm onShiftCreated={fetchShifts} />
            </div>
          )}
          <div className={isAdmin ? "md:col-span-8" : "md:col-span-12"}>
            <ShiftTable shifts={shifts} onDelete={fetchShifts} isAdmin={isAdmin} />
          </div>
        </div>
      </div>
    </div>
  );
}
