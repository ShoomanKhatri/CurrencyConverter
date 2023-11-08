import { useEffect, useState } from "react";

function useCurrencyInfo() {
  const [rates, setRates] = useState({});

  useEffect(() => {
    const apiKey = "93akXUD60kFxx99QqEKLsrBnBXwQgXzF";
    const symbols = "EUR,GBP";
    const url = `https://api.apilayer.com/fixer/latest?base/symbols`;

    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            apikey: apiKey,
          },
        });
        const apiData = await res.json();
        setRates(apiData.rates); // Set only the rates object
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Fetch data once when the component mounts

  }, []); // Empty dependency array ensures the effect runs once on mount

  return rates;
}

export default useCurrencyInfo;
