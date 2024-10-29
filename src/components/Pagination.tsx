import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationResponse } from '@/data/types';

export default function Pagination({
  pagination,
  setPage,
}: {
  pagination: PaginationResponse;
  setPage: (n: number) => void;
}) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  const pagesArray = Array.from(
    { length: pagination.totalPages },
    (_, i) => i + 1,
  );

  const handlePrev = () => setPage(Math.max(1, pagination.page - 1));
  const handleNext = () =>
    setPage(Math.min(pagination.totalPages, pagination.page + 1));

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrev} />
        </PaginationItem>
        {pagesArray.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === pagination.page}
              onClick={() => setPage(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
