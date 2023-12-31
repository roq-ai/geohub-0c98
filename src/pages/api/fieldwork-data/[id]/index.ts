import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { fieldworkDataValidationSchema } from 'validationSchema/fieldwork-data';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.fieldwork_data
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFieldworkDataById();
    case 'PUT':
      return updateFieldworkDataById();
    case 'DELETE':
      return deleteFieldworkDataById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFieldworkDataById() {
    const data = await prisma.fieldwork_data.findFirst(convertQueryToPrismaUtil(req.query, 'fieldwork_data'));
    return res.status(200).json(data);
  }

  async function updateFieldworkDataById() {
    await fieldworkDataValidationSchema.validate(req.body);
    const data = await prisma.fieldwork_data.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFieldworkDataById() {
    const data = await prisma.fieldwork_data.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
