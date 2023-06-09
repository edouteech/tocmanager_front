import Image from "next/image";

interface CategoriesProps {
  title: string;
  name: string;
  imageUrl: string;
  onClick :  () => void;
}

const Categories: React.FC<CategoriesProps> = ({ title, name, imageUrl, onClick }) => {
  return (
    <>
      <div className="bg-white h-[6rem] w-[6rem] rounded-lg flex flex-col items-center justify-center hover:bg-blue-400 hover:text-white cursor-pointer mr-3" onClick={onClick} >
        <Image src={imageUrl} alt={title} width={40} height={40} />
        <span className="mt-2 text-xs font-bold text-center block max-w-[4rem] break-words">
          {name}
        </span>
      </div>
    </>
  );
};

export default Categories;
