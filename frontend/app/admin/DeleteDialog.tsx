import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props<T> = {
  item: T | null;
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
  getExtraInfo?: (item: T) => React.ReactNode;
  getId: (item: T) => number;
};

export function DeleteDialog<T>({
  item,
  onClose,
  onDelete,
  getExtraInfo,
  getId,
}: Props<T>) {
  return (
    <AlertDialog open={!!item} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ta bort?</AlertDialogTitle>
        </AlertDialogHeader>

        {item && getExtraInfo && getExtraInfo(item)}

        <div className="flex justify-end gap-2">
          <AlertDialogCancel>Avbryt</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={async () => {
              if (!item) return;
              await onDelete(getId(item));
              onClose();
            }}
          >
            Ta bort
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
