import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://localhost:3042";

const resourceRoutes = {
  blogs: "blog",
  messages: "message",
  reviews: "review",
  faqs: "faq",
  subscriptions: "subscription",
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function useCRUD(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const resource = resourceRoutes[endpoint];

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke indlæse information.");
      }

      const result = await response.json();

      setItems(Array.isArray(result) ? result : result.data || []);
    } catch (error) {
      setError(error.message);
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const create = async (data, isFormData = false) => {
    try {
      setError("");

      const headers = getAuthHeaders();

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${BASE_URL}/${resource}`, {
        method: "POST",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke oprette item.");
      }

      await fetchItems();

      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error(`Error creating ${endpoint}:`, error);

      return { success: false, error: error.message };
    }
  };

  const update = async (data, isFormData = false) => {
    try {
      setError("");

      const headers = getAuthHeaders();

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${BASE_URL}/${resource}`, {
        method: "PUT",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke opdatere item.");
      }

      await fetchItems();

      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error(`Error updating ${endpoint}:`, error);

      return { success: false, error: error.message };
    }
  };

  const remove = async (id) => {
    const confirmed = window.confirm("Er du sikker på at slette item?");

    if (!confirmed) {
      return { success: false };
    }

    try {
      setError("");

      const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke slette item.");
      }

      await fetchItems();

      return { success: true };
    } catch (error) {
      setError(error.message);
      console.error(`Error deleting ${endpoint}:`, error);

      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    if (!resource) {
      setError(`Unknown resource: ${endpoint}`);
      setLoading(false);
      return;
    }

    fetchItems();
  }, [endpoint, resource, fetchItems]);

  return {
    items,
    loading,
    error,
    create,
    update,
    remove,
    refresh: fetchItems,
  };
}
