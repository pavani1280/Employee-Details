import exp from "express";
import { EmpModel as employeeModel } from "../models/EmpModel.js";
export const employeeApp = exp.Router();

//Create emp
employeeApp.post("/employees", async (req, res) => {
  const newEmp = req.body;
  const empDoc = new employeeModel(newEmp);
  await empDoc.save();
  res.status(201).json({ message: "Emp created" });
});
//Read all emps
employeeApp.get("/employees", async (req, res) => {
  let employeeList = await employeeModel.find();
  res.status(200).json({ message: "list of emps", payload: employeeList });
});
//Update emp id
employeeApp.put("/employees/:id", async (req, res) => {
  const modifiedEmp = req.body;
  //find and update
  let updatedEmp = await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { ...modifiedEmp },
    },
    { returnDocument: "after" },
  );
  if (!updatedEmp) {
    return res.status(404).json({ message: "emp not found" });
  }
  res.status(200).json({ message: "employee updated", payload: updatedEmp });
});

//Delete emp by id
employeeApp.delete("/employees/:id", async (req, res) => {
  let deletedEmp = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedEmp) {
    return res.status(404).json({ message: "emp not found" });
  }
  res.status(200).json({ message: "employee deleted", payload: deletedEmp });
});