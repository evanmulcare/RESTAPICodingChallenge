import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';


const AllCountries = ({filteredCountries ,searchClicked }) => {

  return (
    <div className="flex h-screen">
      <div></div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredCountries.length === 0 ? (
            searchClicked ? <p>No results found.</p> : <p>Loading...</p>
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

export default AllCountries;
