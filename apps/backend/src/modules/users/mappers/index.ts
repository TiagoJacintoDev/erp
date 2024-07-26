import { passwordHasher } from '../services';
import { PrismaUserMapper } from './PrismaUserMapper';

const prismaUserMapper = new PrismaUserMapper(passwordHasher);

export { prismaUserMapper };
