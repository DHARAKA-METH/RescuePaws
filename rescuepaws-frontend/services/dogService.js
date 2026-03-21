export const getDogs = async () => {
  const token = localStorage.getItem("token");
  console.log("token  get dogs-----------", token);

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
