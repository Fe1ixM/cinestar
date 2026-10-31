import styles from "./contentmanager.module.css";

export default function ContentManager({
  columns,
  data = [],
  onUpdate,
  onDelete,
}) {
  if (data.length === 0) {
    return <p className={styles.emptyState}>No entries found.</p>;
  }

  return (
    <div className={styles.manager}>
      <table className={styles.contentTable}>
        <caption className={styles.tableCaption}>Content overview</caption>

        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id} className={styles.contentRow}>
              {columns.map((column) => {
                const value = item[column.key];

                return (
                  <td key={column.key} className={styles.contentCell}>
                    {column.type === "image" ? (
                      value ? (
                        <img
                          src={value}
                          alt={item.title ? `Image for ${item.title}` : ""}
                          className={styles.contentImage}
                        />
                      ) : (
                        <span className={styles.mutedText}>No image</span>
                      )
                    ) : column.type === "boolean" ? (
                      <span
                        className={
                          value ? styles.readStatus : styles.unreadStatus
                        }
                      >
                        {value ? "Læst" : "Ulæst"}
                      </span>
                    ) : (
                      <span className={styles.cellContent}>
                        {value == null || value === "" ? "—" : String(value)}
                      </span>
                    )}
                  </td>
                );
              })}

              <td className={styles.contentCell}>
                <div className={styles.contentActions}>
                  {onUpdate && (
                    <button
                      type="button"
                      onClick={() => onUpdate(item)}
                      aria-label={`Edit ${item.title || item.name || "entry"}`}
                      className={styles.editAction}
                    >
                      {columns.some((column) => column.key === "title")
                        ? "Edit"
                        : "Toggle status"}
                    </button>
                  )}

                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(item._id)}
                      aria-label={`Delete ${item.title || item.name || "entry"}`}
                      className={styles.deleteAction}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
