
export const formatDateToInput = (isoString: any) => {
  if (!isoString) return "";
  const localDate = new Date(isoString);
  const localISOString = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000).toISOString();
  return localISOString.slice(0, 16);
};

export const formatInputToISO = (inputValue:any) => {
  return new Date(inputValue).toISOString();
};
