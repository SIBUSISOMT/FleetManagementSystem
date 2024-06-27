const baseURL = 'http://localhost:3000';  // Ensure this is the correct URL for your backend

document.addEventListener('DOMContentLoaded', function() {
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    const employeeTable = document.getElementById('employeeTable');
    const employeeBody = document.getElementById('employeeBody');

    // Function to fetch and display employees
    async function fetchEmployees() {
      try {
        const response = await fetch(`${baseURL}/api/employees`);
        const result = await response.json();
        if (response.ok) {
          employeeBody.innerHTML = '';
          result.employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${employee.first_name}</td>
              <td>${employee.last_name}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>${employee.position}</td>
              <td>
                <button class="edit-btn" onclick="updateEmployee(${employee.id})">Update</button>
                <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
              </td>
            `;
            employeeBody.appendChild(row);
          });
        } else {
          console.error('Failed to fetch employees:', result.error);
          alert(result.error || 'Failed to fetch employees');
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error);
        alert('Failed to fetch employees');
      }
    }

    // Fetch and display employees on page load
    fetchEmployees();

    // Function to add an employee
    addEmployeeForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const formData = new FormData(addEmployeeForm);
      const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        position: document.getElementById('register-role').value // Get selected role
      };

      try {
        const response = await fetch(`${baseURL}/api/employees`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          // Refresh employee list after adding employee
          fetchEmployees();
          // Clear form fields
          addEmployeeForm.reset();
        } else {
          console.error('Failed to add employee:', result.error);
          alert(result.error || 'Failed to add employee');
        }
      } catch (error) {
        console.error('Failed to add employee:', error);
        alert('Failed to add employee');
      }
    });

    // Function to update an employee
    async function updateEmployee(employeeId) {
      const updatedName = prompt('Enter updated name:');
      if (updatedName) {
        try {
          const response = await fetch(`${baseURL}/api/employees/${employeeId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: updatedName })
          });
          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            // Refresh employee list after update
            fetchEmployees();
          } else {
            console.error('Failed to update employee:', result.error);
            alert(result.error || 'Failed to update employee');
          }
        } catch (error) {
          console.error('Failed to update employee:', error);
          alert('Failed to update employee');
        }
      }
    }

    // Function to delete an employee
    async function deleteEmployee(employeeId) {
      if (confirm('Are you sure you want to delete this employee?')) {
        try {
          const response = await fetch(`${baseURL}/api/employees/${employeeId}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          if (response.ok) {
            alert(result.message);
            // Refresh employee list after deletion
            fetchEmployees();
          } else {
            console.error('Failed to delete employee:', result.error);
            alert(result.error || 'Failed to delete employee');
          }
        } catch (error) {
          console.error('Failed to delete employee:', error);
          alert('Failed to delete employee');
        }
      }
    }

    // Expose update and delete functions to global scope for HTML buttons
    window.updateEmployee = updateEmployee;
    window.deleteEmployee = deleteEmployee;
  });
