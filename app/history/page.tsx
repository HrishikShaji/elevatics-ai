
"use client";

import { Report } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter()

  useEffect(() => {
    async function fetchReports() {
      const response = await fetch(`/api/report?page=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("error fetching reports");
      }

      const result = await response.json();

      setReports(result.reports);
      setTotalCount(result.totalCount);
    }
    fetchReports();
  }, [page, pageSize]);



  async function handleDelete(id: string) {
    await fetch("/api/report", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-10">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Query</th>
            <th className="text-left">type</th>
            <th className="text-left">email</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, i) => (
            <tr key={i}>
              <td className="">{item.name}</td>
              <td>{item.reportType}</td>
              <td>{item.userEmail}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>delete</button>
                <button onClick={() => router.push(item.reportType === "FULL" ? `/full-report/${item.id}` : `/quick-report/${item.id}`)} >go</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
