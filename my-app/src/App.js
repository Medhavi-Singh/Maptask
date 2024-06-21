import React from 'react';
import './App.css';
import Map from './MapComponent';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <div className="relative w-full h-96">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default App;
