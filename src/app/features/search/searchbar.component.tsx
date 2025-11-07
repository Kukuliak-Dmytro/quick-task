"use client";

import { Input } from "@/app/shared/components/ui/input";
import { Button } from "@/app/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSearchFormSchema, SearchFormData } from "./searchbar.validation";
import { useSearchStore } from "./search.store";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface ISearchbarProps {
  placeholder?: string;
  className?: string;
}

/**
 * Searchbar component that uses the search store for state management.
 *
 * This component provides a search input with form validation and automatic
 * query synchronization with the URL. It includes loading states and error handling.
 *
 * @param props - Component props
 * @param props.placeholder - Placeholder text for the input
 * @param props.className - Additional CSS classes
 * @returns The searchbar component
 */
export const Searchbar = ({ placeholder, className }: ISearchbarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const clearQuery = useSearchStore((state) => state.clearQuery);

  const searchFormSchema = createSearchFormSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    mode: "onChange",
    defaultValues: {
      query: query,
    },
  });

  // Update form when search store query changes
  useEffect(() => {
    setValue("query", query);
  }, [query, setValue]);

  const queryValue = watch("query");

  const onSubmit = async (data: SearchFormData) => {
    setIsLoading(true);
    setQuery(data.query.trim());
    setIsLoading(false);
  };

  const handleClear = () => {
    setValue("query", "");
    clearQuery();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex items-start gap-2 ${className || ""}`}>
      <div className="flex-1">
        <Input
          {...register("query")}
          placeholder={placeholder || t("search.placeholder")}
          type="text"
          aria-invalid={!!errors.query}
          className={errors.query ? "border-destructive" : ""}
        />
        {errors.query && (
          <p className="mt-1 text-sm text-destructive">
            {errors.query.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="default"
        disabled={!isValid || isLoading || queryValue.length < 2}>
        {isLoading ? t("search.searching") : t("search.button")}
      </Button>
      {query && (
        <Button type="button" variant="outline" onClick={handleClear}>
          {t("search.clear")}
        </Button>
      )}
    </form>
  );
};
