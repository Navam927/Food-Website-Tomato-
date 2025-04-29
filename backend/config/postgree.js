// filepath: c:\Users\Navam\Desktop\Projects\Food-Website-Tomato-\backend\config\postgree.js
import { Pool } from 'pg';


// Load environment variables
process.loadEnvFile('./secret.env');

// Create a new pool instance
const pool = new Pool({
    user: process.env.PG_USER, // PostgreSQL username
    host: process.env.PG_HOST, // Host (e.g., localhost)
    database: process.env.PG_DATABASE, // Database name
    password: process.env.PG_PASSWORD, // PostgreSQL password
    port: process.env.PG_PORT, // PostgreSQL port (default is 5432)
});

// Export the pool for use in other files
export default pool;