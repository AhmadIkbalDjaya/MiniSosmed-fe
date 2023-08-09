import { IconX } from "@tabler/icons-react";

export default function Modal(props) {
  const { visible, close } = props;
  const handleOnClose = (e) => {
    if (e.target.id == "modalContainer") close();
  };
  if (!visible) return null;
  return (
    <div
      id="modalContainer"
      className={
        "fixed bg-black inset-0 z-[3] bg-opacity-30 flex justify-center items-center"
      }
      onClick={handleOnClose}
    >
      <div className="bg-white py-3 rounded w-[90vw] sm:w-[400px]">
        <header className={"flex justify-between px-3 mb-2 items-center"}>
          <h1 className={"font-bold text-md"}>{props.title}</h1>
          <IconX size={20} onClick={() => close()} />
        </header>
        <hr />
        <div className={""}>{props.children}</div>
      </div>
    </div>
  );
}
