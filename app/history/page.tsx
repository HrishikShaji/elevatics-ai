
"use client";
import { CiFileOn } from "react-icons/ci";
import { Report } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import Spinner from "../components/svgs/Spinner";
import DeleteReport from "../components/DeleteReport";
export default function Page() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [reportType, setReportType] = useState("")
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const [firstLoad, setFirstLoad] = useState(false)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    async function fetchReports() {

      try {
        if (!firstLoad) {

          setLoading(true)
          setIsSuccess(false)
        }
        const response = await fetch(`/api/report?page=${page}&pageSize=${pageSize}&reportType=${reportType}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("error fetching reports");
        }

        const result = await response.json();
        if (!firstLoad) {

          setIsSuccess(true)
        }
        setReports(result.reports);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.log(error)
      } finally {
        if (!firstLoad) {

          setLoading(false)
        }
        setFirstLoad(true)
      }
    }
    fetchReports();
  }, [page, pageSize, reportType, refetch]);




  const totalPages = Math.ceil(totalCount / pageSize);

  const dateConverter = (date: Date) => {

    const initdate = new Date(date);

    const dateString = initdate.toLocaleDateString();
    return dateString
  }


  return (
    <div className="p-20 w-full h-screen flex flex-col items-center justify-center gap-10">
      {loading ? <div className="w-10"><Spinner /></div> : null}
      {isSuccess ?
        <div className="h-full w-full flex flex-col gap-3">
          <div className="w-full">

            <div className="relative flex items-center w-[200px] ">
              <input placeholder="search report..." className="p-1 pl-3 w-full  rounded-xl border-[2px] border-gray-200" />
              <button className="absolute right-2">
                <IoSearch />
              </button>
            </div>
          </div>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="" style={{ borderBottom: "1px solid #d1d5db" }}>
                <th className="text-left text-xl font-normal p-2 w-[40%]">Query</th>
                <th className="text-left p-2 w-[20%] text-xl font-normal">Report</th>
                <th className="text-left p-2 w-[20%] text-xl font-normal">Type</th>
                <th className="text-left p-2 w-[20%] text-xl font-normal">Date</th>
                <th className="text-left p-2 w-[20%] text-xl font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #d1d5db" }}>
                  <td className="p-2 text-gray-600">{item.name}</td>
                  <td className="p-2">
                    <div className="flex gap-5">
                      <button onClick={() => router.push(item.reportType === "FULL" ? `/full-report/${item.id}` : `/quick-report/${item.id}`)} ><CiFileOn /></button>
                    </div>
                  </td>
                  <td className="p-2 text-gray-600">{item.reportType === "QUICK" ? "short" : "full"}</td>
                  <td className="p-2 text-gray-600">{dateConverter(item.createdAt)}</td>
                  <td className="p-2">
                    <div className="flex  items-center justify-between h-[30px] w-[100px]">
                      <button className="hover:text-red-500"><FiEdit /></button>
                      <DeleteReport setRefetch={setRefetch} id={item.id} />
                      <button className="hover:text-red-500"><PiShareNetworkLight /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-3 items-center w-full justify-center mt-5">
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
        : null}
    </div>
  );
}
