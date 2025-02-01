import { PrismaClient } from '@prisma/client';

import { seedPeriodsData, seedUsersData } from './seed-data';
import { hashPassword } from 'src/utils/hash';

const client = new PrismaClient();

const upsertUsers = async () => {
  console.log('seeding users...');

  const usersToCreate = seedUsersData.map(async (data) => {
    const firstUserPasswordHash = await hashPassword(data.email);

    const userUpsertingData = {
      passwordHash: firstUserPasswordHash.hash,
      salt: firstUserPasswordHash.salt,
      ...data,
    };

    return await client.user.upsert({
      where: {
        email: data.email,
      },
      create: userUpsertingData,
      update: {},
    });
  });

  await Promise.all(usersToCreate);
};

const upsertPeriods = async () => {
  console.log('seeding periods...');
  seedPeriodsData.map(async (data, dayIndex) => {
    return await client.period.upsert({
      where: {
        dayIndex,
      },
      create: { ...data, dayIndex },
      update: {},
    });
  });
};

const main = async () => {
  if (process.env.SKIP_SEED !== '1') {
    await upsertUsers();
    await upsertPeriods();
    console.log('seeded successfully');
  }
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    console.log('Exiting seed...');
    await client.$disconnect();
  });
