import pool from "./postgree.js";

export const checkPostgresConnection = async () => {
    try {
        const client = await pool.connect(); // Attempt to connect to the database
        console.log("PostgreSQL connected successfully");
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error("Error connecting to PostgreSQL:", err.stack);
        process.exit(1); // Exit the process if the connection fails
    }
};
