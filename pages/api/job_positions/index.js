// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET": {
      const jobPositions = await prisma.jobPositions.findMany();
      return res.status(200).json(jobPositions);
    }
    case "POST": {
      const { positionName } = req.body;
      const minSalary = parseInt(req.body.minSalary);
      const maxSalary = parseInt(req.body.maxSalary);

      const jobPosition = await prisma.jobPositions.create({
        data: {
          positionName,
          minSalary,
          maxSalary,
        },
      });

      return res.status(200).json(jobPosition);
    }
    default: {
      return res.status(404).json({ error: "Unhandled error" });
    }
  }
}
