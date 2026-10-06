import Button from "./Button";
import Modal from "./Modal";

/**
 * <ConfirmDialog
 *   open={Boolean(target)} title="Delete project?" message={`"${target?.title}" will be permanently deleted.`}
 *   loading={deleting} onConfirm={handleDelete} onCancel={() => setTarget(null)} />
 *
 * The parent owns the async work: set `loading` while it runs (this also blocks closing the dialog).
 */
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      dismissible={!loading}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={danger ? "danger" : "primary"} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </Modal>
  );
}