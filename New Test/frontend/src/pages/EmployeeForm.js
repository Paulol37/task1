import React from "react";

function EmployeeForm({ form, setForm, onSubmit, onCancel, isEditing }) {
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="position" placeholder="Position" value={form.position} onChange={handleChange} />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
      <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
      {isEditing && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default EmployeeForm;
