import Image from "next/image";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";
interface CardProps {
  quantity: number;
  category: string;
  name: string;
  price: number;
  imageUrl: string;
}
const Card: React.FC<CardProps> = ({
  quantity,
  category,
  name,
  price,
  imageUrl,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };
  return (
    <>
      <div
        className={`flex bg-white h-[16em] rounded-lg w-[10rem] overflow-hidden border-2 mr-2${
          isSelected ? "border-blue-500" : ""
        }`}
        onClick={handleClick}
      >
        <div className="relative flex flex-col justify-between ">
          {isSelected && (
            <div className="absolute top-0 left-0 bg-blue-500 p-1 rounded-br-lg justify-center flex items-center">
              <BsCheck className="text-white w-6" />
            </div>
          )}
          <div className="h-3/4 rounded-t-lg">
            <Image
              src={imageUrl}
              alt="Product Image"
              width={200}
              height={200}
              className="rounded-t-lg h-full object-cover overflow-hidden hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center items-center p-4">
            <h5 className="mb-2 text-sm font-bold text-gray-400">{category}</h5>
            <h4 className="mb-2 text-md font-medium">{name}</h4>
            <h6 className="text-sm text-red-600">{price}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
