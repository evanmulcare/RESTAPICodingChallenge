import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';

import AllCountries from './pages/AllCountries';
import ContinentCountries from './pages/ContinentCountries';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';



const App = () => {
  const [backendData, setBackendData] = useState({ countries: [] });

  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('/api');
        setBackendData(result.data)
        setFilteredCountries(result.data.countries);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchRegionData() {
      if (selectedRegion) {
        try {
          const result = await axios.get(`/api/region/${selectedRegion}`);
          setBackendData(result.data)
          setFilteredCountries(result.data.countries);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      } else if (selectedRegion === '') {
        try {
          const result = await axios.get('/api');
          setBackendData(result.data);
          setFilteredCountries(result.data.countries);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
    }
    fetchRegionData();
  }, [selectedRegion]);



  const handleRegionClick = (region) => {
    navigate('/continents');
    setSelectedRegion(region);
  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedRegion('');
    }
  }, [location]);


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchClick = (searchValue) => {
    const filtered = (selectedRegion ? filteredCountries : backendData.countries).filter((country) => {
      return (
        country.name.common.toLowerCase().includes(searchValue.toLowerCase()) 
      );
    });

    setFilteredCountries(filtered);
    setSearchClicked(true);

    // check if current path is not / or /continents
    if (location?.pathname !== '/' && location?.pathname !== '/continents') {
      // navigate to / path before searching
      navigate('/');
    }
  };


  return (
    <div className="flex h-screen">
      
      {/* SIDEBAR */}
      <div className={`${isExpanded
          ? 'fixed lg:static z-10 h-screen w-3/4 lg:w-1/6 bg-white overflow-y-auto'
          : 'lg:block lg:w-1/6'
        }`}>
        <Sidebar isExpanded={isExpanded} onToggle={toggleSidebar} handleRegionClick={handleRegionClick} />
      </div>


      <div className={` ${isExpanded ? 'lg:w-5/6 overflow-y-auto' : 'lg:w-5/5 overflow-y-auto'}`}>
        {/* NAVBAR */}
        <Searchbar
          onSearchClick={handleSearchClick}
          selectedRegion={selectedRegion}
          filteredCountries={filteredCountries}
          backendData={backendData}
          setFilteredCountries={setFilteredCountries}
          setSearchClicked={setSearchClicked}
          navigate={navigate}
          location={location}
        />
        <Routes>
          {/* Dash */}

          <Route path="/" element={<AllCountries filteredCountries={filteredCountries} searchClicked={searchClicked} />} />
          <Route path="/continents" element={<ContinentCountries setFilteredCountries={setFilteredCountries} selectedRegion={selectedRegion} filteredCountries={filteredCountries} searchClicked={searchClicked} />} />

          <Route path="/quiz" element={<Quiz />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
