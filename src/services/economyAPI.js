const BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const getFinancialData = async () => {
  try {
    const response = await fetch(BASE_API);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default getFinancialData;
