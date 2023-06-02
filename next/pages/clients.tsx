import { getSession, SessionProvider } from "next-auth/react";
import { User } from "@/types/user";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";
import { Category } from "@/types/category";
import { readCategories } from "@/libs/Categories";
import Select from "react-select";
import { Product } from "@/types/product";
import { createProduct, readProducts } from "@/libs/Products";
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import { Client } from "@/types/client";
import { readClients } from "@/libs/Clients";

interface Session {
  user: User;
  expires: string;
}

interface ClientsPageProps {
  page: number;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ page }) => {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [user, setUser] = useState<User>();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getSession().then((session) => {
      if (session === null) {
        router.push("/login");
      } else {
        setSession(session as Session);
        setUser(session.user as User);
      }
    });
  }, []);

  const fetchClients = async () => {
    if (user) {
      try {
        const response = await readClients(
          user.compagnie_id,
          user.accessToken,
          page
        );
        setClients(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }
  };

  useEffect(() => {
    fetchClients();
  }, [user, page]);

  return (
    <SessionProvider>
      <div>{user && <NavBar userName={user.name} />}</div>
      <h1 className="text-center items-center flex justify-center mt-6 text-2xl font-bold">
        Liste des produits
      </h1>
      <div className="mt-4flex ">
        <div className="my-4 mx-4 justify-end ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {}}
          >
            Ajouter
          </button>
        </div>

        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">Id</th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Nom
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Email
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Nature
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Supprimer
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Éditer
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b" text-center>
                Détails
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="px-4 py-2 text-center">{client.id}</td>
                <td className="px-4 py-2 text-center">{client.name}</td>
                <td className="px-4 py-2 text-center">
                  {client.email ? client.email : "-"}
                </td>
                <td className="px-4 py-2 text-center">{client.nature}</td>
                <td className="px-4 py-2 text-center">
                  <FaTrash
                    className="text-red-600 cursor-pointer inline-block"
                    onClick={() => ({})}
                  />
                </td>
                <td className="px-4 py-2  text-center">
                  <FaEdit
                    className="text-blue-700 cursor-pointer inline-block"
                    onClick={() => ({})}
                  />
                </td>
                <td className="px-4 py-2  text-center">
                  <FaInfoCircle className="text-blue-500 cursor-pointer inline-block" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SessionProvider>
  );
};

export default ClientsPage;
