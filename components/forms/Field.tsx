import { CaretDown } from "@phosphor-icons/react";
import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

const inputBase =
  "w-full rounded-xl border bg-white/[0.03] px-4 text-[0.95rem] text-ink placeholder:text-faint transition-all duration-300 outline-none focus:bg-white/[0.05]";

const stateCls = (error?: string) =>
  error
    ? "border-danger/60 focus:border-danger"
    : "border-line hover:border-white/15 focus:border-brand/60";

type WrapProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function FieldWrap({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className = "",
}: WrapProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-[0.8rem] font-medium tracking-wide text-mist"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-brand-bright">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-[0.78rem] text-danger">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[0.78rem] text-faint">{hint}</p>
      ) : null}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & { error?: string };

export function TextInput({ error, className = "", ...rest }: InputProps) {
  return (
    <input
      {...rest}
      aria-invalid={error ? true : undefined}
      className={`${inputBase} h-12 ${stateCls(error)} ${className}`}
    />
  );
}

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { error?: string };

export function TextArea({ error, className = "", ...rest }: TextareaProps) {
  return (
    <textarea
      {...rest}
      aria-invalid={error ? true : undefined}
      className={`${inputBase} min-h-32 resize-y py-3.5 ${stateCls(error)} ${className}`}
    />
  );
}

type SelectProps = ComponentPropsWithoutRef<"select"> & { error?: string };

export function Select({ error, className = "", children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        {...rest}
        aria-invalid={error ? true : undefined}
        className={`${inputBase} h-12 cursor-pointer appearance-none pr-11 ${stateCls(error)} ${className} [&>option]:bg-bg-3 [&>option]:text-ink`}
      >
        {children}
      </select>
      <CaretDown
        size={15}
        weight="bold"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mist"
      />
    </div>
  );
}
