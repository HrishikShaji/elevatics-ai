"use client";

import { Report } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const response = await fetch("/api/report", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("error fetching reports");
      }

      const result = await response.json();

      setReports(result.reports);
    }
    fetchReports();
  }, []);

  async function handleDelete(id: string) {
    await fetch("/api/report", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  console.log(reports);
  return (
    <div className="p-10">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Query</th>
            <th className="text-left">type</th>
            <th className="text-left">email</th>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
