import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Employee from "../models/Employee.js";
import Shift from "../models/Shift.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log("Clearing database...");
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Shift.deleteMany({});

    console.log("Creating users...");
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);
    const userPassword = await bcrypt.hash("HireMe@2025!", salt);

    const admin = await User.create({
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
    });

    const user = await User.create({
      email: "hire-me@anshumat.org",
      password: userPassword,
      role: "user",
    });

    console.log("Creating employees...");
    await Employee.create([
      {
        name: "John Doe",
        code: "E001",
        department: "Engineering",
        user: user._id,
      },
      {
        name: "Jane Smith",
        code: "E002",
        department: "HR",
        user: user._id,
      },
      {
        name: "Bob Johnson",
        code: "E003",
        department: "Sales",
        user: user._id,
      },
    ]);

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
