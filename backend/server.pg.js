// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'testing',
//     password: '12345678',
//     port: 3000, 
// });


// client.connect()
//     .then(() => console.log('Connected to database'))
//     .catch(err => console.error('Connection error', err.stack));

//     const BATCH_SIZE = 100;  

// const insertBatchData = async (batchData) => {
//   const query = `
//     INSERT INTO company_data (
//         company_name, country, country_code, market_cap, diversity,
//         stock_price_2015, stock_price_2016, stock_price_2017, stock_price_2018,
//         stock_price_2019, stock_price_2020, stock_price_2021, stock_price_2022,
//         stock_price_2023, stock_price_2024, expense_2015, expense_2016, expense_2017,
//         expense_2018, expense_2019, expense_2020, expense_2021, expense_2022, expense_2023, 
//         expense_2024, revenue_2015, revenue_2016, revenue_2017, revenue_2018, revenue_2019, 
//         revenue_2020, revenue_2021, revenue_2022, revenue_2023, revenue_2024, market_share_2015, 
//         market_share_2016, market_share_2017, market_share_2018, market_share_2019, 
//         market_share_2020, market_share_2021, market_share_2022, market_share_2023, 
//         market_share_2024
//     ) 
//     VALUES ${batchData.map((_, idx) => `(${Array(45).fill(0).map((_, i) => `$${idx * 45 + i + 1}`).join(', ')})`).join(', ')}
//   `;

//   const flatData = batchData.flat();
  
//   try {
//     await client.query('BEGIN');  
//     await client.query(query, flatData);  
//     await client.query('COMMIT');  
//     console.log('Batch inserted successfully');
//   } catch (err) {
//     await client.query('ROLLBACK');  
//     console.error('Error inserting batch, rolling back:', err);
//   }
// };


// //get all companies present in a country 
// app.get('/companies/country/:country', async (req, res) => {
//   const countryName = req.params.country;  // Get country from the URL parameter
//   const query = 'SELECT * FROM company_data WHERE country = $1';  // SQL query to find companies by country

//   try {
//       const result = await client.query(query, [countryName]);
//       if (result.rows.length > 0) {
//           res.json(result.rows);  // Return the companies from the database as JSON
//       } else {
//           res.status(404).json({ message: `No companies found in ${countryName}` });
//       }
//   } catch (err) {
//       console.error('Error executing query', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// //with greater diversity
// app.get('/companies/diversity/:country', async (req,res) => {
//   const country=req.params.country;
//   const query = `
//         WITH avg_diversity_per_country AS (
//             SELECT 
//                 country,
//                 AVG(diversity) AS avg_diversity
//             FROM 
//                 company_data
//             WHERE 
//                 country = $1  -- Filter for the selected country
//             GROUP BY 
//                 country
//         )
//         SELECT 
//             c.*
//         FROM 
//             company_data c
//         JOIN 
//             avg_diversity_per_country a
//         ON 
//             c.country = a.country
//         WHERE 
//             c.diversity > a.avg_diversity
//         AND 
//             c.country = $1;  -- Filter for the selected country
//   `;
  
//   try{
//     const result=await client.query(query,[country]);
//     res.status(200).json(result.rows);

//   }
//   catch(err){
//     console.error('Error executing query',err);
//     res.status(500).json({error:'Internal Server Error'});
//   }

// })








// // Read and insert data from CSV with batching
// app.get("/insert_data", (req, res) => {
//   res.status(200).json({ message: "Data will  inserted successfully" });
//   let batch = [];
//   createReadStream("mock.csv")
//     .pipe(csv())
//     .on("data", (row) => {
//       const cleanNumeric = (value) => {
//         if (!value) return null;
//         value = value.replace(/[$,]/g, "");
//         if (value.includes("B")) {
//           return parseFloat(value) * 1e9;
//         } else if (value.includes("M")) {
//           return parseFloat(value) * 1e6;
//         } else if (value.includes("K")) {
//           return parseFloat(value) * 1e3;
//         }
//         return parseFloat(value);
//       };

//       const formattedData = [
//         row["Company"],
//         row["Country"],
//         row["Country Code"],
//         cleanNumeric(row["Market Cap"]),
//         row["Diversity"],
//         cleanNumeric(row["Stock Price (2015)"]),
//         cleanNumeric(row["Stock Price (2016)"]),
//         cleanNumeric(row["Stock Price (2017)"]),
//         cleanNumeric(row["Stock Price (2018)"]),
//         cleanNumeric(row["Stock Price (2019)"]),
//         cleanNumeric(row["Stock Price (2020)"]),
//         cleanNumeric(row["Stock Price (2021)"]),
//         cleanNumeric(row["Stock Price (2022)"]),
//         cleanNumeric(row["Stock Price (2023)"]),
//         cleanNumeric(row["Stock Price (2024)"]),
//         cleanNumeric(row["Expense (2015)"]),
//         cleanNumeric(row["Expense (2016)"]),
//         cleanNumeric(row["Expense (2017)"]),
//         cleanNumeric(row["Expense (2018)"]),
//         cleanNumeric(row["Expense (2019)"]),
//         cleanNumeric(row["Expense (2020)"]),
//         cleanNumeric(row["Expense (2021)"]),
//         cleanNumeric(row["Expense (2022)"]),
//         cleanNumeric(row["Expense (2023)"]),
//         cleanNumeric(row["Expense (2024)"]),
//         cleanNumeric(row["Revenue (2015)"]),
//         cleanNumeric(row["Revenue (2016)"]),
//         cleanNumeric(row["Revenue (2017)"]),
//         cleanNumeric(row["Revenue (2018)"]),
//         cleanNumeric(row["Revenue (2019)"]),
//         cleanNumeric(row["Revenue (2020)"]),
//         cleanNumeric(row["Revenue (2021)"]),
//         cleanNumeric(row["Revenue (2022)"]),
//         cleanNumeric(row["Revenue (2023)"]),
//         cleanNumeric(row["Revenue (2024)"]),
//         cleanNumeric(row["Market share (2015)"]),
//         cleanNumeric(row["Market share (2016)"]),
//         cleanNumeric(row["Market share (2017)"]),
//         cleanNumeric(row["Market share (2018)"]),
//         cleanNumeric(row["Market share (2019)"]),
//         cleanNumeric(row["Market share (2020)"]),
//         cleanNumeric(row["Market share (2021)"]),
//         cleanNumeric(row["Market share (2022)"]),
//         cleanNumeric(row["Market share (2023)"]),
//         cleanNumeric(row["Market share (2024)"]),
//       ];

//       batch.push(formattedData);

//       // Insert the batch when it reaches BATCH_SIZE
//       if (batch.length >= BATCH_SIZE) {
//         insertBatchData(batch);
//         batch = []; // Clear batch after insertion
//       }
//     })
//     .on("end", async () => {
//       // Insert any remaining rows
//       if (batch.length > 0) {
//         await insertBatchData(batch);
//       }
//       console.log("CSV file successfully processed");
//     });
// });