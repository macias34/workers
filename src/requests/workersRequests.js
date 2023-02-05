export const submitAddWorker = async (values) => {
  return await fetch("/api/workers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(values),
  });
};

export const submitEditWorker = async (values, id) => {
  return await fetch(`/api/workers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(values),
  });
};

export const removeWorker = async (id) => {
  return await fetch(`/api/workers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
