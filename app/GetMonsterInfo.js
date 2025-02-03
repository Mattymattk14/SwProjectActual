import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GetMonsterInfo = () => {
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

  if (loading)
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div>Loading monsters...</div>
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Summoners War Monsters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monsters.map((monster) => (
            <Card key={monster.id} className="p-4">
              <h3 className="font-bold text-lg">{monster.name}</h3>
              <div className="text-sm text-gray-600">
                <p>Stars: {monster.natural_stars}⭐</p>
                <p>Element: {monster.element}</p>
                <p>Type: {monster.archetype}</p>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GetMonsterInfo;
