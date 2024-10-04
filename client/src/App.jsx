import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_SERVER_URL;

  // Custom button names and their corresponding API endpoints
  const buttons = [
    
    { name: "Post", endpoint: `${baseUrl}/api/Post` },
    { name: "Community", endpoint: `${baseUrl}/api/Community` },
    { name: "Community Post", endpoint: `${baseUrl}/api/CommunityPost` },
    { name: "Community Post Comment", endpoint: `${baseUrl}/api/CommunityPostComment` },
    { name: "Community Report", endpoint: `${baseUrl}/api/CommunityReport` },
    { name: "Flags Profile", endpoint: `${baseUrl}/api/FlagsProfile` },
    { name: "Local Community Account", endpoint: `${baseUrl}/api/LocalCommunityAccount` },
    { name: "Post Comment", endpoint: `${baseUrl}/api/PostComment` },
    { name: "Post Report", endpoint: `${baseUrl}/api/PostReport` },
    { name: "Search Tags and Flags", endpoint: `${baseUrl}/api/SearchTagsAndFlags` },
    { name: "Tags Profile", endpoint: `${baseUrl}/api/TagsProfile` },
    { name: "User", endpoint: `${baseUrl}/api/User` },
  ];

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(buttons[0].endpoint); 
        setOutput(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data.");
        setOutput(null); 
      }
    };

    fetchData(); 
  }, []); 

  const handleClick = async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      setOutput(response.data);
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Failed to fetch data.");
      setOutput(null); // Clear previous output
    }
  };

  return (
    <div className="App">
      <div className="top-bar">
        {buttons.map((button, index) => (
          <button key={index} onClick={() => handleClick(button.endpoint)}>
            {button.name}
          </button>
        ))}
      </div>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {output && (
          <table>
            <thead>
              <tr>
                {Object.keys(output[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {output.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;