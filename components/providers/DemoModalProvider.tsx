"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Modal from "@/components/ui/Modal";
import DemoForm from "@/components/forms/DemoForm";

type DemoModalContextValue = {
  openDemo: (solution?: string) => void;
  closeDemo: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error("useDemoModal must be used inside DemoModalProvider");
  }
  return ctx;
}

export default function DemoModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [solution, setSolution] = useState<string | undefined>(undefined);

  const openDemo = useCallback((s?: string) => {
    setSolution(s);
    setOpen(true);
  }, []);
  const closeDemo = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openDemo, closeDemo }),
    [openDemo, closeDemo],
  );

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <Modal open={open} onClose={closeDemo} labelledBy="demo-modal-title">
        <div className="mb-6 space-y-2 pr-10">
          <span className="eyebrow">Request a Demo</span>
          <h2 id="demo-modal-title" className="text-2xl font-semibold text-ink">
            See it in action
          </h2>
          <p className="text-[0.92rem] leading-relaxed text-mist">
            Tell us a little about your organisation and the solution you are
            interested in — our team will arrange a personalised demonstration.
          </p>
        </div>
        {/* Remount the form each time the modal opens so state is fresh */}
        {open ? (
          <DemoForm compact idPrefix="demo-modal" presetSolution={solution} />
        ) : null}
      </Modal>
    </DemoModalContext.Provider>
  );
}
