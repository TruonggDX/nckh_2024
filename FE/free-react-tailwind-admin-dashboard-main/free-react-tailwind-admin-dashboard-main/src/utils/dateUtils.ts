
export const formatDateToInput = (isoString:any) => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().slice(0, 16);
};

export const formatInputToISO = (inputValue:any) => {
  return new Date(inputValue).toISOString();
};
