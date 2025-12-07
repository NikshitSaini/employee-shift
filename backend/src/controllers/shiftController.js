import Shift from "../models/Shift.js";
import Employee from "../models/Employee.js";

export async function createShift(req, res) {
  try {
    const { employeeId, date, startTime, endTime } = req.body;

    // 1. Check employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // 2. Duration ≥ 4 hours
    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = (end - start) / (1000 * 60 * 60);
    if (hours < 4) {
      return res.status(400).json({ message: "Shift must be at least 4 hours" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const sameDayShifts = await Shift.find({
      employee: employeeId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const overlap = sameDayShifts.some((s) => {
      const existingStart = new Date(s.startTime);
      const existingEnd = new Date(s.endTime);
      return start < existingEnd && end > existingStart;
    });

    if (overlap) {
      return res.status(400).json({ message: "Overlapping shift exists" });
    }

    const shift = await Shift.create({
      employee: employeeId,
      date,
      startTime,
      endTime,
    });

    res.status(201).json(shift);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getShifts(req, res) {
  try {
    const { employee, date } = req.query;
    let query = {};

    if (req.user.role === "admin") {
      if (employee) query.employee = employee;
      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        query.date = { $gte: startOfDay, $lte: endOfDay };
      }
    } else {
      // Normal user: find their employee record first
      const emp = await Employee.findOne({ user: req.user.id });
      if (!emp) {
        return res.status(404).json({ message: "Employee record not found for this user" });
      }
      query.employee = emp._id;
    }

    const shifts = await Shift.find(query)
      .populate("employee", "name code")
      .sort({ startTime: 1 });

    res.json(shifts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteShift(req, res) {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }

    await shift.deleteOne();
    res.json({ message: "Shift removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
