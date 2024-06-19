const Employee = require('../models/employee.model');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json({ employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { user_id, first_name, last_name, phone, email, position } = req.body;
    const employee = await Employee.create({ user_id, first_name, last_name, phone, email, position });
    res.status(201).json({ message: 'Employee created', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Add these missing handlers
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, first_name, last_name, phone, email, position } = req.body;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.update({ user_id, first_name, last_name, phone, email, position });
    res.status(200).json({ message: 'Employee updated', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
