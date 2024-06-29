"use client"

import { useInvestor } from "@/app/contexts/InvestorContext"

export default function Page() {

  const { data } = useInvestor()
  console.log(data)
  return (
    <div>sample</div>
  )
}
