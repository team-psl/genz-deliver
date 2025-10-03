/* eslint-disable no-console */
import 'dotenv/config';

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { resolve } from 'node:path';

import { db, pool } from './index';

async function run() {
  console.log('🚀 Starting database migration...');
  try {
    await migrate(db, { migrationsFolder: resolve('./drizzle') });
    console.log('✨ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await pool.end();
    console.log('👋 Database connection closed');
  }
}

run();
