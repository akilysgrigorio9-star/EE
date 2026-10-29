import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
}

const control =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-forest shadow-sm transition focus:border-moss focus:outline-none focus:ring-4 focus:ring-beige/50 aria-[invalid=true]:border-red-700";

function Wrap({ id, label, error, hint, optional, children }: BaseProps & { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label} {optional && <span className="font-normal text-forest/55">(opcional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-forest/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-semibold text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({ id, label, error, hint, optional, ...rest }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional}>
      <input id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={`${control} ${error ? "border-red-700" : "border-beige"}`} {...rest} />
    </Wrap>
  );
}

export function TextAreaField({ id, label, error, hint, optional, ...rest }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea id={id} rows={4} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={`${control} resize-y ${error ? "border-red-700" : "border-beige"}`} {...rest} />
    </Wrap>
  );
}

export function SelectField({ id, label, error, hint, optional, children, ...rest }: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint} optional={optional}>
      <select id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} className={`${control} ${error ? "border-red-700" : "border-beige"}`} {...rest}>
        {children}
      </select>
    </Wrap>
  );
}
