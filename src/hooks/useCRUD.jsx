import { useState, useEffect, useCallback } from "react";

const BASE_URL = "http://localhost:3042";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function useCRUD(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/${endpoint}`);

      if (!response.ok) {
        throw new Error("Kunne ikke indlæse information. Prøv igen.");
      }

      const result = await response.json();

      setItems(Array.isArray(result) ? result : result.data || []);
    } catch (error) {
      setError(error.message);
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

      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke create item. Prøv igen.");
      }

      await fetchItems();

      return { success: true };
    } catch (error) {
      setError(error.message);
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

      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "PUT",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke opdaterer item. Prøv igen.");
      }

      await fetchItems();

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const remove = async (id) => {
    const confirmed = window.confirm("Er du sikker på at slette item?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke slette item. Prøv igen.");
      }

      await fetchItems();

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
