import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";

import {
  AiOutlinePlus,
  AiFillPrinter,
  AiOutlineInfoCircle,
  AiFillEdit,
} from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
import { Category } from "@/Models/Category";
import toast, { Toaster } from "react-hot-toast";
import DeleteModal from "@/components/DeleteModal";
import {useSession } from "next-auth/react";
import Router from "next/router";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number>();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/login");
  }, [status]);

  if (status === "authenticated") {
    const fetchCategories = async (currentPage: number) => {
      try {
        const token = data.user?.original.access_token;
        const response = await axios.get(
          `${apiBaseUrl}/categories?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              compagnie_id: data.user?.original.user.compagnies[0].id,
            },
          }
        );
        setCategories(response.data.data.data);
        setTotalPages(response.data.data.total);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories(currentPage);

    const handleSearchInputChange = (e: any) => {
      setSearchValue(e.target.value);
    };

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleDelete = async (category_id: number) => {
      setCategoryIdToDelete(category_id);
      setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
      try {
        const token = data.user?.original.access_token;
        const response = await axios.delete(
          `${apiBaseUrl}/categories/${categoryIdToDelete}`,
          {
            params: {
              compagnie_id: data.user?.original.user.compagnies[0].id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && response.data.status === "success") {
          toast.success("Catégorie supprimée avec succès !", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 2000,
          });

          fetchCategories(currentPage);
        } else {
          toast.error(response.data.message, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            duration: 2000,
          });
        }
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
      setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
      setShowDeleteModal(false);
    };
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="flex px-4">
          <div className="w-1/5">
            <Sidebar />
          </div>
          <div className="w-4/5  py-[5rem] ">
            <div className="relative justify-between flex items-center">
              <div className="relative">
                <h3 className="font-bold text-base">Product Category list</h3>
                <p className="font-small text-gray-600 text-sm">
                  View/Search product Category
                </p>
              </div>

              <div className="flex justify-center items-center space-x-2 mr-4">
                <Link href="/categories/create">
                  <button className="flex items-center bg-gray-200 hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:text-white">
                    <AiOutlinePlus className="mr-2" />
                    Add Category
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full bg-white rounded-lg mt-4 p-4 border-[1px] black ">
              <div className="relative justify-between flex items-center">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                    <AiOutlineSearch className="text-gray-500 w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-3 focus:outline-none focus:border-blue-500"
                    placeholder="Rechercher"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                  />
                </div>

                <div className="flex justify-center items-center ">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                    <FaRegFilePdf className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="relative">
                    <SiMicrosoftexcel className="mr-4 text-green-500 font-bold w-6 h-6" />
                  </div>
                  <div className="relative">
                    <AiFillPrinter className="mr-4 text-gray-500 font-bold w-6 h-6" />
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <table className="w-full mt-4">
                  <thead className="bg-gray-100">
                    <tr className="text-sm">
                      <th className="py-2 px-4">Catégorie</th>
                      <th className="py-2 px-4">Catégorie parente</th>
                      <th className="py-2 px-4">Date</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 px-4">
                          Aucun élément trouvé
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category) => (
                        <tr
                          className="hover:bg-gray-300 text-center"
                          key={category.id}
                        >
                          <td className="py-4 px-4 text-center">
                            {category.name}
                          </td>
                          <td className="py-4 px-4">
                            {category.parent_id ? category.parent?.name : "-"}
                          </td>
                          <td className="py-4 px-4">
                            {moment(category.created_at).format("MMMM YYYY")}
                          </td>
                          <td className="py-4 px-4 space-x-4">
                            <button
                              className="cursor-pointer "
                              onClick={() => handleDelete(category.id)}
                            >
                              <IoTrashBin className="text-red-500 text-xl" />
                            </button>
                            <Link
                              href="/categories/edit/[id]"
                              as={`/categories/edit/${category.id}`}
                            >
                              <button className="cursor-pointer">
                                <AiFillEdit className="text-blue-500 text-xl cursor-pointer" />
                              </button>
                            </Link>
                            <Link
                              href="/categories/details/[id]"
                              as={`/categories/details/${category.id}`}
                            >
                              <button className="cursor-pointer">
                                <AiOutlineInfoCircle className="text-green-500 text-xl cursor-pointer" />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}

                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-4 px-4 text-center">
                          Aucune catégorie
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {totalPages > 10 && (
                <div className="flex justify-between items-center mt-4">
                  <div>{`Total Catégories : ${totalPages}`}</div>

                  <div className="flex">
                    {Array.from(
                      { length: Math.ceil(totalPages / 10) },
                      (_, index) => index * 1 + 1
                    ).map((page) => (
                      <button
                        key={page}
                        className={`px-2 py-1 mx-1 rounded ${
                          page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 hover:bg-gray-300"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Toaster />
        </div>

        <DeleteModal
          isOpen={showDeleteModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Supprimer la catégorie"
          text="Êtes-vous sûr de vouloir supprimer cette catégorie ?"
        />
      </>
    );
  }
};

export default Categories;
