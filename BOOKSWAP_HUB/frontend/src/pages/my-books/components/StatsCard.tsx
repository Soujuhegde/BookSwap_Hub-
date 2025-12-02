import Icon from '../../../components/AppIcon';

interface StatsCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

const StatsCard = ({ icon, label, value, color }: StatsCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-150 ease-out hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div>
          <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;