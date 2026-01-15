import DigitalClock from "./DigitalClock";

const Greetings = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h1>Welcome to our application! Mohamed</h1>
        <p className="text-sm font-light text-[var(--foreground)]">
          Give your best service for customers 😇
        </p>
      </div>

      <div className="text-right">
        <DigitalClock />
      </div>
    </div>
  );
};

export default Greetings;
