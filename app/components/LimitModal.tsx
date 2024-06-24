export default function LimitModal() {
  return (
    <div className="w-[30vw] flex flex-col gap-5 items-center justify-center">
      <h1 className="text-2xl font-semibold">Oops</h1>
      <h1 className="">You Exhausted your Query Limits.</h1>
      <button className="p-2 rounded-md bg-black text-white">Request queries</button>
    </div>
  )
}
