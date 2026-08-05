const PDFDocument = require('pdfkit');
const { getEmployeeByUserId } = require('../models/employeeModel');

const generateSalarySlip = (req, res) => {
  const userId = req.user.id;

  getEmployeeByUserId(userId, (err, employee) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=SalarySlip_${employee.employee_id}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .fillColor('#2563EB')
      .text('Vertex Technologies', { align: 'center' });

    doc
      .fontSize(12)
      .fillColor('#6B7280')
      .text('Employee Management System', { align: 'center' });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor('#111827')
      .text('Salary Slip', { align: 'center', underline: true });

    doc.moveDown(2);

    const today = new Date().toLocaleDateString();

    doc.fontSize(11).fillColor('#111827');
    doc.text(`Date: ${today}`);
    doc.moveDown(1);

    doc.text(`Employee Name: ${employee.full_name}`);
    doc.text(`Employee ID: ${employee.employee_id}`);
    doc.text(`Department: ${employee.department_name}`);
    doc.text(`Gender: ${employee.gender}`);
    doc.moveDown(1);

    doc
        .fontSize(13)
        .fillColor('#2563EB')
        .text(`Net Salary: Rs. ${employee.salary}`, { underline: true });

    doc.moveDown(3);

    doc
      .fontSize(9)
      .fillColor('#6B7280')
      .text('This is a system-generated salary slip.', { align: 'center' });

    doc.end();
  });
};

module.exports = { generateSalarySlip };