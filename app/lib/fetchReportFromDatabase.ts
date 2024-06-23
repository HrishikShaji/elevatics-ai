
export async function fetchReportFromDatabase(id: string) {
  const response = await fetch(`/api/report/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    throw new Error("failed to fetch report")
  }

  const result = await response.json()
  return result.report
}

