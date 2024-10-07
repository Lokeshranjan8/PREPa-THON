import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import data from "../data.json";

interface CountryDiversity {
    Country: string;
    Diversity: number;
    count: number;
}

const ComputationTwoBar = () => {

    // Create a function to group the data by country and calculate the average diversity
    const diversityData: CountryDiversity[] = data.reduce((acc: CountryDiversity[], curr) => {
        const country = curr.Country;
        const diversity = curr.Diversity;

        // Check if the country already exists in the accumulator
        const countryIndex = acc.findIndex((item) => item.Country === country);
        if (countryIndex !== -1) {
            // Update existing country's diversity
            acc[countryIndex].Diversity += diversity;
            acc[countryIndex].count += 1;
        } else {
            // Add new country with initial diversity
            acc.push({ Country: country, Diversity: diversity, count: 1 });
        }
        return acc;
    }, []);

    // Calculate the average diversity for each country
    const diversityAverages = diversityData.map((item) => ({
        Country: item.Country,
        Diversity: (item.Diversity / item.count).toFixed(2), // Average diversity
    }));

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    width={1000}
                    height={400}
                    data={diversityAverages}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Diversity" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ComputationTwoBar;
