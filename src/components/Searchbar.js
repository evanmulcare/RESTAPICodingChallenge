import React, { useState } from 'react';
import { BsSearch, BsFilterRight } from 'react-icons/bs';


const Searchbar = ({
  onSearchClick,
  selectedRegion,
  filteredCountries,
  backendData,
  setFilteredCountries,
  setSearchClicked
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterBox, setShowFilterBox] = useState(false);

  const [currency, setCurrency] = useState('');
  const [language, setLanguage] = useState('');
  const [independence, setIndependence] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleCurrencyChange = (event) => {
    const { value } = event.target;
    setCurrency(value);
  };

  const handleLanguageChange = (event) => {
    const { value } = event.target;
    setLanguage(value);
  };

  const handleIndependenceChange = (event) => {
    const { checked } = event.target;
    setIndependence(checked);
  };

  const handleSearch = () => {

    onSearchClick(
      searchTerm.toLowerCase(),
      currency.toLowerCase(), // convert to lowercase to ensure case-insensitivity
      language.toLowerCase(),
      independence
    );

  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterButtonClick = () => {
    const filtered = (selectedRegion ? filteredCountries : backendData.countries).filter(filterCountries);

    setShowFilterBox(true);
    setFilteredCountries(filtered);

  };

  const filterCountries = (country) => {
    // Filter by name
    if (searchTerm && !country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by currency
    let formattedCurrency = 'N/A';
    if (country.currencies) {
      for (let code in country.currencies) {
        formattedCurrency = country.currencies[code].name;
        break;
      }
    }
    if (currency && formattedCurrency.toLowerCase() !== currency.toLowerCase()) {
      return false;
    }

    const formattedLanguage = country.languages ? getLanguageName(country.languages) : 'N/A';
    function getLanguageName(languages) {
      for (let code in languages) {
        return languages[code];
      }
      return 'N/A';
    }

    // Filter by language
    if (language && !formattedLanguage.toLowerCase().includes(language.toLowerCase())) {
      return false;
    }

    // Filter by independence
    if (independence && !country.independent) {
      return false;
    }

    return true;
  };

  return (
    <nav className="flex px-4 py-2 justify-between">
      <div className="flex items-center flex-1">
        <div>
          <h1 className='text-sm font-semibold '>REST API Challenge</h1>
        </div>
      </div>

      <div className="relative flex-auto w-1/2">
        <input
          className="block w-full bg-gray-100 rounded-full pl-10 pr-12 py-2 focus:outline-blue-200"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="absolute right-0 inset-y-0 bottom-3 flex items-center pr-3">
          <BsSearch />
        </button>
      </div>

      <div className="flex items-center">
        <button className="flex items-center rounded-full p-2 px-10 hover:bg-gray-100 active:bg-gray-200" onClick={handleFilterButtonClick}>
          <BsFilterRight className="text-3xl" />
        </button>
      </div>

      {showFilterBox && (
        <div className="absolute top-12 right-12 bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-lg font-bold mb-4">Filter By</h2>

          <div className="absolute top-2 right-2">
            <button onClick={() => setShowFilterBox(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" aria-label="Close">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="currency" className="block font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select id="currency" name="currency" className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={currency} onChange={handleCurrencyChange}>
              <option value="">--Select Currency--</option>
              <option value="United States dollar">USD</option>
              <option value="Euro">EUR</option>
              <option value="British pound">GBP</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block font-medium text-gray-700 mb-2">
              Language
            </label>
            <select id="language" name="language" className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={language} onChange={handleLanguageChange}>
              <option value="">--Select Language--</option>

              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="independence"
                name="independence"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                checked={independence}
                onChange={handleIndependenceChange}
              />
              <label htmlFor="independence" className="ml-2 block text-sm font-medium text-gray-700">
                Independent
              </label>
            </div>
          </div>

          <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleFilterButtonClick}>
            Apply Filter
          </button>
        </div>
      )}

    </nav>
  );
};

export default Searchbar;
