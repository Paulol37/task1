import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const { data } = await api.get("/employees");
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await api.put(`/employees/${currentId}`, form);
    } else {
      await api.post("/employees", form);
    }
    setForm({ name: "", position: "", department: "", salary: "" });
    setIsEditing(false);
    setCurrentId(null);
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setIsEditing(true);
    setCurrentId(emp._id);
  };

  const handleDelete = async (id) => {
  await api.delete(`/employees/${id}`);
  fetchEmployees();
};

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <>
      <style>{`
        body {
          background: #2c2c29ff; 
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          color: #fff;
        }

        .employees-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 40px;
        }

        .employees-card {
          background: #575353ff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.4);
          width: 100%;
          max-width: 900px;
        }

        .employees-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .employees-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
        }

        .logout-btn {
          background: #d01717ff;
          color: #fff;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s ease;
        }
        .logout-btn:hover {
          background: #d01717ff;
        }

        .employee-form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .employee-form input {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #444;
          background: #222;
          color: #fff;
        }

        .employee-actions {
          grid-column: span 2;
          display: flex;
          gap: 5px;
        }

        .employee-actions button {
          flex: 1;
          padding: 5px;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }

        .employee-actions button[type="submit"] {
          background: #d01717ff; 
          color: #fff;
        }
        .employee-actions button[type="submit"]:hover {
          background: #d01717ff;
        }

        .employee-actions button[type="button"] {
          background: #555;
          color: #fff;
        }
        .employee-actions button[type="button"]:hover {
          background: #333;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          background: #222;
          border-radius: 8px;
          overflow: hidden;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #333;
        }

        th {
          background: #d01717ff;
          color: #fff;
        }

        tr:hover {
          background: #2a2a2a;
        }

        td button {
          margin-right: 8px;
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        td button:first-child {
          background: #3b82f6; /* blue for edit */
          color: #fff;
        }
        td button:first-child:hover {
          background: #1d4ed8;
        }

        td button:last-child {
          background: #dc2626; /* red for delete */
          color: #fff;
        }
        td button:last-child:hover {
          background: #b91c1c;
        }
      `}</style>

      <div className="employees-container">
        <div className="employees-card">
          {/* Header with Logout */}
          <div className="employees-header">
            <h2 className="employees-title">Employee Management</h2>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>

          {/* Employee Form */}
          <form onSubmit={handleSubmit} className="employee-form">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              required
            />

            <div className="employee-actions">
              <button type="submit">
                {isEditing ? "Update Employee" : "Add Employee"}
                
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ name: "", position: "", department: "", salary: "" });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Employee Table */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <button onClick={() => handleEdit(emp)}>Edit</button>
                    <button onClick={() => handleDelete(emp._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px", color: "#aaa" }}>
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Employees;
