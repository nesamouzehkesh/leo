export function formatDate(date: { month: number | null; year: number | null } | null): string {
  if (!date || !date.month || !date.year) return 'Unknown';
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return `${monthNames[date.month - 1]} ${date.year}`;
}

export function formatDuration(minutes: number | null): string {
  if (!minutes) return 'Unknown';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function getStatusColor(status: string | null): string {
  switch (status?.toLowerCase()) {
    case 'releasing': return 'green';
    case 'finished': return 'blue';
    case 'not yet released': return 'yellow';
    case 'cancelled': return 'red';
    default: return 'gray';
  }
} 