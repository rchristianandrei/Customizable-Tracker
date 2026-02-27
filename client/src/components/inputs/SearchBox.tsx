import { useMemo, useEffect, useRef } from "react";
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
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!input || !input.current) return;
    input.current.value = value ?? "";
  }, [input]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchData?.(value);
      }, 500),
    [fetchData],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (value: string) => {
    const trimmed = value.trim();

    if (trimmed === "") {
      debouncedSearch.cancel();
      fetchData?.(value);
      return;
    }

    debouncedSearch(trimmed);
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        ref={input}
        id="search"
        placeholder="Search..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button
        variant="link"
        type="button"
        tabIndex={-1}
        className="absolute right-1 top-1/2 -translate-y-1/2"
        onClick={() => {
          if (!input.current?.value) return;
          input.current.value = "";
          handleChange("");
        }}
      >
        <X className="h-4 hover:opacity-50" />
      </Button>
    </div>
  );
}
