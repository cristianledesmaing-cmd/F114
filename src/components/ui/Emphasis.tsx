import { Fragment } from "react";

/**
 * Resalta los tramos escritos como `**así**` desde el panel,
 * para no tener que cargar HTML en los textos editables.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="text-charcoal font-semibold">
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
