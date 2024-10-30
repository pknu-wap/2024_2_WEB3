// AlcoholList.jsx
import React from "react";
import "./AlcoholList.css";

function AlcoholList({ alcohols = [] }) {
  return (
    <div className="alcohol-list-container">
      {alcohols.map((alcohol) => (
        <div key={alcohol.id} className="alcohol-card">
          {/* <img
            src={alcohol.image || "https://via.placeholder.com/80"}
            alt={alcohol.name}
            className="alcohol-image"
          /> */}
          <div className="alcohol-info">
            <h3 className="alcohol-name">{alcohol.name}</h3>
            <p className="alcohol-description">{alcohol.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlcoholList;
