export const submitAddTeams = async (values) => {
  return await fetch("/api/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(values),
  });
};

export const submitEditTeams = async (values, id) => {
  return await fetch(`/api/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(values),
  });
};

export const removeTeams = async (id) => {
  return await fetch(`/api/teams/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
