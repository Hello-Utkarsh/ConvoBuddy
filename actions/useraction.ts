import { registered_picth } from "@/app/states/atoms/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const enroll = async (pitchId: number) => {
  const req = await fetch("/api/pitches/registered", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pitchId,
    }),
  });
  const res = await req.json();
  if (res.message == "success") {
    return res["registered_pitch"];
  }
  return res;
};

export const unenroll = async (id: number) => {
  try {
    const req = await fetch("/api/pitches/registered", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const res = await req.json();
    if (res.message == "success") {
      return res["delete_pitch"];
    }
  } catch (error) {
    console.log(error);
  }
};
