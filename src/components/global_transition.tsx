"use client";

import { atom, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { focusAtom } from "jotai-optics";
import { Loader2Icon } from "lucide-react";
import { useEffect, useTransition } from "react";
import type { TransitionStartFunction } from "react";

type Props = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};
export const globalTransitionAtom = atom<Props>({
  isPending: false,
  startTransition: () => {},
});
const isPendingAtom = focusAtom(globalTransitionAtom, (transition) =>
  transition.prop("isPending")
);

export const GlobalTransition: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  useHydrateAtoms([
    [
      globalTransitionAtom,
      {
        isPending,
        startTransition,
      },
    ],
  ]);

  const setTransition = useSetAtom(isPendingAtom);
  useEffect(() => setTransition(isPending), [isPending, setTransition]);

  if (!isPending) {
    return null;
  }

  return (
    <div className="flex fixed bottom-5 right-5 gap-x-2.5 rounded-md border bg-background p-2.5">
      <Loader2Icon />
      <div>Loading</div>
    </div>
  );
};
