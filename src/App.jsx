import React, { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('NPR');
  const [to, setTo] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo();

  const currencyOptions = Object.keys(currencyInfo);
  // console.log(currencyOptions);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    const sourceRate = currencyInfo[from];
    const targetRate = currencyInfo[to];

    if (sourceRate && targetRate) {
      const result = (amount / sourceRate) * targetRate;
      setConvertedAmount(result);
    }
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('https://norsecorp.com/wp-content/uploads/2019/11/rat.jpg')`, backgroundSize: 'cover' }}>
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e) => {
            e.preventDefault();
            convert();
          }} id='main_form'>

            <div className="w-full mb-1">
              <InputBox
                id="handlingUserInputData"
                label="From"
                amount={amount}
                currencyOptions={currencyOptions} // Changed 'currencyOption' to 'currencyOptions'
                onCurrencyChange={(currency) => setFrom(currency)}
                selectedCurrency={from} // Changed 'selectCurrency' to 'selectedCurrency'
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-green-600 text-white px-2 py-0.5" onClick={swap}>
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                id="handlingOutputData"
                label="To"
                amount={convertedAmount}
                currencyOptions={currencyOptions} // Changed 'currencyOption' to 'currencyOptions'
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to} // Changed 'selectCurrency' to 'selectedCurrency'
                amountDisabled // Removed 'amountDisable' as a prop
              />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
