import { useRef } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";

export const useCustomBottomSheet = () => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["48%"];
  const { present, dismiss } = useBottomSheet(bottomSheetModalRef, { snapPoints });

  return { bottomSheetModalRef, present, dismiss };
};