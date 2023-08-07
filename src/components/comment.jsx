import { IconDots } from "@tabler/icons-react";
import ProfileAvatar from "./profile_avatar";

export default function Comment() {
  return (
    <div className={"flex items-start gap-3 py-2"}>
      <ProfileAvatar />
      <div>
        <div className={"bg-gray-100 px-2 py-1 rounded-md"}>
          <h1 className={"font-bold text-sm"}>Ahmad Ikbal Djaya</h1>
          <p className={"text-sm"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
            soluta, nisi hic doloribus praesentium sequi?
          </p>
        </div>
        <span className={"text-xs text-gray-500"}>18 detik yang lalu</span>
      </div>
      <button className={"pt-2"}>
        <IconDots size={18} />
      </button>
    </div>
  );
}
