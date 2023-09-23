import React, { useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai'

const CountryCard = (props) => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const formattedName = props.countryName.common ? props.countryName.common : 'N/A';
  const formattedCapital = props.countryCapital ? props.countryCapital[0] : 'N/A';
  const formattedPopulation = props.countryPopulation ? props.countryPopulation.toLocaleString() : 'N/A';
  const formattedTimezone = props.countryTimezones ? props.countryTimezones[0] : 'N/A';

  const formattedIndependant = props.countryIndependant ? 'Yes' : 'No';
  const formattedLanguage = props.countryLanguage ? getLanguageName(props.countryLanguage) : 'N/A';
  function getLanguageName(languages) {
    for (let code in languages) {
      return languages[code];
    }
    return 'N/A';
  }
  let formattedCurrency = 'N/A';
  if (props.countryCurrency) {
    for (let code in props.countryCurrency) {
      formattedCurrency = props.countryCurrency[code].name;
      break;
    }
  }

  return (
    <div
      className='flex flex-col h-full border text-left rounded-2xl overflow-hidden hover:border-pink-400 shadow-md'
      onClick={toggleModal}
    >
      <div className="h-1/2">
        <img src={props.countryFlag} alt={`${formattedName} flag`} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h2 className='text-xl font-bold py-4 hover:text-pink-400'>{formattedName}</h2>

        <h4 className="text-l font-bold py-4">Capital: {formattedCapital}</h4>
        <h4 className="text-l font-bold py-4">Population: {formattedPopulation}</h4>
      </div>
      {showModal && (
        
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-full lg:w-2/3 xl:w-1/2 h-full lg:h-2/3 xl:h-3/4 rounded-lg shadow-lg p-6">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"  onClick={toggleModal}> <AiOutlineClose /> </button>

            <div className="h-1/2">
              <img src={props.countryFlag} alt={`${formattedName} flag`} className="w-full h-full object-cover" />
            </div>
            <div className="h-1/2 flex flex-row">
              <h2 className="text-3xl font-bold pt-2 pr-4 lg:pr-40 text-gray-800">{formattedName}</h2>
              <div className="w-full lg:w-2/3 grid grid-cols-2 gap-4 pr-4 lg:pr-10">
                <div>
                  <div className="my-4">
                    <h4 className="text-xl font-bold pb-2 text-pink-400">Capital</h4>
                    <p className="text-lg">{formattedCapital}</p>
                  </div>
                  <div className="my-4">
                    <h4 className="text-xl font-bold pb-2 mt-4 text-pink-400">Population</h4>
                    <p className="text-lg">{formattedPopulation}</p>
                  </div>
                  <div className="my-4">
                    <h4 className="text-xl font-bold pb-2 mt-4 text-pink-400">Currency</h4>
                    <p className="text-lg">{formattedCurrency}</p>
                  </div>
                </div>
                <div>
                  <div className="my-4">
                    <h4 className="text-xl font-bold pb-2 mt-4 text-pink-400">Language</h4>
                    <p className="text-lg">{formattedLanguage}</p>
                  </div>
                  <div className="my-4">
                    <h4 className="text-xl font-bold pb-2 mt-4 text-pink-400">Timezone</h4>
                    <p className="text-lg">{formattedTimezone}</p>
                  </div>
                  <div className="my-4">
                    <h4 className="text-xl font-bold pb-2 mt-4 text-pink-400">Independant</h4>
                    <p className="text-lg">{formattedIndependant}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <button className="bg-cyan-400 text-white px-4 py-2 rounded-lg mt-4 self-end w-full hover:bg-cyan-600" onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default CountryCard;


