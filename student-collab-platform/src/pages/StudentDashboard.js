import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const StudentDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Research Topic", status: "Completed", assignee: "Me", priority: "High" },
    { id: 2, title: "Create Wireframes", status: "In Progress", assignee: "Rahul", priority: "Medium" },
    { id: 3, title: "Initial Code Setup", status: "Pending", assignee: "Sneha", priority: "Low" },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");

  // --- Deadline Countdown Logic ---
  const deadline = new Date("2026-05-15");
  const today = new Date();
  const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

  // --- NEW: Add Task with Priority ---
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskName,
      status: "Pending",
      assignee: "Me",
      priority: newTaskPriority // New field
    };

    setTasks([...tasks, newTask]);
    setNewTaskName("");
    setNewTaskPriority("Low");
  };

  // --- NEW: Delete Task Function ---
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === "Completed" ? "Pending" : "Completed" } : task
    ));
  };

  const progressPercent = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === "Completed").length / tasks.length) * 100) 
    : 0;

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={deadlineBannerStyle}>
          <span>⏳ <strong>Project Deadline:</strong> May 15, 2026</span>
          <span style={{ backgroundColor: '#ff4d4d', padding: '5px 10px', borderRadius: '5px', color: 'white', fontWeight: 'bold' }}>
            {diffDays} Days Left
          </span>
        </div>

        <header style={{ marginBottom: '30px' }}>
          <h1>Student Portal Development</h1>
          <p style={{ color: '#666' }}>Manage tasks and track group progress.</p>
        </header>

        {/* Progress Section */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Current Progress: {progressPercent}%</h3>
            <button onClick={() => window.print()} style={printButtonStyle}>📄 Export Report</button>
          </div>
          <div style={progressBgStyle}>
            <div style={{ 
              ...progressFillStyle, 
              width: `${progressPercent}%`,
              background: progressPercent === 100 ? '#28a745' : '#4CAF50'
            }}></div>
          </div>
        </div>

        {/* Improved Add Task Form */}
        <div style={{ ...sectionStyle, marginTop: '20px' }}>
          <h3>+ Add New Task</h3>
          <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Enter task name..." 
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              style={inputStyle}
            />
            <select 
              value={newTaskPriority} 
              onChange={(e) => setNewTaskPriority(e.target.value)}
              style={selectStyle}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
            <button type="submit" style={addButtonStyle}>Add Task</button>
          </form>
        </div>

        {/* Task List Section */}
        <div style={{ marginTop: '30px' }}>
          <h3>Group Tasks ({tasks.length})</h3>
          {tasks.map(task => (
            <div key={task.id} style={taskWrapperStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <TaskCard taskName={task.title} assignee={task.assignee} status={task.status} />
                <span style={priorityBadgeStyle(task.priority)}>{task.priority}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => toggleStatus(task.id)} style={statusButtonStyle}>
                  Mark as {task.status === "Completed" ? "Pending" : "Complete"}
                </button>
                <button onClick={() => deleteTask(task.id)} style={deleteButtonStyle}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const deadlineBannerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #ff4d4d' };
const sectionStyle = { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' };
const progressBgStyle = { background: '#ddd', borderRadius: '10px', height: '15px', width: '100%', marginTop: '10px' };
const progressFillStyle = { height: '15px', borderRadius: '10px', transition: 'width 0.5s ease-in-out' };
const inputStyle = { flex: 2, padding: '12px', borderRadius: '5px', border: '1px solid #ddd', minWidth: '200px' };
const selectStyle = { flex: 1, padding: '12px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: 'white' };
const addButtonStyle = { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const printButtonStyle = { padding: '5px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' };
const taskWrapperStyle = { marginBottom: '15px', border: '1px solid #eee', borderRadius: '8px', padding: '15px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' };
const statusButtonStyle = { padding: '6px 12px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' };
const deleteButtonStyle = { padding: '6px 12px', backgroundColor: '#fff', border: '1px solid #ff4d4d', color: '#ff4d4d', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' };

const priorityBadgeStyle = (p) => ({
  fontSize: '10px',
  padding: '3px 8px',
  borderRadius: '10px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: p === 'High' ? '#ff4d4d' : p === 'Medium' ? '#ffa500' : '#5bc0de'
});

export default StudentDashboard;