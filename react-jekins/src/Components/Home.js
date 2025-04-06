import React, { useState } from 'react';

function Home() {
  const [userName, setUserName] = useState("Sir"); // Set default user name

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Hello, {userName}!</h1>
      <h2>Welcome to IKEA</h2>
      <img 
        src="/image/ikea.png" 
        alt="IKEA Logo" 
        style={{ width: "300px", marginTop: "20px" }} 
      />
    </div>
  );
}

export default Home;
