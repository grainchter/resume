"use client";
import { api } from "@/shared/lib/api/apiClient";
import { ContributionsResponse } from "@/shared/types/github";
import { useState, useCallback, useEffect } from "react";

export const useGithubContributions = (autoFetch = true) => {
  const [contributions, setContributions] = useState<ContributionsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getContributions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/github/contributions");
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch: ${text}`);
      }
      const json = (await res.json()) as ContributionsResponse;
      if (!json.user) {
        throw new Error("Invalid response format");
      }
      setContributions(json);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      getContributions();
    }
  }, [autoFetch, getContributions]);

  return { contributions, loading, error, refetch: getContributions };
};