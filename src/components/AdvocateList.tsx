import { Search, SquareUserRound } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Advocate } from '@/data/types';
import { DialogTrigger } from '@radix-ui/react-dialog';

export default function AdvocatesList({
  advocates,
}: {
  advocates?: Advocate[];
}) {
  if (!advocates) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead className="hidden md:table-cell">Specialties</TableHead>
          <TableHead>&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advocates?.map((advocate, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{formatName(advocate)}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell className="hidden md:flex justify-start flex-wrap gap-1 ">
                {advocate.specialties.slice(0, 1).map((s, i) => (
                  <Badge key={i} variant="secondary">
                    {s}
                  </Badge>
                ))}
                {advocate.specialties.length > 1 && (
                  <Badge variant="secondary">more&hellip;</Badge>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Search />
                  </DialogTrigger>
                  <DialogContent>
                    <div className="grid grid-cols-[min-content_1fr] items-center gap-4">
                      <SquareUserRound
                        strokeWidth="1px"
                        width={96}
                        height={96}
                      />
                      <DialogHeader>
                        <DialogTitle>{formatName(advocate)}</DialogTitle>
                        <DialogDescription>
                          {advocate.firstName} is an advocate with{' '}
                          {advocate.yearsOfExperience} years of experience.
                        </DialogDescription>
                      </DialogHeader>
                    </div>
                    <dl>
                      <dt className="font-bold">City</dt>
                      <dd>{advocate.city}</dd>

                      <dt className="font-bold mt-4">Phone</dt>
                      <dd>{formatPhone(advocate)}</dd>

                      <dt className="font-bold mt-4">Specialties</dt>
                      <dd className="flex justify-start flex-wrap gap-1">
                        {advocate.specialties.map((s, i) => (
                          <Badge key={i} variant="secondary">
                            {s}
                          </Badge>
                        ))}
                      </dd>
                    </dl>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function formatName(advocate: Advocate) {
  return `${advocate.firstName} ${advocate.lastName}, ${advocate.degree}`;
}

function formatPhone({ phoneNumber }: Advocate) {
  const p = String(phoneNumber);
  return `(${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6)}`;
}
