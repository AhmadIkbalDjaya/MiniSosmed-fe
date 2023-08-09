import Navbar from "../../components/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className={"min-h-screen flex items-center justify-center"}>
        <h1 className="text-2xl font-bold">404 Not Found</h1>
      </div>
    </>
  );
}
