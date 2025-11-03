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
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string | undefined>(undefined);

    const { data, error, isLoading } = useSWR(
        ["/api/insights", search, category],
        ([url, searchTerm, category]) =>
            swrFetcher(url, undefined, {
                query: {
                    populate: { image: true },
                    filters: {
                        ...(searchTerm ? { title: { $containsi: searchTerm } } : {}),
                        ...(category ? { category: { $eq: category } } : {}),
                    },
                    sort: ["datePublished:desc"],
                    pagination: { page: 1, pageSize: 10 },
                },
            }),
        { revalidateOnFocus: false }
    );

    return (
        <div>
            <SearchSection
                categories={categories}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
            />

            <SubscribeSection />

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <Loader className="animate-spin text-nexia-dark-teal-100 w-6 h-6" />
                </div>
            )}

            {error && (
                <div className="text-center  py-6">
                    Nothing to see here
                </div>
            )}

            {data && data?.data?.length > 0 && <InsightsSection insights={data?.data} />}

        </div>
    );
}
