import BackgroundLetterAvatar from "./BackgroundLetterAvatar";

const OrderList = () => {
  return (
    <div className="flex items-center justify-between space-x-2 py-2 border-b border-[#2a2a2a]">
      <BackgroundLetterAvatar name="Kent Dodds" />
      <div className="flex-1">
        <p className="text-sm text-[#e0e0e0]">Kent Dodds</p>
        <p className="text-xs text-[#9e9e9e]">Order placed on 2023-10-01</p>
      </div>
      <div className="flex-1">
        <p className="text-sm text-[#e0e0e0]">Table 5</p>
        <p className="text-xs text-[#9e9e9e]">3 items</p>
      </div>
      <div>
        <p className="text-sm text-[#e0e0e0]">Total: $99.99</p>
      </div>
    </div>
  );
};

export default OrderList;
