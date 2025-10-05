import ActivityItem from '../ActivityItem';

export default function ActivityItemExample() {
  return (
    <div className="p-4 max-w-2xl space-y-4">
      <ActivityItem
        id="1"
        time="09:00"
        title="Breakfast at local cafe"
        location="Downtown District"
        description="Try the famous matcha latte and fresh pastries"
      />
      <ActivityItem
        id="2"
        time="11:00"
        title="Visit Museum of Modern Art"
        location="Cultural Center"
        description="Explore contemporary art exhibitions and installations"
      />
    </div>
  );
}
