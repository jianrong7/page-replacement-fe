import { create } from "zustand";

type Result = {
  pageFaults: boolean[];
  pageFaultsCount: number;
  frames?: Record<number, number[]>;
  clockFrames?: Record<number, number[][]>;
};

interface TableStore {
  algorithm: string;
  setAlgorithm: (algorithm: string) => void;
  result?: Result;
  setResult: (result: Result) => void;
}

const useTableStore = create<TableStore>((set) => ({
  algorithm: "opt",
  setAlgorithm: (algorithm: string) => set({ algorithm }),
  result: {
    pageFaults: [],
    pageFaultsCount: 0,
    frames: undefined,
    clockFrames: undefined,
  },
  setResult: (result: Result) => set({ result }),
}));

export default useTableStore;
