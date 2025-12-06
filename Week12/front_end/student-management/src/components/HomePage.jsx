import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };
    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        setStudents(prev => [...prev, res.data]);
        setName("");
        setAge("");
        setStuClass("");
        setMessage("Thêm học sinh thành công!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi thêm:", err);
        setMessage("Lỗi khi thêm học sinh!");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        setStudents(prevList => prevList.filter(s => s._id !== id));
        setMessage("Xóa học sinh thành công!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        setMessage("Lỗi khi xóa học sinh!");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      textAlign: 'center',
      color: 'white',
      marginBottom: '40px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '700',
      margin: '0 0 10px 0',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      maxWidth: '1200px',
      margin: '0 auto 30px auto'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'center'
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    input: {
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    addButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      gridColumn: '1 / -1'
    },
    searchContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '25px',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchInput: {
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      minWidth: '300px',
      outline: 'none'
    },
    sortButton: {
      backgroundColor: '#FF9800',
      color: 'white',
      padding: '12px 20px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    searchResult: {
      color: '#666',
      fontSize: '14px',
      fontWeight: '500'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      marginTop: '20px',
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    tableHeader: {
      backgroundColor: '#667eea',
      color: 'white',
      fontWeight: '600',
      padding: '16px',
      textAlign: 'left',
      fontSize: '16px'
    },
    tableRow: {
      backgroundColor: 'white',
      borderBottom: '1px solid #f0f0f0',
      transition: 'background-color 0.2s ease'
    },
    tableCell: {
      padding: '16px',
      color: '#333',
      fontSize: '15px'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    editButton: {
      backgroundColor: '#2196F3',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    message: {
      marginTop: '20px',
      padding: '14px 20px',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: '15px',
      animation: 'slideDown 0.3s ease'
    },
    messageSuccess: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    messageError: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎓 Quản lý học sinh</h1>
      </div>
      
      {/* Form thêm học sinh */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>➕ Thêm học sinh mới</h2>
        <form onSubmit={handleAddStudent} style={styles.form}>
          <input 
            type="text" 
            placeholder="Họ tên" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <input 
            type="number" 
            placeholder="Tuổi" 
            value={age} 
            onChange={e => setAge(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <input 
            type="text" 
            placeholder="Lớp" 
            value={stuClass} 
            onChange={e => setStuClass(e.target.value)} 
            required 
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <button 
            type="submit" 
            style={{...styles.button, ...styles.addButton}}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Thêm học sinh
          </button>
        </form>
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes('thành công') ? styles.messageSuccess : styles.messageError)
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Danh sách học sinh */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📋 Danh sách học sinh</h2>
        
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="🔍 Tìm kiếm theo tên..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <button 
            onClick={() => setSortAsc(prev => !prev)}
            style={styles.sortButton}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f57c00'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#FF9800'}
          >
            Sắp xếp: {sortAsc ? 'A → Z' : 'Z → A'}
          </button>
          {searchTerm && (
            <span style={styles.searchResult}>
              Tìm thấy: {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).length} học sinh
            </span>
          )}
        </div>

        <div style={{overflowX: 'auto'}}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Họ tên</th>
                <th style={styles.tableHeader}>Tuổi</th>
                <th style={styles.tableHeader}>Lớp</th>
                <th style={styles.tableHeader}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {[...students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))]
                .sort((a, b) => {
                  const nameA = a.name.toLowerCase();
                  const nameB = b.name.toLowerCase();
                  if (nameA < nameB) return sortAsc ? -1 : 1;
                  if (nameA > nameB) return sortAsc ? 1 : -1;
                  return 0;
                })
                .map((student) => (
                <tr 
                  key={student._id} 
                  style={styles.tableRow}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9ff'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={styles.tableCell}>{student.name}</td>
                  <td style={styles.tableCell}>{student.age}</td>
                  <td style={styles.tableCell}>{student.class}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button 
                        onClick={() => navigate(`/edit/${student._id}`)}
                        style={styles.editButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
                      >
                        ✏️ Sửa
                      </button>
                      <button 
                        onClick={() => handleDelete(student._id)}
                        style={styles.deleteButton}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;