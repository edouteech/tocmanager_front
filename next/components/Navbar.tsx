import React from "react";
import { HiLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Link from "next/link";

interface NavBarProps {
  userName: string;
}

const NavBar: React.FC<NavBarProps> = ({ userName }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="text-xl font-bold">{userName}</div>
      <div className="flex space-x-4">
        <Link href="/dashboard" className="text-white">
        Catégories
        </Link>
        <Link href="/products" className="text-white">
          Produits
        </Link>
        <Link href="/sells" className="text-white">
          Ventes
        </Link>
        <Link href="/clients" className="text-white">
          Clients
        </Link>
        <Link href="/suppliers" className="text-white">
          Fournisseurs
        </Link>
        <Link href="/purchases" className="text-white">
          Achats
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center text-white focus:outline-none"
      >
        <HiLogout className="text-xl" />
        <span className="ml-2">Logout</span>
      </button>
    </nav>
  );
};

export default NavBar;
