import { Link, useParams } from "react-router-dom";
import data from '../data.json';
import { AuroraBackground } from "../components/ui/aurora";

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
        <>
            <main>
                <header>

                    <h1 className="mt-2 text-white text-center text-4xl font-medium tracking-tight md:text-4xl">
                        Company : {company.Company} <br /> Country : {company.Country}
                    </h1>
                </header>

                <h2
                    className="mt-8 text-slate-400 text-left text-[12px] font-medium tracking-tight md:text-2xl">
                    Other Companies from {company.Country}:
                    <ul className="flex flex-wrap gap-2 mt-12">
                        {otherCompanies.length > 0 ? (
                            otherCompanies.map((item, index) => (
                                <Link key={index} to={`/display/${item.Company}`} >
                                    <li >
                                        {item.Company}
                                    </li>
                                </Link>

                            ))
                        ) : (
                            <p>No other companies found from {company.Country}</p>
                        )}
                    </ul>
                </h2>
            </main>
            <AuroraBackground children={undefined} className="-z-10 absolute inset-0 overflow-hidden" />
        </>

    );
}

export default Company;

