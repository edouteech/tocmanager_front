import Image from "next/image";
import { TbTrash } from "react-icons/tb";
import { useState } from "react";

interface ItemProps {
  imageSrc: string;
  name: string;
  code: string;
  amount: string;
  onTrashClick?: () => void;
}

const Item: React.FC<ItemProps> = ({
  imageSrc,
  name,
  code,
  amount,
  onTrashClick,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleTrashClick = () => {
    if (onTrashClick) {
      onTrashClick();
    }
  };

  return (
    <>
      <div className="bg-white w-full h-[90px] flex items-center p-4 rounded-lg shadow-md">
        <div className="w-1/3">
          <Image src={imageSrc} alt="Logo" width={200} height={200} />
          
        </div>
        <div className="w-2/3 ml-2">
          <h3 className="text-sm font-bold">{name}</h3>
          <div className="justify-between flex space-x-4 items-center mt-2">
            <div className="bg-indigo-400 h-4 p-2 justify-center items-center flex rounded-md text-xs text-white">
              {code}
            </div>
            <div className="font-medium text-sm">{amount}</div>
            <div className="relative">
              <TbTrash
                className="w-4 h-4 text-red-600 cursor-pointer"
                onClick={handleTrashClick}
              />
            </div>
          </div>
          <div className="flex justify-between w-1/3 m-1">
            <div
              className="border border-solid border-gray-300 rounded-sm w-3 h-3 text-xs justify-center items-center flex p-2 font-bold cursor-pointer"
              onClick={handleDecrement}
            >
              -
            </div>

            <div className="rounded-sm w-3 h-3 text-xs justify-center items-center flex p-2 font-bold">
              {quantity}
            </div>

            <div
              className="border border-solid border-gray-300 rounded-sm w-3 h-3 text-xs justify-center items-center flex p-2 font-bold cursor-pointer"
              onClick={handleIncrement}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
