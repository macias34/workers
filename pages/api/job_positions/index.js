// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET": {
      const jobPositions = await prisma.jobPositions.findMany();
      return res.status(200).json(jobPositions);
    }

    default: {
      return res.status(404).json({ error: "Unhandled error" });
    }
  }
}
