/**
 * ExitButton — back to home.
 * Source: Pilot Runtime Spec v2 §C.6 (S3)
 */

interface ExitButtonProps {
  onExit: () => void;
}

export default function ExitButton({ onExit }: ExitButtonProps) {
  return (
    <button
      type="button"
      className="exit-button"
      onClick={onExit}
      aria-label="חזרה לדף הבית"
    >
      ←
    </button>
  );
}
