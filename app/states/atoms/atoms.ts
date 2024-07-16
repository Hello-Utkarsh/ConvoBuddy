import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const defaultValue = "";

export const pitch = atom({
  key: "pitch", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
  // effects_UNSTABLE: [persistAtom],
});

export const user_pitch = atom({
  key: 'user_pitch',
  default: []
})

export const registered_picth = atom({
  key: "registere_pitch",
  default: []
})

export const notes = atom({
  key: 'notes',
  default: []
})

// export function useSSR(atom: any) {
//   const [isInitial, setIsInitial] = useState(true);
//   const [value, setValue] = useRecoilState(atom);

//   useEffect(() => {
//     setIsInitial(false);
//   }, []);

//   return [isInitial ? defaultValue : value, setValue] as const;
// }