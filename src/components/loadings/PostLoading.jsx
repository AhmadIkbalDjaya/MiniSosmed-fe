export default function PostLoading() {
  return (
    <>
      <div
        className={"animate-pulse bg-white pt-5 rounded shadow relative mb-5"}
      >
        <header className={"px-4 flex items-center justify-between"}>
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className={"px-5 grow"}>
            <p className={"font-bold h-3 bg-slate-200 rounded w-28"}></p>
            <h6 className={"text-sm bg-slate-200 h-2 mt-2 rounded w-16"}></h6>
          </div>
        </header>

        <main className={""}>
          <div className={"mx-4 my-3 h-2 bg-slate-200 rounded w-5/6"}></div>
          <div className={"mx-4 my-3 h-2 bg-slate-200 rounded"}></div>
          <div className="mx-4 my-3 h-52 bg-slate-200 rounded"></div>
        </main>

        <hr />

        <footer className={"flex justify-around my-1"}>
          <p className={"my-1 h-6 bg-slate-200 rounded w-16"}></p>
          <p className={"my-1 h-6 bg-slate-200 rounded w-16"}></p>
        </footer>
      </div>
    </>
  );
}
