import defaultProfileImage from "../assets/images/default-profile.jpg";

export default function OtherUser() {
  return (
    <div className={"flex justify-between align-baseline my-5"}>
      <div>
        <img src={defaultProfileImage} alt="" className={"max-h-[32px] max-w-[32px] rounded-full"} />
      </div>
      <h1 className={"grow px-3 font-semibold"}>Nama</h1>
      <button className={"font-semibold text-white bg-blue-600 px-3 rounded"}>Follow</button>
    </div>
  );
}
