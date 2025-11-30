const BASE_URL = "http://localhost:8080/api/auth";

export const apiEndPoints = {
  GET_CREDITS: `${BASE_URL}/users/credits`,
  FETCH_FILES: `${BASE_URL}/files/my-files`,
  FETCH_PUBLIC_FILES: (id) => `${BASE_URL}/files//public/${id}`,
  FETCH_FILES_BY_ID: (id) => `${BASE_URL}/files/${id}`,
  UPLOAD_FILES: `${BASE_URL}/files/upload`,
  DOWNLOAD_FILE: (id) => `${BASE_URL}/files/download/${id}`,
  DELETE_FILE: (id) => `${BASE_URL}/files/${id}`,
  TOGGLE_FILE_STATUS: (id) => `${BASE_URL}/files/${id}/toggle-public`,
  PAYMENT_TRANSACTIONS_CREATE_ORDER: `${BASE_URL}/payments/create-order`,
  PAYMENT_TRANSACTIONS_VERIFY_PAYMENT: `${BASE_URL}/payments/verify-payment`,
  PAYMENT_TRANSACTIONS: `${BASE_URL}/transactions`,
  PUBLIC_FILE_VIEW: (fileId) => `${BASE_URL}/files/public/${fileId}`
};
