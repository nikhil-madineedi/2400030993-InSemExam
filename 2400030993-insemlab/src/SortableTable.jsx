import React, { useState, useMemo } from 'react';
import './index.css';

const SortableTable = () => {
  const initialData = [
    { name: 'Nikhil', department: 'Frontend', salary: 75000 },
    { name: 'Gokul', department: 'UI/UX', salary: 68000 },
    { name: 'Ramakrishna', department: 'Hr', salary: 92000 },
    { name: 'Padma', department: 'Backend', salary: 85000 },
  ];

  const [employees] = useState(initialData);
  const [employee, setEmployee] = useState({ key: null, direction: 'ascending' });

  const sortedEmployees = useMemo(() => {
    let sortableItems = [...employees];
    if (employee.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[employee.key] < b[employee.key]) {
          return employee.direction === 'ascending' ? -1 : 1;
        }
        if (a[employee.key] > b[employee.key]) {
          return employee.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [employees, employee]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (employee.key === key && employee.direction === 'ascending') {
      direction = 'descending';
    }
    setEmployee({ key, direction });
  };

  return (
    <div className="table-container">
      <center>
        <h2>Employee Data</h2>
      </center>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>Name</th>
            <th onClick={() => requestSort('department')}>Department</th>
            <th onClick={() => requestSort('salary')}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employeeItem, index) => (
            <tr key={index}>
              <td>{employeeItem.name}</td>
              <td>{employeeItem.department}</td>
              <td>${employeeItem.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
