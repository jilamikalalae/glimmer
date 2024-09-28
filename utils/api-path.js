const apiPaths = () => {
  const rentClothes = (clothesId, size) => {
    if (size) {
      return `/api/v1/clothes/${clothesId}/rent?size=${size}`;
    } else {
      return `/api/v1/clothes/${clothesId}/rent`;
    }
  };

  return {
    rentClothes,
  };
};

export default apiPaths;
