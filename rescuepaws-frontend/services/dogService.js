export const getDogs = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/dogs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch dogs");
  }

  return data;
};

export const deleteDog = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/api/dogs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete dog");
  }

  return data;
};

export const updateDogStatus = async (id, status) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("dog", JSON.stringify({ status }));

  const res = await fetch(`http://localhost:8080/api/dogs/${id}/status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update dog status");
  }

  return data;
};

export const pickupDog = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/api/dogs/${id}/pickup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to pickup dog");
  }

  return data;
};
