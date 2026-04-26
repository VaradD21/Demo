/**
 * Seed script: Demo doctor data
 * Run from: e:\Swahit\swahit-dev\apps\backend
 * Command: npx ts-node --project tsconfig.json src/prisma/seed.ts
 */
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter } as any);

const doctors = [
  {
    name: 'Dr. Aisha Mehta',
    specialty: 'Therapist',
    bio: 'Specializes in anxiety, stress, and life transitions. Uses CBT and mindfulness-based approaches to help clients build resilience.',
    rating: 4.9,
    reviewCount: 128,
    yearsExp: 10,
    languages: 'English, Hindi',
    consultFee: 999,
  },
  {
    name: 'Dr. Rohan Sharma',
    specialty: 'Psychiatrist',
    bio: 'Board-certified psychiatrist focusing on mood disorders, ADHD, and medication management. Compassionate and evidence-based.',
    rating: 4.8,
    reviewCount: 94,
    yearsExp: 14,
    languages: 'English, Hindi',
    consultFee: 1499,
  },
  {
    name: 'Dr. Priya Nair',
    specialty: 'Counselor',
    bio: 'Relationship and family counselor. Helps individuals and couples navigate conflict, communication, and emotional growth.',
    rating: 4.7,
    reviewCount: 76,
    yearsExp: 7,
    languages: 'English, Malayalam, Tamil',
    consultFee: 799,
  },
  {
    name: 'Dr. Vikram Bose',
    specialty: 'Clinical Psychologist',
    bio: 'Expert in trauma therapy and EMDR. Works with individuals recovering from difficult life experiences with a trauma-informed approach.',
    rating: 4.9,
    reviewCount: 112,
    yearsExp: 12,
    languages: 'English, Bengali',
    consultFee: 1199,
  },
  {
    name: 'Dr. Sneha Pillai',
    specialty: 'Wellness Coach',
    bio: 'Certified wellness coach focusing on burnout recovery, work-life balance, and building healthy emotional habits.',
    rating: 4.6,
    reviewCount: 55,
    yearsExp: 5,
    languages: 'English, Hindi, Kannada',
    consultFee: 599,
  },
];

async function main() {
  console.log('🌱 Seeding doctors...');
  let count = 0;
  for (const doc of doctors) {
    const exists = await prisma.doctor.findFirst({ where: { name: doc.name } });
    if (!exists) {
      await prisma.doctor.create({ data: doc });
      count++;
    }
  }
  console.log(`✅ Done. ${count} new doctors seeded (${doctors.length - count} already existed).`);
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
