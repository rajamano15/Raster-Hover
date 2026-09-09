"use client";

import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { COUNTRIES, DEMO_SOLUTIONS } from "@/data/demo";
import { EASE } from "@/lib/motion";
import { isEmail, isPhone, type FieldErrors } from "@/lib/validate";
import { submitEnquiry } from "@/lib/submit";
import Button from "@/components/ui/Button";
import { FieldWrap, Select, TextArea, TextInput } from "./Field";

type FieldName =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "country"
  | "solution"
  | "message";

const CONTACT_TOPICS = [
  ...DEMO_SOLUTIONS.filter((s) => s !== "Other"),
  "Customized Product",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const [values, setValues] = useState<Record<FieldName, string>>({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    solution: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors<FieldName>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: FieldName) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const validate = (): FieldErrors<FieldName> => {
    const e: FieldErrors<FieldName> = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!values.company.trim()) e.company = "Please enter your company.";
    if (!values.email.trim()) e.email = "Please enter your email.";
    else if (!isEmail(values.email))
      e.email = "That email address doesn’t look right — please check it.";
    if (!values.phone.trim()) e.phone = "Please enter your phone number.";
    else if (!isPhone(values.phone))
      e.phone = "Please enter a valid phone number.";
    if (!values.country) e.country = "Please select your country.";
    if (!values.solution) e.solution = "Please select a topic.";
    if (!values.message.trim())
      e.message = "Please tell us a little about your enquiry.";
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const firstError = Object.keys(e).find((k) => e[k as FieldName]);
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstError}"]`)
        ?.focus();
      return;
    }
    setStatus("submitting");
    await submitEnquiry({ kind: "contact", ...values });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        role="status"
        className="flex flex-col items-center gap-5 py-14 text-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full border border-line-brand bg-brand/10 text-brand-bright">
          <CheckCircle size={30} weight="duotone" />
        </span>
        <div className="max-w-sm space-y-2">
          <h3 className="text-xl font-semibold text-ink">Enquiry sent</h3>
          <p className="text-[0.92rem] leading-relaxed text-mist">
            Thank you, {values.name.split(" ")[0] || "there"}. Our team will get
            back to you at {values.email}.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FieldWrap label="Name" htmlFor="c-name" required error={errors.name}>
          <TextInput
            id="c-name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            error={errors.name}
            onChange={(e) => set("name")(e.target.value)}
          />
        </FieldWrap>
        <FieldWrap
          label="Company"
          htmlFor="c-company"
          required
          error={errors.company}
        >
          <TextInput
            id="c-company"
            name="company"
            autoComplete="organization"
            placeholder="Organisation name"
            value={values.company}
            error={errors.company}
            onChange={(e) => set("company")(e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Email" htmlFor="c-email" required error={errors.email}>
          <TextInput
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="name@company.com"
            value={values.email}
            error={errors.email}
            onChange={(e) => set("email")(e.target.value)}
          />
        </FieldWrap>
        <FieldWrap label="Phone" htmlFor="c-phone" required error={errors.phone}>
          <TextInput
            id="c-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 …"
            value={values.phone}
            error={errors.phone}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </FieldWrap>
        <FieldWrap
          label="Country"
          htmlFor="c-country"
          required
          error={errors.country}
        >
          <Select
            id="c-country"
            name="country"
            autoComplete="country-name"
            value={values.country}
            error={errors.country}
            onChange={(e) => set("country")(e.target.value)}
          >
            <option value="" disabled>
              Select country
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap
          label="Product / Solution"
          htmlFor="c-solution"
          required
          error={errors.solution}
        >
          <Select
            id="c-solution"
            name="solution"
            value={values.solution}
            error={errors.solution}
            onChange={(e) => set("solution")(e.target.value)}
          >
            <option value="" disabled>
              What is this about?
            </option>
            {CONTACT_TOPICS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FieldWrap>
        <FieldWrap
          label="Message"
          htmlFor="c-message"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <TextArea
            id="c-message"
            name="message"
            placeholder="Tell us about your requirements…"
            value={values.message}
            error={errors.message}
            onChange={(e) => set("message")(e.target.value)}
            rows={5}
          />
        </FieldWrap>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-brand-ink/30 border-t-brand-ink"
              />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <PaperPlaneTilt size={16} weight="bold" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
