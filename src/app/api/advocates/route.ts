import { NextRequest } from 'next/server';
import { ilike, or, count } from 'drizzle-orm';

import db from '@/db';
import { advocates } from '@/db/schema';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  const page = Number.parseInt(url.searchParams.get('page') ?? '1', 10);
  const pageSize = Number.parseInt(
    url.searchParams.get('page_size') ?? '5',
    10,
  );

  const whereClause = searchTerm
    ? or(
        // excluding phone number and years of expereince
        ilike(advocates.firstName, `%${searchTerm}%`),
        ilike(advocates.lastName, `%${searchTerm}%`),
        ilike(advocates.degree, `%${searchTerm}%`),
        ilike(advocates.city, `%${searchTerm}%`),
        // Drizzle doesn't support this:
        // `ilike(advocates.specialties, `%${searchTerm}%`)`
        // @see https://github.com/drizzle-team/drizzle-orm/discussions/2041
        // It's possible to do with native Postgres, but not within
        // the timeframe of a couple hours.
        // @see https://www.postgresql.org/docs/current/functions-json.html
        // Plus, it would tank the performance of this search.
      )
    : undefined;

  const data = await db
    .select()
    .from(advocates)
    .where(whereClause)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .orderBy(advocates.lastName);

  const [{ count: totalItems }] = await db
    .select({ count: count() })
    .from(advocates)
    .where(whereClause);

  const pagination = {
    page,
    totalPages: Math.ceil(totalItems / pageSize),
    totalItems,
  };

  return Response.json({ data, pagination });
}
