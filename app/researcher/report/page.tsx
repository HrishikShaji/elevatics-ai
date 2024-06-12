"use client";

import FinalReport from "@/app/components/FinalReport";
import { ReportsProvider } from "@/app/contexts/ReportsContext";

export default function Page() {
  return (
    <ReportsProvider>
      <FinalReport />
    </ReportsProvider>
  );
}
