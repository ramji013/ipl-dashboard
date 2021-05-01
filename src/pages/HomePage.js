import { React, useEffect, useState } from "react";
import "../css/TeamPage.scss";
import { TeamTile } from "../components/TeamTile";
import '../css/HomePage.scss';

export const HomePage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchAllTeam = async () => {
      const response = await fetch(`http://localhost:8080/team`);
      const data = await response.json();
      setTeams(data);
    };
    fetchAllTeam();
  },[]);

  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className="app-name"> IPL Dashboard </h1>
      </div>
      <div className="team-grid">
        {teams.map(team => (
          <TeamTile key={team.id} teamName={team.teamName} />
        ))}
      </div>
    </div>
  );
};
