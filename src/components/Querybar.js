import React, { useState } from 'react';
import axios from 'axios';

const Querybar = ({ selectedRegion, setFilteredCountries }) => {
    
  const subregions = {
    Africa: ['Eastern Africa', 'Middle Africa', 'Northern Africa', 'Southern Africa', 'Western Africa'],
    Americas: ['Caribbean', 'Central America', 'North America', 'South America'],
    Asia: ['Central Asia', 'Eastern Asia', 'Southern Asia', 'South-Eastern Asia', 'Western Asia'],
    Europe: ['Eastern Europe', 'Northern Europe', 'Southern Europe', 'Western Europe'],
    Oceania: ['Australia and New Zealand', 'Melanesia', 'Micronesia', 'Polynesia']
  };

  const [activeButton, setActiveButton] = useState('all');


  const handleClick = async (subregion) => {
    const response = await axios.get(`https://restapicodingchallenge-backend.onrender.com/api/subregion/${subregion}`);
    setFilteredCountries(response.data.countries);
  };

  let title = 'Filter by Region';
  if (selectedRegion) {
    title = selectedRegion;
  }

  const handleTitleClick = async () => {
    if (selectedRegion) {
      const response = await axios.get(`https://restapicodingchallenge-backend.onrender.com/api/region/${selectedRegion}`);
      setFilteredCountries(response.data.countries);
    }
    setActiveButton('all');    
  }

  return (
<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border-b-2 w-full" data-testid="Querybar-1" >
      <div
        className={`text-xl font-bold py-4 cursor-pointer ${
          activeButton === title ? 'text-pink-400' : 'text-gray-800'
        }`}
        onClick={handleTitleClick}
      >
        {title}
      </div>
      {selectedRegion && subregions[selectedRegion] && (
        <div className="flex flex-wrap justify-center sm:justify-start space-x-2">
          {subregions[selectedRegion].map((subregion, index) => (
            <button
              key={index}
              className={`${
                index === activeButton
                  ? 'bg-pink-400 text-white'
                  : 'bg-gray-800 text-white'
              } font-semibold py-2 px-4 rounded-full`}
              onClick={() => {
                setActiveButton(index);
                handleClick(subregion);
              }}
            >
              {subregion}
            </button>
          ))}
        </div>
      )}
      {!selectedRegion && (
        <div className="flex flex-wrap justify-center sm:justify-start space-y-2 sm:space-y-4 sm:space-x-2 mt-2 sm:mt-0">
          {Object.keys(subregions).map((region, index) => (
            <button
              key={index}
              className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-full"
              onClick={() => handleClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
  
};

export default Querybar;
