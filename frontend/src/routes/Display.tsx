import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AuroraBackground } from "../components/ui/aurora";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import data from "../data.json";
import { motion } from "framer-motion";

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
  const [searchData, setSearchData] = useState("");
  const [filteredData, setFilteredData] = useState<CompanyData[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1); // Track focused item
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown container
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // Ref for each dropdown item



  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex !== -1 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedIndex]);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prevIndex) =>
          prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "Enter" && focusedIndex !== -1) {
        // Handle Enter key for the focused item
        window.location.href = `/display/${filteredData[focusedIndex].Company}`;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, filteredData]);

  const placeholders = [
    "What Company you want to find...",
    "Type the Company name...",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setSearchData(input);

    const filtered = data
      .filter((data) => data.Company.toLowerCase().includes(input))
      .sort((a, b) => {
        const aIndex = a.Company.toLowerCase().indexOf(input);
        const bIndex = b.Company.toLowerCase().indexOf(input);

        if (aIndex === 0 && bIndex === 0) {
          // If both companies start with the input, sort them alphabetically
          return a.Company.localeCompare(b.Company);
        } else if (aIndex === 0) {
          // If only the first company starts with the input, it should come first
          return -1;
        } else if (bIndex === 0) {
          // If only the second company starts with the input, it should come first
          return 1;
        } else {
          // If neither company starts with the input, sort alphabetically by occurrence
          return a.Company.localeCompare(b.Company);
        }
      });

    setFilteredData(filtered);
  };


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <AuroraBackground className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col justify-center items-center px-4 w-screen h-screen relative">
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-slate-300 font-semibold">
          Type the company name
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        {searchData && (
          <div
            className="w-full relative max-w-[576px] h-28 overflow-auto mx-auto bg-white flex flex-col text-sm sm:text-base z-50 border-none text-black pl-4 sm:pl-10 pr-20"
            ref={dropdownRef} // Attach ref to dropdown container
          >
            {filteredData.map((item, index) => (
              <Link to={`/display/${item.Company}`} key={index}>
                <div
                  className={`w-auto hover:bg-slate-200 ${focusedIndex === index ? "bg-slate-200" : ""
                    }`}
                  role="option"
                  tabIndex={0}
                  ref={(el) => (itemRefs.current[index] = el)} // Attach ref to each item
                >
                  {item.Company}
                </div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </AuroraBackground>
  );
}
