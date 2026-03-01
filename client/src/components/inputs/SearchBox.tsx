import { useMemo, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  fetchData?: (query: string) => void;
  className?: string;
  value?: string;
};

export function SearchBox({ fetchData, className, value }: Props) {
  const [query, setQuery] = useState(value ?? "");

  useEffect(() => {
    debouncedSearch(query.trim());
  }, [query]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchData?.(value);
        console.log("search!");
      }, 500),
    [fetchData],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onClearClicked = () => {
    setQuery("");
    debouncedSearch.cancel();
    fetchData?.("");
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        id="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <Button
          variant="link"
          type="button"
          tabIndex={-1}
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={onClearClicked}
        >
          <X className="h-4 hover:opacity-50" />
        </Button>
      )}
    </div>
  );
}
