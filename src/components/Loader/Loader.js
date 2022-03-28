import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Hearts } from 'react-loader-spinner';

function Loader() {
  return <Hearts height="80" width="80" color="#00BFFF" ariaLabel="loading" />;
}

export default Loader;
