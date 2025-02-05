"use client";

import React, { useState, useEffect } from "react";
import JaaraInfo from "./JaaraInfo";
// import GetMonsterInfo from "./GetMonsterInfo";
import MonsterCard from "./Components/MonsterCard";


export default function Home() {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchMonsters = async () => {
        try {
          setLoading(true);
          const response = await fetch("/api/proxy?path=monsters/784");
          if (!response.ok) throw new Error("Failed to fetch monsters");
          const data = await response.json();
          setMonsters(data.results);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMonsters();
    }, []);

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


  return (
    <>
      <h1>Summoners War Monster Info</h1>
      {/* <JaaraInfo /> */}
      {/* <GetMonsterInfo /> */}
      {monsters.map((monster) => ( 
      <MonsterCard  key={monster.id} monster={monster}  />
      ))}
    </>
  );
}


