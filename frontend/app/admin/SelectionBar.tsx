import { Button } from "@/components/ui/button";

type Props = {
  count: number;
  onCreate: () => Promise<void>;
};

export function SelectionBar({ count, onCreate }: Props) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border px-6 py-3 rounded-xl shadow flex items-center gap-4">
      <span>{count} valda</span>

      <Button variant="green" onClick={onCreate}>
        Skapa bundle
      </Button>
    </div>
  );
}