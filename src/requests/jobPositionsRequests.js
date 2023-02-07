export const submitAddJobPosition = async (values) => {
  return await fetch("/api/job_positions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(values),
  });
};

export const submitEditJobPosition = async (values, id) => {
  return await fetch(`/api/job_positions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(values),
  });
};

export const removeJobPosition = async (id) => {
  return await fetch(`/api/job_positions/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
