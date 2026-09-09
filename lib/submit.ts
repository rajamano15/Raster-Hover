export type EnquiryPayload = {
  kind: "demo" | "contact";
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  solution: string;
  message: string;
};

/**
 * Submission stub — no backend is wired yet by design.
 * Connect a real endpoint here later (e.g. POST /api/enquiry or a CRM webhook);
 * every form already funnels through this single function.
 */
export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<{ ok: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (process.env.NODE_ENV === "development") {
    console.info("[enquiry] payload ready for API:", payload);
  }
  return { ok: true };
}
