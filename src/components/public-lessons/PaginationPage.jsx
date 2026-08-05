"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal, FiBookOpen } from "react-icons/fi";

export function PaginationPage({ total = 0 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const totalItems = Number(total) || 0;
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalItems === 0) return null;

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis-1");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis-2");
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = Math.min((page - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className="w-full mt-4 bg-linear-to-b from-[#0a051a]/90 to-[#060211]/90 border border-white/10 rounded-3xl p-4 sm:p-5 backdrop-blur-2xl shadow-[0_0_50px_-10px_rgba(139,92,246,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Result Counter Summary */}
      <div className="flex items-center gap-2.5 text-xs text-white/60 font-medium">
        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-sm">
          <FiBookOpen className="w-3.5 h-3.5" />
        </div>
        <span>
          Showing{" "}
          <span className="font-bold text-white px-2 py-0.5 rounded-lg bg-white/5 border border-white/10">
            {startItem} - {endItem}
          </span>{" "}
          of <span className="font-extrabold text-purple-400">{totalItems}</span> lessons
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-purple-600/20 text-white/80 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:scale-95 shadow-sm"
          aria-label="Previous Page"
        >
          <FiChevronLeft className="w-4 h-4 text-purple-400" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((p, i) =>
            typeof p === "string" ? (
              <div
                key={`ellipsis-${i}`}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-white/40"
              >
                <FiMoreHorizontal className="w-4 h-4" />
              </div>
            ) : (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-95 ${
                  p === page
                    ? "bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 border border-white/20 scale-105"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 hover:border-white/20"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-purple-600/20 text-white/80 hover:text-white border border-white/10 hover:border-purple-500/40 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:scale-95 shadow-sm"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight className="w-4 h-4 text-purple-400" />
        </button>
      </div>

    </div>
  );
}