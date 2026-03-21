export const loginUser = async (data) => {
  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};

export const registerUser = async (data) => {

      console.log("-----------data--------------------",data);

  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("-------------------------------",result);

  if (!res.ok) {
    throw new Error(result.message || "Register failed");
  }

  return result;
};