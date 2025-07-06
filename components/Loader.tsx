import React from "react";
import { HashLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div>
      <HashLoader
        color="green"
        cssOverride={{}}
        loading
        speedMultiplier={1.5}
      />
    </div>
  );
};

export default Loader;
