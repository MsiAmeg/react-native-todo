export const formatInput = (text: string): string => {
  return text.replace(/[ +\n]{2,}/, ' ').trim();
};
