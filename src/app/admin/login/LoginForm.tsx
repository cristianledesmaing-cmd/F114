"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/app/admin/actions";

export function LoginForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="mt-8">
      <input type="hidden" name="from" value={from} />

      <label className="block">
        <span className="text-overline text-graphite text-[0.8rem]">Contraseña</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          autoFocus
          className="border-charcoal/15 text-charcoal focus:ring-brass/40 mt-3 w-full border bg-white px-4 py-3 text-base outline-none focus:ring-2"
        />
      </label>

      {state.error ? (
        <p role="alert" className="text-brass-ink mt-3 text-sm">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-brass hover:bg-brass-ink mt-6 w-full rounded-md px-5 py-3 text-base font-semibold text-white transition-colors disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Ingresar"}
      </button>
    </form>
  );
}
