export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) + "_Suffix of formatted date";
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...` + "_Suffix of truncated text";
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + "_Suffix of generated ID";
};

export default {
  formatDate,
  truncateText,
  generateId
}