"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { InsightsSection } from "@/_components/sections/insights";
import { SubscribeSection } from "@/_components/sections/insights";
import { SearchSection } from "@/_components/sections/insights";
import { swrFetcher } from "@/_lib/fetch";
import { Loader } from "lucide-react";

type InsightsClientProps = {
    categories: string[];
};

export default function InsightsClient({ categories }: InsightsClientProps) {
    // Controlled input states
    const [searchInput, setSearchInput] = useState("");
    const [categoryInput, setCategoryInput] = useState<string | undefined>(undefined);
    const [dateInput, setDateInput] = useState<string | undefined>(undefined);

    // Applied filters state (triggers SWR)
    const [appliedFilters, setAppliedFilters] = useState<{
        search?: string;
        category?: string;
        date?: string;
    }>({});

    const [page, setPage] = useState(1);

const { data, error, isLoading} = useSWR(
  ["/api/insights", JSON.stringify(appliedFilters), page],
  ([url, filtersStr, page]) => {
    const filters = JSON.parse(filtersStr);

    return swrFetcher(url, undefined, {
      query: {
        populate: { image: true },
        filters: {
          ...(filters.search ? { title: { $containsi: filters.search } } : {}),
          ...(filters.category ? { category: { $eq: filters.category } } : {}),
        },
        sort: ["datePublished:desc"],
        pagination: { page, pageSize: 10 },
      },
    });
  },
  { revalidateOnFocus: false }
);


    const handleSearch = () => {
        setAppliedFilters({ search: searchInput, category: categoryInput, date: dateInput });
        setPage(1); 
    };

    const handleViewAll = () => {
        setSearchInput("");
        setCategoryInput(undefined);
        setDateInput(undefined);
        setAppliedFilters({});
        setPage(1);
    };

    const handleLoadMore = () => {
        setPage((prev) => prev + 1);
    };

    const insightsData = data?.data ?? [];

    return (
        <div>
            <SearchSection
                categories={categories}
                searchValue={searchInput}
                categoryValue={categoryInput}
                dateValue={dateInput}
                onSearchChange={setSearchInput}
                onCategoryChange={setCategoryInput}
                onDateFilterChange={setDateInput}
                onSubmit={handleSearch}
                loading={isLoading}
            >
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleViewAll}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                        View All
                    </button>
                </div>
            </SearchSection>

            <SubscribeSection />

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <Loader className="animate-spin text-nexia-dark-teal-100 w-6 h-6" />
                </div>
            )}

            {!isLoading && insightsData.length === 0 && (
                <div className="text-center py-6 text-nexia-dark-teal-100">
                    No insights found.
                </div>
            )}

            {error && (
               <div className="text-center py-6 text-nexia-dark-teal-100">
                    No insights found.
                </div>
            )}

            {insightsData.length > 0 && <InsightsSection insights={insightsData} />}

            {insightsData.length > 0 && data?.meta?.pagination?.page < data?.meta?.pagination?.pageCount && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="px-6 py-2 bg-nexia-dark-teal-100 text-white rounded hover:bg-nexia-light-teal-100 transition"
                    >
                        {isLoading ? <Loader className="animate-spin w-5 h-5" /> : "Next "}
                    </button>
                </div>
            )}


        </div>
    );
}
