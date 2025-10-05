import TripCard from '../TripCard';

export default function TripCardExample() {
  return (
    <div className="p-4 max-w-md">
      <TripCard
        id="1"
        name="Summer Adventure in Japan"
        destination="Tokyo, Japan"
        startDate="2024-07-15"
        endDate="2024-07-22"
        description="Exploring the vibrant streets of Tokyo, ancient temples of Kyoto, and relaxing in traditional onsens."
      />
    </div>
  );
}
