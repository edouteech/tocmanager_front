import React from "react";
import SidebarItem from "./SidebarItems";
import { CiGrid41, CiMobile2 } from "react-icons/ci";

const Sidebar: React.FC = () => {
  const ApplicationdropdownItems = ["SubMenu 1", "SubMenu 2", "SubMenu 3"];

  return (
    <div className="fixed top-0 left-0 w-1/5 h-screen bg-white border-r-[1px] black overflow-y-auto z-40 pt-20">
      <div className="relative">
        <div className="pl-4 font-medium text-sm">Main</div>
        <SidebarItem title="Dashboard" icon={CiGrid41} href="/" />
        <SidebarItem
          title="Application"
          icon={CiMobile2}
          hasDropdown
          dropdownItems={ApplicationdropdownItems}
          href="/"
        />
      </div>
      <div className="border-b-[1px] p-2 mx-2"></div>
      <div className="relative mt-2">
        <div className="pl-4 font-medium text-sm">Products</div>
        <SidebarItem title="Products" icon={CiGrid41} href="/products" />
        <SidebarItem title="Create Product" icon={CiMobile2} href="/products/create" />
        <SidebarItem title="Category" icon={CiMobile2} href="/categories" />
        <SidebarItem title="Brands" icon={CiMobile2} href="/" />
        <SidebarItem title="Sub Category" icon={CiMobile2} href="/" />
        <SidebarItem title="Print Barcode" icon={CiMobile2} href="/" />
        <SidebarItem title="Import Products" icon={CiMobile2} href="/" />
      </div>
      <div className="border-b-[1px] p-2 mx-2"></div>
      <div className="relative mt-2">
        <div className="pl-4 font-medium text-sm">Products</div>
        <SidebarItem title="Products" icon={CiGrid41} href="/" />
        <SidebarItem title="Create Product" icon={CiMobile2} href="/" />
        <SidebarItem title="Category" icon={CiMobile2} href="/categories" />
        <SidebarItem title="Brands" icon={CiMobile2} href="/" />
        <SidebarItem title="Sub Category" icon={CiMobile2} href="/" />
        <SidebarItem title="Print Barcode" icon={CiMobile2} href="/" />
        <SidebarItem title="Import Products" icon={CiMobile2} href="/" />
      </div>
    </div>
  );
};

export default Sidebar;
