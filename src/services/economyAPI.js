const BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getFinancialData = async () => {
  const response = await fetch(BASE_API);
  const data = await response.json();
  return data;
};

export default getFinancialData;
