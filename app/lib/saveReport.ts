
interface Props {
  report: string;
  reportType: "QUICK" | "FULL";
  name: string;
}

export default async function saveReport({ reportType, report, name }: Props) {
  if (report) {
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report: report, reportType: reportType, name: name }),
      });
      if (!response.ok) {
        throw new Error("Failed to send report to backend");
      }
      const result = await response.json()
      return result.report
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}

