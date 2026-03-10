import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export const Pagination = ({ page, totalPages, onPrev, onNext }: Props) => {
  return (
    <div className="flex justify-center gap-2">
      <Button variant="outline" disabled={page === 1} onClick={onPrev}>
        Prev
      </Button>

      <span className="flex items-center px-4 text-sm">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages || totalPages === 0}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
};
