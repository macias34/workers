// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET": {
      const workers = await prisma.workers.findMany({});
      return res.status(200).json(workers);
    }
    case "POST": {
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
      if (!boss) {
        await prisma.bosses.create({
          data: {
            workerID: parseInt(bossID),
            surname,
            name,
          },
        });
      }

      const worker = await prisma.workers.create({
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

      await prisma.bosses.create({
        data: {
          workerID: worker.workerID,
          surname,
          name,
        },
      });

      return res.status(200).json(worker);
    }
    default:
      break;
  }
}
