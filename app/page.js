"use client";

import React, { useState, useEffect } from "react";
import JaaraInfo from "./JaaraInfo";
// import GetMonsterInfo from "./GetMonsterInfo";
import MonsterCard from "./Components/MonsterCard";
import './page.css'


export default function Home() {
  const [monsterId, setMonsterId] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

const handleInputChange = (e) => {
  const value = e.target.value;

  if (value == '' || /^[0-9]=$/.test(value)) {
    setMonsterId(value);
    setValidationMessage('');
  } else {
    setValidationMessage('Please enter a valid number between 1 and 2682')
  }
};

const fetchMonster = async () => {
  if (!monsterId) {
    setValidationMessage('Monster ID must be a number.')
    return;
  }

  try {
    // setLoading(true);
    setError(null);

    const response = await fetch(`/api/proxy?path=monsters/${monsterId}`);
    if (!response.ok) throw new Error("Failed to fetch monsters");

    const data = await response.json();
      console.log("Fetched data:", data); // Debugging log
      
      setMonsters([data.results ? data.results[0] : data]); // Adjusted to handle 'results'
    } catch (err) {
      setError(err.message);
      setMonsters([]);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   const fetchMonsters = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`/api/proxy?path=monsters/${monsterId}`);
  //       if (!response.ok) throw new Error("Failed to fetch monsters");
  
  //       const data = await response.json();
  //       console.log("Fetched data:", data); // <-- Log API response

  
  //       setMonsters([data.results ? data.results[0] : data]); // <-- Ensure results exist
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //     fetchMonsters();
  //   }, []);

  //   if (loading)
  //   return (
  //     <Card className="w-full max-w-2xl">
  //       <CardContent className="p-6">
  //         <div>Loading monsters...</div>
  //       </CardContent>
  //     </Card>
  //   );

  // if (error)
  //   return (
  //     <Card className="w-full max-w-2xl">
  //       <CardContent className="p-6">
  //         <div className="text-red-500">Error: {error}</div>
  //       </CardContent>
  //     </Card>
  //   );


  // if (loading) return <p>Loading monsters...</p>;
  if (error) return <p>Error: {error}</p>;
  
  console.log("Monsters state:", monsters); // Log the final state
  
  // if (!monsters || monsters.length === 0) {
  //   return <p>No Monsters Found</p>;
  // }
  
  return (
    <div>
      <h2>Monster List</h2>
      {/* <pre>{JSON.stringify(monsters, null, 2)}</pre> Display fetched data */}
    
      { monsters.length > 0 ? (
      monsters.map((monster) => (
        <MonsterCard key={monster.id} monster={monster} />
      ))
      ) : (
        <p>No Monsters found.</p>
      )}
      <div className="MonsterSelector">
      <h3>Enter a number between 1 and 2682</h3>
  
      <input type="text" placeholder="Enter Monster ID"
      value={monsterId} 
      onChange={(e) => setMonsterId(e.target.value)}
      className="border p-2 mr-2 rounded"/>
      <button
      onClick={fetchMonster}
      className="bg-blue-500 text-white p-2 hover:bg-blue-700" >Submit</button>
      {validationMessage && <p className="text-red-500 mt-4">{validationMessage}</p>}
      </div>
    </div>
  );

  // return (
  //   <>
  //     <h1>Summoners War Monster Info</h1>      
  //     {monsters?.map((monster) => ( 
  //     <MonsterCard  key={monster.id} monster={monster}  />
  //     ))}
  //   </>
  // );
};


