import { NextRequest } from 'next/server';
import db from '../../../db';
import { advocates } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';

export async function GET(request: NextRequest) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');

  const data = !searchTerm
    ? advocateData
    : advocateData.filter((advocate) =>
      Object.values(advocate).join('||')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

  return Response.json({ data });
}
