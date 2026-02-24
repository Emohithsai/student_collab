import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const TeacherDashboard = () => {
  // 1. Using State for groups so we can update/delete them
  const [projectGroups, setProjectGroups] = useState([
    { id: 1, name: "Team Cyber", lead: "Alice", progress: 85, status: "On Track", feedback: "" },
    { id: 2, name: "Data Wizards", lead: "Bob", progress: 40, status: "Delayed", feedback: "" },
    { id: 3, name: "App Builders", lead: "Charlie", progress: 100, status: "Submitted", feedback: "Excellent work!" },
    { id: 4, name: "Cloud Nine", lead: "David", progress: 15, status: "Delayed", feedback: "" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // --- Update Feedback Function ---
  const updateFeedback = (id, newText) => {
    setProjectGroups(projectGroups.map(group => 
      group.id === id ? { ...group, feedback: newText } : group
    ));
  };

  // --- Delete Group Function ---
  const deleteGroup = (id) => {
    if (window.confirm("Are you sure you want to remove this group?")) {
      setProjectGroups(projectGroups.filter(group => group.id !== id));
    }
  };

  // --- NEW: Download CSV Report Function ---
  const downloadCSV = () => {
    const headers = "Group Name,Team Lead,Progress,Status,Feedback\n";
    const csvContent = projectGroups.map(g => 
      `${g.name},${g.lead},${g.progress}%,${g.status},"${g.feedback}"`
    ).join("\n");
    
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Class_Report_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  // Logic for dynamic stats
  const totalGroups = projectGroups.length;
  const avgProgress = totalGroups > 0 
    ? Math.round(projectGroups.reduce((acc, curr) => acc + curr.progress, 0) / totalGroups) 
    : 0;
  const pendingReviews = projectGroups.filter(g => g.status === "Submitted").length;

  // Filter groups based on search
  const filteredGroups = projectGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.lead.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1>Teacher Dashboard</h1>
            <p style={{ color: '#666' }}>Managing {totalGroups} project teams</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
             {/* Combined Print and CSV functionality */}
             <button onClick={() => window.print()} style={secondaryButtonStyle}>📄 Print View</button>
             <button onClick={downloadCSV} style={exportButtonStyle}>📊 Download CSV</button>
             <button style={primaryButtonStyle}>+ Assign New Project</button>
          </div>
        </header>

        {/* Dynamic Quick Stats Section */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={statBoxStyle}><h3>{totalGroups}</h3><p>Active Groups</p></div>
          <div style={statBoxStyle}><h3>{avgProgress}%</h3><p>Avg. Progress</p></div>
          <div style={statBoxStyle}><h3>{pendingReviews}</h3><p>Pending Reviews</p></div>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Search by group name or lead..." 
            style={searchStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} style={clearButtonStyle}>Clear</button>
          )}
        </div>

        {/* Group Tracker Table */}
        <div style={tableContainerStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                <th style={tableHeaderStyle}>Group Name</th>
                <th style={tableHeaderStyle}>Team Lead</th>
                <th style={tableHeaderStyle}>Progress</th>
                <th style={tableHeaderStyle}>Teacher Feedback</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map((group) => (
                <tr key={group.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tableCellStyle}><strong>{group.name}</strong></td>
                  <td style={tableCellStyle}>{group.lead}</td>
                  <td style={{ ...tableCellStyle, width: '180px' }}>
                    <div style={progressBgStyle}>
                      <div style={{ 
                        background: group.progress === 100 ? '#28a745' : group.progress < 40 ? '#dc3545' : '#ffc107', 
                        width: `${group.progress}%`, 
                        height: '10px', 
                        borderRadius: '5px'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '11px' }}>{group.progress}% Complete</span>
                  </td>
                  
                  <td style={tableCellStyle}>
                    <input 
                      type="text"
                      placeholder="Type feedback..."
                      value={group.feedback}
                      onChange={(e) => updateFeedback(group.id, e.target.value)}
                      style={feedbackInputStyle}
                    />
                  </td>

                  <td style={tableCellStyle}>
                    <span style={statusBadgeStyle(group.status)}>
                      {group.status}
                    </span>
                  </td>

                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <button style={actionButtonStyle}>View</button>
                        <button 
                          onClick={() => deleteGroup(group.id)} 
                          style={{ ...actionButtonStyle, color: 'red' }}
                        >
                          Delete
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredGroups.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#999', fontSize: '18px' }}>No matches found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function for dynamic status colors
const statusBadgeStyle = (status) => ({
  padding: '5px 10px', 
  borderRadius: '15px', 
  fontSize: '11px',
  fontWeight: 'bold',
  color: '#fff',
  backgroundColor: status === 'Submitted' ? '#007bff' : status === 'On Track' ? '#28a745' : status === 'Delayed' ? '#dc3545' : '#6c757d'
});

// Styles
const statBoxStyle = { padding: '20px', background: 'white', borderRadius: '10px', flex: 1, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' };
const searchStyle = { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' };
const clearButtonStyle = { padding: '0 15px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const tableContainerStyle = { background: 'white', borderRadius: '10px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflowX: 'auto' };
const progressBgStyle = { background: '#eee', borderRadius: '5px', width: '100%', height: '10px', marginBottom: '4px' };
const tableHeaderStyle = { padding: '15px', borderBottom: '2px solid #f4f4f4', fontSize: '14px' };
const tableCellStyle = { padding: '15px', fontSize: '14px' };
const primaryButtonStyle = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const secondaryButtonStyle = { padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const exportButtonStyle = { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const actionButtonStyle = { padding: '5px 8px', cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' };
const feedbackInputStyle = { width: '100%', border: 'none', borderBottom: '1px solid #ddd', padding: '5px', fontSize: '13px', outline: 'none', background: 'transparent' };

export default TeacherDashboard;