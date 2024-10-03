import { useState } from "react";
import { AuroraBackground } from "../components/ui/aurora";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import data from "../data.json";

interface CompanyData {
  "SL No": number;
  Company: string;
  Country: string;
  "Country Code": string;
  "Market Cap": string;
  Diversity: number;
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
  "Expense (2015)": string;
  "Expense (2016)": string;
  "Expense (2017)": string;
  "Expense (2018)": string;
  "Expense (2019)": string;
  "Expense (2020)": string;
  "Expense (2021)": string;
  "Expense (2022)": string;
  "Expense (2023)": string;
  "Expense (2024)": string;
  "Revenue (2015)": string;
  "Revenue (2016)": string;
  "Revenue (2017)": string;
  "Revenue (2018)": string;
  "Revenue (2019)": string;
  "Revenue (2020)": string;
  "Revenue (2021)": string;
  "Revenue (2022)": string;
  "Revenue (2023)": string;
  "Revenue (2024)": string;
  "Market share (2015)": number;
  "Market share (2016)": number;
  "Market share (2017)": number;
  "Market share (2018)": number;
  "Market share (2019)": number;
  "Market share (2020)": number;
  "Market share (2021)": number;
  "Market share (2022)": number;
  "Market share (2023)": number;
  "Market share (2024)": number;
}


export function Display() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchData, setSearchData] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredData, setFilteredData] = useState<CompanyData[]>([]); // Initial state is an empty array of CompanyData objects

  const placeholders = [
    "Type the Country name...",
    "Type the Company name..."

  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    const filtered = data.filter(data => data.Company.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredData(filtered)
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="flex flex-col justify-center items-center px-4 w-screen h-screen relative">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-slate-300 font-semibold">
        Type the company name
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {searchData && (
        <div className="w-full relative max-w-[576px] h-28 overflow-auto mx-auto bg-white flex flex-col text-sm sm:text-base z-50 border-non text-black pl-4 sm:pl-10 pr-20">
          {filteredData.map((item, index) => {
            return <span className="w-full max-w-[576px] hover:bg-slate-200" key={index}>
              {item.Company}
            </span>
          })}
        </div>
      )}
      <AuroraBackground
        className="-z-10 absolute inset-0"
        children={undefined}
      />
    </div>
  );
}

