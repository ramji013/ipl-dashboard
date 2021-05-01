import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import "../css/TeamPage.scss";
import {PieChartComponent as PieChart} from '../components/PieChartComponent';


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
          <PieChart  totalWins={team.totalWins} totalMatches = {team.totalMatches}/>
      </div>
      <div className="match-detail">
      <h3> Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map((match) => (
        <MatchSmallCard match={match} teamName={team.teamName} />
      ))}
      <div className="more-link">
      <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}> More > </Link>
      </div>
    </div>
  );
};

//export default TeamPage;
