import React, {useState} from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ isExpanded, onToggle, handleRegionClick }) => {

  const [selectedTab, setSelectedTab] = useState('');

  
  const continents = [
    'Africa',
    'Asia',
    'Europe',
    'Oceania',
    'Americas',
  ];

  const categories = [
    'Quiz',
    'Helper'
  ];

  const other = [
    'Contact'
  ]

  const navigate = useNavigate();


  return (
    <div className="w-full lg:block h-screen text-gray-800">
      <div className="w-full h-full p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button className="text-xl font-bold" onClick={onToggle}>
            {isExpanded ? < AiOutlineClose /> : < AiOutlineMenu />}
          </button>
        </div>
        {isExpanded && (
          <>
            <section className="mb-4">

              <button
                 className={`block py-1 px-2 text-left hover:bg-gray-100 hover:text-pink-400 rounded mb-1 w-full 
                 ${selectedTab === '' ? 'bg-gray-800 text-white hover:bg-gray-600 hover:text-pink-400 selected' : ''}`}

                onClick={() => {navigate('/'); setSelectedTab('');}}
              >
                All Countries
              </button>

              <hr className="my-2" />
            </section>

            <section className="mb-4">
              <h3 className="mb-2 font-bold">Continents</h3>
              {continents.map((continent, i) => (
                <button
                  key={i}
                  className={`block py-1 px-2 text-left hover:bg-gray-100 hover:text-pink-400 rounded mb-1 w-full 
                  ${selectedTab === continent ? 'bg-gray-800 text-white hover:bg-gray-600 hover:text-pink-400 selected' : ''}`}
          
                  onClick={() => {handleRegionClick(continent);  setSelectedTab(continent);} }
                >
                  {continent}
                </button>
              ))}
              <hr className="my-2" />
            </section>

            <section className="mb-4">
              <h3 className="mb-2 font-bold">Tests</h3>
              <button

                className={`block py-1 px-2 text-left hover:bg-gray-100 hover:text-pink-400 rounded mb-1 w-full 
                ${selectedTab === 'Tests' ? 'bg-gray-800 text-white hover:bg-gray-600 hover:text-pink-400 selected' : ''}`}

                onClick={() => {navigate('/quiz'); setSelectedTab('Tests');}}
              >
                Quiz
              </button>
             
              <hr className="my-2" />
            </section>

            <section className="mb-4">
              <button

              className={`block py-1 px-2 text-left hover:bg-gray-100 hover:text-pink-400 rounded mb-1 w-full 
              ${selectedTab === 'Contact' ? 'bg-gray-800 text-white hover:bg-gray-600 hover:text-pink-400 selected' : ''}`}

              onClick={() => {navigate('/contact'); setSelectedTab('Contact');}}
              >
                Contact
              </button>
              <hr className="my-2" />
            </section>

            <section>
              <p className="text-center text-sm text-gray-500 italic">
                Evan Mulcare -  REST API Challenge <span className='text-pink-400'>2023</span>
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
