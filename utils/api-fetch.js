const { default: apiPaths } = require("./api-path");

const paths = apiPaths(); // Use the apiPaths function

const apiFetch = () => {
  const rentFetch = async (clothesId, size, router) => {
    const res = await fetch(paths.rentClothes(clothesId, size), {
      method: "POST",
    });
    if (res.status == 401) {
      router.push("/auth/login");
    }
    if (!res.ok) {
      throw new Error("Failed to rent the product");
    }
    return await res.json();
  };

  return {
    rentFetch,
  };
};

export default apiFetch;
