import { createContext, useContext, useState, useEffect } from "react";

const useAuthContext = createContext();

const API_BASE_URL = "http://localhost:3042";
const TOKEN_STORAGE_KEY = "token";

// JWT token
function readStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// Payload (Data i JWT token. (Role, user, ... ))
function decodeTokenPayload(token) {
  if (!token) {
    return null;
  }

  try {
    // Split deler en string til et array, hvor end den finder en separator. ("henrik.lars.marie")
    // [1] Angiver hvilket index
    const encodedPayload = token.split(".")[1];

    if (!encodedPayload) {
      return null;
    }
    const base64Payload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");

    const paddedPayload = base64Payload.padEnd(
      base64Payload.length + ((4 - (base64Payload.length % 4)) % 4),
      "=",
    );
    return JSON.parse(atob(paddedPayload));
  } catch {
    return null;
  }
}
