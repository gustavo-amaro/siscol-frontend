export function dateFormat(date) {
  let data = new Date(date);
  data.setDate(data.getDate() + 1);
  return data.toLocaleDateString();
}
