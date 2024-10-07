import React from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../data.json';

interface StockData {
  "Company": string;
  "Stock Price (2015)": string;
  "Stock Price (2016)": string;
  "Stock Price (2017)": string;
  "Stock Price (2018)": string;
  "Stock Price (2019)": string;
  "Stock Price (2020)": string;
  "Stock Price (2021)": string;
  "Stock Price (2022)": string;
  "Stock Price (2023)": string;
  "Stock Price (2024)": string;
}

const ComputationStockPriceGraph: React.FC = () => {
  const { company } = useParams<{ company: string }>();

  const companyData: StockData | undefined = data.find((item: StockData) =>
    item.Company.toLowerCase().trim() === company?.toLowerCase().trim()
  );

  if (!companyData) {
    return <div>Company not found</div>;
  }

  // Utility function to parse stock price strings
  const parseStockPrice = (priceString: string): number => {
    const numericString = priceString.replace(/[^0-9.-]+/g, "");
    let price = parseFloat(numericString);
    if (priceString.includes('M')) {
      price *= 1_000_000;
    }
    return price;
  };

  const stockPrices = [
    { year: "2015", price: parseStockPrice(companyData["Stock Price (2015)"]) },
    { year: "2016", price: parseStockPrice(companyData["Stock Price (2016)"]) },
    { year: "2017", price: parseStockPrice(companyData["Stock Price (2017)"]) },
    { year: "2018", price: parseStockPrice(companyData["Stock Price (2018)"]) },
    { year: "2019", price: parseStockPrice(companyData["Stock Price (2019)"]) },
    { year: "2020", price: parseStockPrice(companyData["Stock Price (2020)"]) },
    { year: "2021", price: parseStockPrice(companyData["Stock Price (2021)"]) },
    { year: "2022", price: parseStockPrice(companyData["Stock Price (2022)"]) },
    { year: "2023", price: parseStockPrice(companyData["Stock Price (2023)"]) },
    { year: "2024", price: parseStockPrice(companyData["Stock Price (2024)"]) },
  ];

  const stockChanges = stockPrices.map((item, index) => {
    if (index === 0) {
      return { year: item.year, change: 0 };
    }
    const previousPrice = stockPrices[index - 1].price;
    const change = ((item.price - previousPrice) / previousPrice) * 100;
    return { year: item.year, change: change.toFixed(2) };
  });

  return (
    <div>
      <h2 className="text-center text-lg font-medium mt-4">{companyData.Company} Stock Price Yearly Change</h2>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={stockChanges}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="change" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <table className="min-w-full table-auto mt-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {stockChanges.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.year}</td>
              <td className="border px-4 py-2">{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComputationStockPriceGraph;
