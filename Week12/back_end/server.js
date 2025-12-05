import mongoose from "mongoose";
import express from "express";
import cors from cors;
import studentRouter from "./routes/studentRoutes.js"
import Student from "./models/Student.js";

// bài 1
const app = express();
const api = express.Router();

mongoose.connect('mongodb://localhost:27017/student_db') 
         .then(() => console.log("Đã kết nối MongoDB thành công")) 
         .catch(err => console.error("Lỗi kết nối MongoDB:", err));

// api.use("/api/students", studentRouter);
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(api);
api.use(cors);

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { 
    console.log(`Server đang chạy trên cổng ${PORT}`); 
});

app.get('/api/students', async (req, res) => { 
    try { 
        const students = await Student.find(); 
        res.json(students); 
    } catch (err) { 
        res.status(500).json({ error: err.message }); 
    } 
});

// Export app for testing or further usage
export default app;