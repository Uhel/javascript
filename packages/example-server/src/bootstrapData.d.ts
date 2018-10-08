import { Prisma } from './generated/prisma-client';

declare const bootstrapData: (prisma: Prisma) => Promise;

export default bootstrapData;
