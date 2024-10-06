import { Link, useParams } from "react-router-dom";
import data from '../data.json';
import ComputationTwoBar from "../components/ComputationTwoBar";

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

    const higherDiversity = data.filter(
        (item) => item.Diversity > company.Diversity && item.Company !== company.Company
    )

    return (
        <main className="relative bg-slate-950">
  <div className=" overflow-x-auto w-screen h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
    <header>
      <h1 className="mt-2 text-white text-center text-4xl font-medium tracking-tight md:text-4xl">
        {company ? `Company: ${company.Company} Country: ${company.Country}` : 'Loading...'}
      </h1>
    </header>

    <section className="mt-8 text-slate-400 ml-4 text-left text-[12px] font-medium tracking-tight md:text-2xl">
      {otherCompanies.length > 0 ? (
        <>
          <h2>1. Other Companies from {company.Country}:</h2>
          <ul className="flex flex-wrap gap-2 mt-12">
            {otherCompanies.map((item, index) => (
              <li key={index}>
                <Link to={`/display/${item.Company}`}>
                  {item.Company}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No other companies found from {company.Country}</p>
      )}

      {higherDiversity.length > 0 && (
        <>
          <h3 className="mt-8">2. Companies with higher diversity are:</h3>
          <br />
          <ComputationTwoBar/>
          <ul className="flex flex-wrap gap-2 mt-12">
            {higherDiversity.map((item, index) => (
              <li key={index}>
                <Link to={`/display/${item.Company}`}>
                  {item.Company} ({item.Country})
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  </div>
</main>


    );
}

export default Company;

