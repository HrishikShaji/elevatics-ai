
"use client";
import { CiFileOn } from "react-icons/ci";
import { Report } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RxArrowTopRight } from "react-icons/rx";
import DropDown from "../components/ui/DropDown";
import { DropDownItem } from "@/types/types";
import { FaRegTrashAlt } from "react-icons/fa";
export default function Page() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [reportType, setReportType] = useState("")
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter()

  useEffect(() => {
    async function fetchReports() {
      const response = await fetch(`/api/report?page=${page}&pageSize=${pageSize}&reportType=${reportType}`, {
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
  }, [page, pageSize, reportType]);



  async function handleDelete(id: string) {
    await fetch("/api/report", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

  }

  const totalPages = Math.ceil(totalCount / pageSize);

  const dateConverter = (date: Date) => {

    const initdate = new Date(date);

    const dateString = initdate.toLocaleDateString();
    return dateString
  }

  function onChange(item: DropDownItem) {
    setReportType(item.value)
  }

  const items: DropDownItem[] = [{ label: 'All', value: "" },
  { label: "Full", value: "FULL" }, { label: "Quick", value: "QUICK" }]

  return (
    <div className="p-20 w-full flex flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-start">
        <DropDown width="200px" title="" defaultValue={items[0]} items={items} onChange={onChange} />
      </div>
      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="" style={{ borderBottom: "1px solid #d1d5db" }}>
            <th className="text-left text-xl font-normal p-2 w-[40%]">Query</th>
            <th className="text-left p-2 w-[20%] text-xl font-normal">Type</th>
            <th className="text-left p-2 w-[20%] text-xl font-normal">Date</th>
            <th className="text-left p-2 w-[20%] text-xl font-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((item, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #d1d5db" }}>
              <td className="p-2 text-gray-600">{item.name}</td>
              <td className="p-2 text-gray-600">{item.reportType}</td>
              <td className="p-2 text-gray-600">{dateConverter(item.createdAt)}</td>
              <td className="p-2">
                <div className="flex gap-5">
                  <button onClick={() => handleDelete(item.id)} className="hover:text-red-500"><FaRegTrashAlt /></button>
                  <button onClick={() => router.push(item.reportType === "FULL" ? `/full-report/${item.id}` : `/quick-report/${item.id}`)} ><CiFileOn /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-3 items-center">
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          {`<`}
        </button>
        <span>
          {page}
        </span>
        <button className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  );
}
