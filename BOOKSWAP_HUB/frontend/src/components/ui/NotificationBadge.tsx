interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
}

const NotificationBadge = ({ count, maxCount = 99, className = '' }: NotificationBadgeProps) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();

  return (
    <span
      className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-primary-foreground bg-primary rounded-full ${className}`}
      aria-label={`${count} unread notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;