import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import "../css/TeamPage.scss";
import { PieChart } from 'react-minimal-pie-chart';


export const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();
  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`http://localhost:8080/team/${teamName}`);
      const data = await response.json();

      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Team not found</h1>;
  }
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name"> {team.teamName}</h1>
      </div>
      <div className="win-loss">
          Win / Losses

          <PieChart
  data={[
    { title: 'Wins', value: team.totalWins, color: '#4da375' },
    { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#e15454' }
  ]}
/>
      </div>
      <div className="match-detail">
      <h3> Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map((match) => (
        <MatchSmallCard match={match} teamName={team.teamName} />
      ))}
      <div className="more-link">
        <a href="#">More ></a>
      </div>
    </div>
  );
};

//export default TeamPage;
