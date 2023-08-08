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
      <div className="bg-white p-3 rounded">
        <header className={"flex justify-between"}>
          <h1>Modal Title</h1>
          <IconX onClick={() => close()} />
        </header>
        {props.children}
      </div>
    </div>
  );
}
