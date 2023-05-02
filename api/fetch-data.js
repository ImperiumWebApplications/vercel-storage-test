import { createKysely } from "@vercel/postgres-kysely";

const db = createKysely();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch data from the table
      const rows = await db
        .selectFrom("test_table")
        .select(["id", "custom_value_1", "custom_value_2"])
        .execute();

      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching data from the database" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
