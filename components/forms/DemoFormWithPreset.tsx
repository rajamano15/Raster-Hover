"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DemoForm from "@/components/forms/DemoForm";
import { DEMO_SOLUTIONS } from "@/data/demo";

type Props = { idPrefix: string };

/**
 * Reads `?solution=` on the client so the Request a Demo page stays fully
 * static (required for `output: "export"`). `useSearchParams` must sit under
 * a Suspense boundary; the fallback renders the same form without a preset,
 * so there is no visible flash for visitors arriving without a query string.
 */
function PresetDemoForm({ idPrefix }: Props) {
  const params = useSearchParams();
  const solution = params.get("solution") ?? undefined;
  const preset =
    solution && (DEMO_SOLUTIONS as readonly string[]).includes(solution)
      ? solution
      : undefined;
  return <DemoForm idPrefix={idPrefix} presetSolution={preset} />;
}

export default function DemoFormWithPreset({ idPrefix }: Props) {
  return (
    <Suspense fallback={<DemoForm idPrefix={idPrefix} />}>
      <PresetDemoForm idPrefix={idPrefix} />
    </Suspense>
  );
}
