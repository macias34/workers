import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET": {
      const bosses = await prisma.bosses.findMany();
      return res.status(200).json(bosses);
    }
    default: {
      return res.status(404).json({ error: "Unhandled error" });
    }
  }
}
