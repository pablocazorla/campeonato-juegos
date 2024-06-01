import fsPromises from "fs/promises";
import path from "path";
//import process from "process";

const dataFilePath = path.join(process.cwd(), "json/titlesOptions.json");

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log(dataFilePath);
    // Read the existing data from the JSON file
    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    res.status(200).json(objectData);
  } else if (req.method === "POST") {
    // Code for POST requests goes here
    try {
      // Read the existing data from the JSON file
      // const jsonData = await fsPromises.readFile(dataFilePath);
      // const objectData = JSON.parse(jsonData);

      // Get the data from the request body
      const newData = req.body;

      // Add the new data to the object

      // Convert the object back to a JSON string
      const updatedData = JSON.stringify(newData);

      // Write the updated data to the JSON file
      await fsPromises.writeFile(dataFilePath, updatedData);

      // Send a success response
      res.status(200).json({ message: "Data stored successfully" });
    } catch (error) {
      console.error(error);
      // Send an error response
      res.status(500).json({ message: "Error storing data" });
    }
  }
}
