// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query;
  const worker = await prisma.workers.findUnique({
    where: {
      workerID: parseInt(id),
    },
  });
  if (!worker) return res.status(404).json({ error: "Not found." });
  switch (method) {
    case "GET": {
      return res.status(200).json(worker);
    }

    case "PUT": {
      const {
        surname,
        name,
        jobPositionID,
        bossID,
        employedSince,
        baseSalary,
        bonusSalary,
        teamID,
      } = req.body;

      const boss = await prisma.bosses.findUnique({
        where: {
          workerID: parseInt(bossID),
        },
      });

      await prisma.bosses.update({
        where: {
          workerID: parseInt(worker.workerID),
        },
        data: {
          workerID: worker.workerID,
          surname,
          name,
        },
      });

      const workerToReturn = await prisma.workers.update({
        where: {
          workerID: parseInt(id),
        },
        data: {
          surname,
          name,
          jobPositionID: parseInt(jobPositionID),
          bossID: parseInt(bossID),
          employedSince: new Date(employedSince),
          baseSalary: parseInt(baseSalary),
          bonusSalary: bonusSalary ? parseInt(bonusSalary) : 0,
          teamID: parseInt(teamID),
        },
        include: {
          JobPositions: true,
          Bosses: true,
          Teams: true,
        },
      });

      return res.status(200).json(workerToReturn);
    }
    case "DELETE": {
      const boss = await prisma.bosses.findUnique({
        where: {
          workerID: parseInt(worker.workerID),
        },
        include: {
          Workers: true,
        },
      });

      if (boss?.Workers?.length > 0) {
        return res.json({
          error: "Nie możesz usunąć pracownika jeżeli jest czyimś szefem.",
        });
      }

      await prisma.workers.delete({
        where: {
          workerID: parseInt(id),
        },
      });

      await prisma.bosses.delete({
        where: {
          workerID: parseInt(id),
        },
      });

      return res.status(200).json("Worker removed successfully.");
    }
    default:
      break;
  }
}
