export function formatDate(date, locale) {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  return date.toLocaleDateString(locale ?? 'en-US', options)
}
