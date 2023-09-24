export const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const apiUrl = "http://127.0.0.1:8000/api/";
