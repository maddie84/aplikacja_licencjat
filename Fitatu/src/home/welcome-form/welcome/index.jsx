import React from "react";

const Welcome = ({ onClick }) => {
  return (
    <div>
      <button onClick={() => onClick(1)}>Next step</button>
    </div>
  );
};

export default Welcome;
