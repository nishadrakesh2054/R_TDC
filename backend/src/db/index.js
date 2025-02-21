import { Sequelize } from "sequelize";
import "dotenv/config"; // Ensure environment variables are loaded

let sequelize;

if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // Path to the SQLite database file
    logging: false, // Disable logging or enable if needed
  });
  console.log("Using SQLite for development.");
} else {
  sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWORD,
    {
      host: process.env.DBHOST,
      dialect: "mysql",
      logging: false,
    }
  );
  console.log("Using MySQL for production.");
}

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database Connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();

export default sequelize;

// import { Sequelize } from "sequelize";
// import "dotenv/config"; // Ensure environment variables are loaded

// // Initialize Sequelize with MySQL
// const sequelize = new Sequelize(
//   process.env.DBNAME,
//   process.env.DBUSER,
//   process.env.DBPASSWORD,
//   {
//     host: process.env.DBHOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection to MySQL has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the MySQL database:", error);
//   }
// };

// connect();

// export default sequelize;
