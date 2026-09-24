"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  DEFAULT_FILTERS,
  filtersToSearchParams,
  parseFilters,
  type FiltersState,
} from "@/lib/filters";

export function useFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const push = useCallback(
    (next: FiltersState) => {
      const params = filtersToSearchParams(next);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const updateFilters = useCallback(
    (patch: Partial<FiltersState>, options?: { resetPage?: boolean }) => {
      const resetPage = options?.resetPage ?? true;
      const next: FiltersState = {
        ...filters,
        ...patch,
        page: patch.page ?? (resetPage ? 1 : filters.page),
      };
      push(next);
    },
    [filters, push]
  );

  const clearAll = useCallback(() => {
    push(DEFAULT_FILTERS);
  }, [push]);

  const applyFilters = useCallback(
    (next: FiltersState) => {
      push({ ...next, page: 1 });
    },
    [push]
  );

  return { filters, updateFilters, clearAll, applyFilters };
}
