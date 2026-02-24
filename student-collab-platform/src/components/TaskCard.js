import React from 'react';

const TaskCard = ({ taskName, assignee, status }) => {
  // Logic to determine color based on status
  const getStatusColor = (s) => {
    if (s === "Completed") return "#28a745";
    if (s === "In Progress") return "#ffc107";
    return "#dc3545"; // Pending
  };

  return (
    <div style={cardStyle}>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{taskName}</h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Assigned to: {assignee}</p>
      </div>
      <div style={{
        backgroundColor: getStatusColor(status),
        color: 'white',
        padding: '5px 12px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {status}
      </div>
    </div>
  );
};

const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  width: '100%'
};

export default TaskCard; // THIS LINE IS ESSENTIAL