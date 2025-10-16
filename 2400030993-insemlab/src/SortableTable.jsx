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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortedEmployees = useMemo(() => {
    let sortableItems = [...employees];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [employees, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
          {sortedEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>${employee.salary.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;