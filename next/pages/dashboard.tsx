import { SessionProvider, getSession } from "next-auth/react";
import NavBar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import {
  createCategory,
  deleteCategory,
  readCategories,
  updateCategory,
} from "@/libs/Categories";
import { Category } from "@/types/category";
import { format } from "date-fns";
import { FaTrash, FaEdit, FaInfoCircle } from "react-icons/fa";
import Select from "react-select";

interface Session {
  user: User;
  expires: string;
}

interface DashboardProps {
  page: number;
}

const Dashboard: React.FC<DashboardProps> = ({ page }) => {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [user, setUser] = useState<User>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [category_id, setCategoryID] = useState<number>(0);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchCategories = async () => {
    if (user) {
      try {
        const response = await readCategories(
          user.compagnie_id,
          user.accessToken,
          page
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [user, page]);

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedOption(selectedOption);
  };

  const handleSaveCategory = async () => {
    try {
      const newCategory = {
        name: name,
        parent_id: selectedOption?.value || null,
      };
      if (user) {
        await createCategory(user.compagnie_id, newCategory, user.accessToken);
        handleCloseModal();
        fetchCategories();
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la catégorie :", error);
    }
  };

  const handleDelete = async (category_id: number) => {
    try {
      if (user) {
        await deleteCategory(user.compagnie_id, category_id, user.accessToken);
        fetchCategories();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  const handleUpdate = async (
    category_id: number,
    parent_id: number | null,
    name: string
  ) => {
    const parentCategory = categories.find(
      (category) => category.id === parent_id
    );

    const parentName = parentCategory ? parentCategory.name : "";
    setCategoryID(category_id);
    setName(name);
    setSelectedOption(
      parent_id !== null && parent_id !== undefined
        ? { value: parent_id.toString(), label: parentName }
        : null
    );

    setIsModalOpen(true);
    setIsUpdate(true);
  };

  const submitUpdate = async () => {
    try {
      const newCategory = {
        name: name,
        parent_id: selectedOption?.value || null,
      };

      if (user) {
        await updateCategory(
          user.compagnie_id,
          category_id,
          newCategory,
          user.accessToken
        );
        
        fetchCategories();
        setIsModalOpen(false);
        setIsUpdate(false);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie :", error);
    }
  };

  return (
    <SessionProvider>
      <div>{user && <NavBar userName={user.name} />}</div>

      <div className="mt-4">
        <div className="my-4 mx-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOpenModal}
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
                Catégorie parente
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Date
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
            {Array.isArray(categories) ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 border-b text-center">
                    {category.id}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {category.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {category.parent_id ? category.parent.name : "-"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {format(new Date(category.created_at), "dd MMMM yyyy")}
                  </td>
                  <td className="px-4 py-2 border-b text-center ">
                    <FaTrash
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(category.id)}
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center ">
                    <FaEdit
                      className="text-blue-700 cursor-pointer"
                      onClick={() =>
                        handleUpdate(
                          category.id,
                          category.parent_id,
                          category.name
                        )
                      }
                    />
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <FaInfoCircle className="text-blue-500 cursor-pointer" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 border-b">
                  Aucune catégorie trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
          <div className="relative bg-white rounded-lg p-8">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-bold mb-4">Ajouter une catégorie</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Nom de la catégorie :
              </label>
              <input
                type="text"
                id="name"
                className="border border-gray-300 p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block mb-2">
                Sélectionnez une option :
              </label>

              <Select
                className="border p-2 rounded w-full"
                id="category"
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={isUpdate ? submitUpdate : handleSaveCategory}
              >
                {isUpdate ? "Mettre à jour" : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </SessionProvider>
  );
};

export default Dashboard;
