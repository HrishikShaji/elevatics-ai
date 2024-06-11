import FinalReport from "@/app/components/FinalReport";
import { ReportsProvider } from "@/app/contexts/ReportsContext";

const Page = () => {
  return (
    <ReportsProvider>
      <FinalReport />
    </ReportsProvider>
  );
};

export default Page;
