export function getIconForTool(type: string) {
  const map: Record<string, string> = {
    gmail: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
    search: "https://cdn-icons-png.flaticon.com/512/622/622669.png",
    webSearch: "https://cdn-icons-png.flaticon.com/512/151/151773.png",
    default: "https://cdn-icons-png.flaticon.com/512/25/25313.png",
  };
  return map[type] ?? map.default;
}