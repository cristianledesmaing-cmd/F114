import type { ReactNode } from "react";

const inputClass =
  "border-charcoal/15 text-charcoal focus:ring-brass/40 mt-2 w-full border bg-white px-3 py-2.5 text-base outline-none focus:ring-2";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-overline text-graphite text-[0.75rem]">{label}</span>
      {hint ? <span className="text-stone mt-1 block text-xs">{hint}</span> : null}
      {children}
    </label>
  );
}

export function TextInput({
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

export function TextArea({
  name,
  defaultValue,
  rows = 4,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      rows={rows}
      placeholder={placeholder}
      className={`${inputClass} resize-y`}
    />
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
  value,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  value?: string;
}) {
  return (
    <label className="text-charcoal flex items-center gap-2.5 text-base">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="accent-brass h-4 w-4"
      />
      {label}
    </label>
  );
}

export function FileInput({ name, label }: { name: string; label: string }) {
  return (
    <Field label={label} hint="JPG, PNG, WEBP, AVIF o SVG. Hasta 10 MB.">
      <input
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
        className="text-graphite file:border-charcoal/20 file:text-charcoal mt-2 w-full text-sm file:mr-3 file:rounded-md file:border file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold"
      />
    </Field>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-charcoal/10 border bg-white p-6">
      <h2 className="text-charcoal text-xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

export function FormStatus({ state }: { state: { error?: string; message?: string } }) {
  if (state.error) {
    return (
      <p role="alert" className="border-brass/40 bg-brass/10 text-charcoal border p-3 text-sm">
        {state.error}
      </p>
    );
  }

  if (state.message) {
    return (
      <p role="status" className="border-charcoal/15 text-graphite border bg-white p-3 text-sm">
        {state.message}
      </p>
    );
  }

  return null;
}
