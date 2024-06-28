

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Spinner from "../components/svgs/Spinner";

interface DeleteReportProps {
  id: string;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteReport({ id, setRefetch }: DeleteReportProps) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(id: string) {
    try {
      setDeleting(true)
      await fetch("/api/report", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log(error)
    } finally {
      setDeleting(false)
      setRefetch(prev => !prev)
    }

  }

  return (<>
    {deleting ? <div className="w-10 "><Spinner /></div> :
      <button onClick={() => handleDelete(id)} className="hover:text-red-500"><FaRegTrashAlt /></button>}
  </>
  );
}
