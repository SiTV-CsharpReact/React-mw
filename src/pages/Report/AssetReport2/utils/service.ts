export const getMax = (data: any) => {
  const maxValue = data?.map((item: any) => item?.ANAV);
  let sum = 0;
  for (let i = 0; i < maxValue?.length; i++) {
    sum += maxValue[i];
  }
  return Math.floor(sum / maxValue?.length);
};

export const getMin = (data: any) => {
  const minValue = data?.map((item: any) => item?.ANAV);
  let sum = 0;
  for (let i = 0; i < minValue?.length; i++) {
    sum += minValue[i];
  }
  return Math.floor(sum / minValue?.length);
};
