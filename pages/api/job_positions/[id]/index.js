// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query;
  const jobPosition = await prisma.jobPositions.findUnique({
    where: {
      jobPositionID: parseInt(id),
    },
    include: {
      Workers: true,
    },
  });
  if (!jobPosition) return res.status(404).json({ error: "Not found." });
  switch (method) {
    case "GET": {
      return res.status(200).json(jobPosition);
    }

    case "PUT": {
      const { positionName } = req.body;
      const minSalary = parseInt(req.body.minSalary);
      const maxSalary = parseInt(req.body.maxSalary);

      const jobPositionToReturn = await prisma.jobPositions.update({
        where: {
          jobPositionID: parseInt(id),
        },
        data: {
          positionName,
          minSalary,
          maxSalary,
        },
      });

      return res.status(200).json(jobPositionToReturn);
    }
    case "DELETE": {
      if (jobPosition.Workers.length > 0) {
        return res.json({
          error: "Etat nie może być usunięty, jeżeli ma w nim pracowników.",
        });
      }
      await prisma.jobPositions.delete({
        where: {
          jobPositionID: parseInt(id),
        },
      });

      return res.status(200).json("Job Position removed successfully.");
    }
    default:
      break;
  }
}
