import { createKysely } from "@vercel/postgres-kysely";

const db = createKysely();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fieldName1, fieldName2 } = req.body;

    try {
      await db
        .insertInto("test_table")
        .values({ custom_value_1: fieldName1, custom_value_2: fieldName2 })
        .execute();

      res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error inserting data into the database" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
