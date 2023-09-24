export default function CommentLoading() {
  return (
    <>
      <div className={"flex items-start gap-3 py-2 animate-pulse"}>
        <div className={"hidden md:block rounded-full bg-slate-200 h-9 w-9"} />
        <div>
          <div className={"bg-gray-100 mx-2 md:mx-0 px-2 py-1 rounded-md"}>
            <div className={"text-sm h-3 bg-slate-200 rounded w-32"}></div>
            <p className={"mt-1 h-2 bg-slate-200 w-72 rounded"}></p>
            <p className={"mt-1 h-2 bg-slate-200 w-80 rounded"}></p>
          </div>
          <div className={"mt-1 mx-4 md:mx-2 h-1 w-24 bg-slate-200 rounded"}></div>
        </div>
      </div>
    </>
  );
}
