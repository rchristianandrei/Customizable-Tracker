import { Badge } from "@/components/ui/badge";

export const ResultCount = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="secondary" className="px-3 py-1">
        {count} result{count !== 1 && "s"}
      </Badge>
    </div>
  );
};
