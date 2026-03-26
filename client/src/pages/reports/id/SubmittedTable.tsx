import { Pagination } from "@/components/crud/Pagination";
import { ResultCount } from "@/components/crud/ResultCount";
import { type TrackerType } from "@/types/tracker";
import type { SubmittedData } from "@/types/SubmittedData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const SubmittedTable = ({
  tracker,
  submitted,
}: {
  tracker: TrackerType;
  submitted: SubmittedData[];
}) => {
  return (
    <>
      <div className="h-full flex flex-col gap-4">
        <div className="flex-1 w-full overflow-auto rounded-md border">
          <Table style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <TableHeader>
              <TableRow className="hover:bg-transparent *:whitespace-nowrap *:font-semibold *:bg-muted/60">
                <TableHead>Id</TableHead>
                {tracker.components.map((c) => (
                  <TableHead key={c.id}>{c.label}</TableHead>
                ))}
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {submitted.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>{d.id}</TableCell>
                  {tracker.components.map((c) => {
                    const submitted = d.components.find(
                      (data) => data.id === c.id,
                    );
                    const value = submitted?.encodedData ?? "";
                    return <TableCell key={c.id}>{value}</TableCell>;
                  })}
                  <TableCell>
                    {new Date(d.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ResultCount count={submitted.length} />
        {/* <Pagination
          page={1}
          totalPages={1}
          onPrev={() => {}}
          onNext={() => {}}
        /> */}
      </div>
    </>
  );
};
