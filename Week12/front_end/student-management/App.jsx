import axios from 'axios'; 
import { useState, useEffect } from 'react'; 

// bài 1
const [students, setStudents] = useState([]); 
useEffect(() => { 
    axios.get('http://localhost:3000/api/students') 
         .then(response => setStudents(response.data)) 
         .catch(error => console.error("Lỗi khi fetch danh sách:", error)); 
}, []);