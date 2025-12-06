import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage("Lỗi khi tải thông tin học sinh!");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/students/${id}`, {
      name,
      age: Number(age),
      class: stuClass
    })
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        setMessage("Cập nhật thành công!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        setMessage("Lỗi khi cập nhật học sinh!");
      });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      maxWidth: '600px',
      width: '100%'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '30px',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#555',
      marginLeft: '4px'
    },
    input: {
      padding: '14px 16px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '10px'
    },
    button: {
      flex: 1,
      padding: '14px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    },
    updateButton: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    cancelButton: {
      backgroundColor: '#f44336',
      color: 'white'
    },
    message: {
      marginTop: '20px',
      padding: '14px 20px',
      borderRadius: '8px',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: '15px'
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
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    loadingCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '40px 60px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      textAlign: 'center'
    },
    loadingText: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#667eea',
      margin: '0'
    },
    spinner: {
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
      margin: '20px auto 0'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingCard}>
          <h2 style={styles.loadingText}>Đang tải...</h2>
          <div style={styles.spinner}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          <span>✏️</span>
          Chỉnh sửa thông tin học sinh
        </h1>
        
        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Họ tên</label>
            <input 
              type="text" 
              placeholder="Nhập họ tên" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Tuổi</label>
            <input 
              type="number" 
              placeholder="Nhập tuổi" 
              value={age} 
              onChange={e => setAge(e.target.value)} 
              required 
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Lớp</label>
            <input 
              type="text" 
              placeholder="Nhập lớp" 
              value={stuClass} 
              onChange={e => setStuClass(e.target.value)} 
              required 
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              style={{...styles.button, ...styles.updateButton}}
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              <span>✓</span>
              Cập nhật
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/")} 
              style={{...styles.button, ...styles.cancelButton}}
              onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
            >
              <span>✕</span>
              Hủy
            </button>
          </div>
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
    </div>
  );
}

export default EditStudent;