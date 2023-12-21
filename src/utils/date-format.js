export function dateFormat(inputDate) {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const dateObj = new Date(inputDate);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const monthName = months[monthIndex];

  const formattedDate = `${day} ${monthName} ${year} в ${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  return formattedDate;
}
