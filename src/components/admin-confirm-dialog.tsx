"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";

type AdminConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Remove",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: AdminConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onCancel}
        className="absolute inset-0 bg-[var(--color-ink)]/60 backdrop-blur-sm"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        aria-describedby="admin-confirm-desc"
        className="relative z-10 w-full max-w-md rounded-t-[2rem] bg-[var(--color-cream)] p-6 shadow-[0_-20px_60px_-20px_rgba(28,14,11,0.6)] sm:rounded-[2rem] sm:p-8 sm:shadow-[0_40px_80px_-30px_rgba(28,14,11,0.7)]"
      >
        <p className="eyebrow text-[var(--color-lacquer)]">Confirm</p>
        <h2
          id="admin-confirm-title"
          className="font-display mt-2 text-2xl leading-tight text-[var(--color-ink)]"
        >
          {title}
        </h2>
        <p id="admin-confirm-desc" className="mt-3 text-sm leading-6 text-[var(--color-ink)]/70">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-full border border-[var(--color-ink)]/15 bg-white px-5 text-sm font-bold text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/30 hover:bg-[var(--color-cream-2)]/80"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 rounded-full bg-[var(--color-lacquer)] px-5 text-sm font-bold text-[var(--color-cream)] transition hover:bg-[var(--color-lacquer)]/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
