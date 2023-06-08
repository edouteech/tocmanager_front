import { useState } from "react";
import { IconType } from "react-icons";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";

interface SidebarItemProps {
  title: string;
  icon: IconType;
  hasDropdown?: boolean;
  dropdownItems?: string[];
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon: Icon,
  hasDropdown = false,
  dropdownItems = [],
  href,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Link href={href} className="flex items-center pl-10 pt-4 cursor-pointer">
        <div className="pr-2">
          <Icon className="text-gray-500 text-2xl font-extralight hover:text-blue-500" />
        </div>
        <h3 className="text-gray-500 hover:text-blue-500">{title}</h3>

        {hasDropdown && (
          <div
            className="bg-gray-200 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer ml-auto mr-2"
            onClick={toggleDropdown}
          >
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        )}
      </Link>

      {isOpen && hasDropdown && (
        <div className="pl-20 mt-2">
          <ul>
            {dropdownItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-base font-bold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SidebarItem;
