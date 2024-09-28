const apiPaths = () => {
  const rentClothes = (clothesId, size) => {
    return `/api/v1/clothes/${clothesId}/rent`;
  };

  return {
    rentClothes,
  };
};

export default apiPaths;
