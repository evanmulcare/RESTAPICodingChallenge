import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import Querybar from '../components/Querybar';


const ContinentCountries = ({setFilteredCountries, selectedRegion, filteredCountries, searchClicked}) => {

  return (
    <div className="flex h-screen">
      <div></div>

      <div>

        <Querybar selectedRegion={selectedRegion} setFilteredCountries={setFilteredCountries} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredCountries.length === 0 ? (
          searchClicked ? (
            <div className="flex justify-center items-center  h-full">
              <p className="text-lg font-medium text-gray-500">No results found.</p>
            </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-lg font-medium text-gray-500">Loading...</p>
                </div>
              )
            ) : (
            filteredCountries.map((country, i) => (
              <CountryCard
              key={i}
              countryName={country.name}
              countryCapital={country.capital}
              countryPopulation={country.population}
              countryFlag={country.flag}
              countryCurrency={country.currencies}
              countryLanguage={country.languages}
              countryIndependant={country.independent}
              countryLandlocked = {country.landlocked}
              countryTimezones = {country.timezones}
              />
            ))
          )}
        </div>



      </div>
    </div>
  );
};

export default ContinentCountries;

