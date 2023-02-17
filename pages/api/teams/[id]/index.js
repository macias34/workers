// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/prisma/db";
export default async function handler(req, res) {
  const method = req.method;
  const { id } = req.query;
  const team = await prisma.teams.findUnique({
    where: {
      teamID: parseInt(id),
    },
    include: {
      Workers: true,
    },
  });
  if (!team) return res.status(404).json({ error: "Not found." });
  switch (method) {
    case "GET": {
      return res.status(200).json(team);
    }

    case "PUT": {
      const { teamName, address } = req.body;

      const teamToReturn = await prisma.teams.update({
        where: {
          teamID: parseInt(id),
        },
        data: {
          teamName,
          address,
        },
      });

      return res.status(200).json(teamToReturn);
    }
    case "DELETE": {
      if (team.Workers.length > 0) {
        return res.json({
          error: "Zespół nie może być usunięty, jeżeli ma w nim pracowników.",
        });
      }
      await prisma.teams.delete({
        where: {
          teamID: parseInt(id),
        },
      });

      return res.status(200).json("Team removed successfully.");
    }
    default:
      break;
  }
}
