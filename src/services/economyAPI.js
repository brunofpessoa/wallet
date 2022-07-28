const BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getFinancialData = async () => {
  const response = await fetch(BASE_API);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getFinancialData;
