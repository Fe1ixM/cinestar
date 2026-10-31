import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import { useCRUD } from "../../hooks/useCRUD";
import ContentManager from "./contentmanager/ContentManager";
import styles from "./backoffice.module.css";

const emptyBlogForm = {
  title: "",
  teaser: "",
  description: "",
};

function BlogSection() {
  const { items, loading, create, update, remove } = useCRUD("blogs");

  const [formData, setFormData] = useState(emptyBlogForm);
  const [editItem, setEditItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(emptyBlogForm);
    setEditItem(null);
    setImageFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      blogData.append(key, value);
    });

    if (imageFile) {
      blogData.append("file", imageFile);
    }

    let result;

    if (editItem) {
      blogData.append("id", editItem._id);
      result = await update(blogData, true);
    } else {
      result = await create(blogData, true);
    }

    if (result?.success) {
      resetForm();
    } else {
      console.error("Could not save blog:", result);
    }
  };

  const selectForEdit = (blog) => {
    setEditItem(blog);
    setFormData({
      title: blog.title || "",
      teaser: blog.teaser || "",
      description: blog.description || "",
    });
    setImageFile(null);
  };

  if (loading) {
    return <p className={styles.statusMessage}>Loading blogs...</p>;
  }

  return (
    <section className={styles.section} aria-labelledby="blogs-heading">
      <h2 id="blogs-heading" className={styles.sectionHeading}>
        Blogs
      </h2>

      <ContentManager
        columns={[
          { key: "title", label: "Title" },
          { key: "image", label: "Image", type: "image" },
          { key: "teaser", label: "Teaser" },
          { key: "description", label: "Description" },
        ]}
        data={items}
        onUpdate={selectForEdit}
        onDelete={remove}
      />

      <section className={styles.formSection}>
        <h3 className={styles.formHeading}>
          {editItem ? "Edit blog" : "Add a new blog"}
        </h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="blog-title">Title</label>
            <input
              id="blog-title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleFieldChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="blog-image">Image</label>

            {editItem?.image && (
              <p className={styles.currentImage}>
                Current image: {editItem.image}
              </p>
            )}

            <input
              id="blog-image"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImageFile(event.target.files?.[0] || null)
              }
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="blog-teaser">Teaser</label>
            <input
              id="blog-teaser"
              name="teaser"
              type="text"
              value={formData.teaser}
              onChange={handleFieldChange}
              placeholder="Enter a short introduction"
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="blog-description">Description</label>
            <textarea
              id="blog-description"
              name="description"
              value={formData.description}
              onChange={handleFieldChange}
              placeholder="Write the blog content"
              rows="6"
              required
            />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryButton}>
              {editItem ? "Save changes" : "Add blog"}
            </button>

            {editItem && (
              <button
                type="button"
                onClick={resetForm}
                className={styles.secondaryButton}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </section>
  );
}

function MessageSection() {
  const { items, loading, update, remove } = useCRUD("messages");
  const [expandedMessage, setExpandedMessage] = useState(null);

  const toggleRead = async (message) => {
    await update({
      id: message._id,
      status: !message.status,
    });
  };

  const toggleExpanded = (messageId) => {
    setExpandedMessage((currentId) =>
      currentId === messageId ? null : messageId,
    );
  };

  if (loading) {
    return <p className={styles.statusMessage}>Loading messages...</p>;
  }

  return (
    <section className={styles.section} aria-labelledby="messages-heading">
      <h2 id="messages-heading" className={styles.sectionHeading}>
        Messages <span>({items.length})</span>
      </h2>

      <ContentManager
        columns={[
          { key: "name", label: "Name" },
          { key: "subject", label: "Subject" },
          { key: "description", label: "Message" },
          { key: "status", label: "Status", type: "boolean" },
        ]}
        data={items}
        onUpdate={toggleRead}
        onDelete={remove}
      />

      <section className={styles.messageList} aria-label="Message details">
        {items.map((message) => {
          const isExpanded = expandedMessage === message._id;

          return (
            <article
              key={message._id}
              className={`${styles.messageCard} ${
                message.status ? styles.readMessage : styles.unreadMessage
              }`}
            >
              <button
                type="button"
                className={styles.messageHeader}
                onClick={() => toggleExpanded(message._id)}
                aria-expanded={isExpanded}
              >
                <span className={styles.messageSender}>
                  <strong>{message.name}</strong>
                  <span>{message.subject}</span>
                </span>

                <span className={styles.messageMetadata}>
                  <span
                    className={
                      message.status ? styles.readStatus : styles.unreadStatus
                    }
                  >
                    {message.status ? "Læst" : "Ulæst"}
                  </span>

                  <time dateTime={message.created}>
                    {new Date(message.created).toLocaleDateString("da-DK")}
                  </time>
                </span>
              </button>

              {isExpanded && (
                <div className={styles.messageDetails}>
                  <p>{message.description}</p>

                  <div className={styles.messageActions}>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => toggleRead(message)}
                    >
                      Markér som {message.status ? "ulæst" : "læst"}
                    </button>

                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => remove(message._id)}
                    >
                      Slet besked
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </section>
  );
}

export default function Backoffice() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("blogs");

  if (!isAuthenticated) {
    return (
      <main className={styles.backoffice}>
        <section className={styles.accessMessage}>
          <h1>Backoffice</h1>
          <p>
            Please <Link to="/login">log in</Link> to access the backoffice.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.backoffice}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Administration</p>
        <h1>Backoffice</h1>
      </header>

      <nav className={styles.tabs} aria-label="Backoffice sections">
        <button
          type="button"
          className={activeTab === "blogs" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("blogs")}
          aria-pressed={activeTab === "blogs"}
        >
          Blogs
        </button>

        <button
          type="button"
          className={activeTab === "messages" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("messages")}
          aria-pressed={activeTab === "messages"}
        >
          Beskeder
        </button>
      </nav>

      {activeTab === "blogs" ? <BlogSection /> : <MessageSection />}
    </main>
  );
}
