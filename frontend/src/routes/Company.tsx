import { Link, useParams } from "react-router-dom";
import data from '../data.json';
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

const Company = () => {
    // Get the company name from the URL params and provide a default value if undefined
    const { Company: companyName } = useParams();
    const companyToSearch = companyName || '';  // Default fallback value

    // Find the company with the provided name
    const company = data.find((item) => item.Company.toLowerCase() === companyToSearch.toLowerCase());

    // If the company is not found, show an error message
    if (!company) {
        return (
            <div className="text-center">
                <h1>Company not found</h1>
            </div>
        );
    }

    // Filter companies with the same country
    const otherCompanies = data.filter(
        (item) => item.Country === company.Country && item.Company !== company.Company
    );

    return (
        <LampContainer>
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 text-gray-700 text-center text-4xl font-medium tracking-tight text-transparent md:text-4xl"
            >
                Company : {company.Company} <br /> Country : {company.Country}
            </motion.h1>
            <motion.h2
                initial={{ opacity: 0.2, y: 150 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    // delay: 0.3,
                    duration: 2,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-left text-[12px] font-medium tracking-tight text-transparent md:text-2xl">
                Other Companies from {company.Country}:
                <ul className="flex flex-wrap gap-2 mt-12">
                    {otherCompanies.length > 0 ? (
                        otherCompanies.map((item, index) => (
                            <Link to={`/display/${item.Company}`}>
                                <li key={index}>{item.Company}</li>
                            </Link>

                        ))
                    ) : (
                        <p>No other companies found from {company.Country}</p>
                    )}
                </ul>
            </motion.h2>
        </LampContainer>

    );
}

export default Company;

