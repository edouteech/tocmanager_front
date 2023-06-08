import { Product } from "@/Models/Product";
import DeleteModal from "@/components/DeleteModal";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AiFillEdit,
  AiFillPrinter,
  AiOutlineInfoCircle,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { SiMicrosoftexcel } from "react-icons/si";
const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number>();

  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleCheckboxChange = (value: any) => {
    if (selectedFilter === value) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter(value);
    }
  };

  const fetchProducts = async (currentPage: number) => {
    try {
      const token = "183|iHHcwWaBKUayYDJ428KvhtuvhtvhBwep7hQH4J0N";
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            compagnie_id: 1,
          },
        }
      );
      setProducts(response.data.data.data);
      setTotalPages(response.data.data.total);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleSearchInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();

    if (selectedFilter === "code") {
      return product.code.toLowerCase().includes(lowerCaseSearchValue);
    }

    if (selectedFilter === "category") {
      return product.category?.name
        .toLowerCase()
        .includes(lowerCaseSearchValue);
    }
    return product.name.toLowerCase().includes(lowerCaseSearchValue);
  });

  const handleDelete = async (category_id: number) => {
    setProductIdToDelete(category_id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = "183|iHHcwWaBKUayYDJ428KvhtuvhtvhBwep7hQH4J0N";
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/products/${productIdToDelete}`,
        {
          params: {
            compagnie_id: 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status === "success") {
        toast.success("Produit supprimée avec succès !", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });

        fetchProducts(currentPage);
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
      console.error("Failed to delete product:", error);
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

        <div className="w-4/5 py-[5rem] ">
          <div className="relative justify-between flex items-center">
            <div className="relative">
              <h3 className="font-bold text-base">Liste des produits</h3>
              <p className="font-small text-gray-600 text-sm">
                Voir / rechercher des produits
              </p>
            </div>

            <div className="flex justify-center items-center space-x-2 mr-4">
              <Link href="/products/create">
                <button className="flex items-center bg-gray-200 hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:text-white">
                  <AiOutlinePlus className="mr-2" />
                  Ajouter produit
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

              <div className="flex items-center">
                <div className="font-medium text-sm">Rechercher par :</div>
                <div className="flex ml-2">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilter === "code"}
                      onChange={() => handleCheckboxChange("code")}
                    />
                    <span className="ml-2">Code</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilter === "category"}
                      onChange={() => handleCheckboxChange("category")}
                    />
                    <span className="ml-2">Catégorie</span>
                  </label>
                </div>
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
              <div className="overflow-x-auto">
                <table className="w-[100rem] mt-4 ">
                  <thead className="bg-gray-100">
                    <tr className="text-sm">
                      <th className="py-2 px-4">Produits</th>
                      <th className="py-2 px-4">Catégorie</th>
                      <th className="py-2 px-4">Quantité</th>
                      <th className="py-2 px-4">Stock min</th>
                      <th className="py-2 px-4">Stock max</th>
                      <th className="py-2 px-4">Code</th>
                      <th className="py-2 px-4">Prix de vente</th>
                      <th className="py-2 px-4">Prix d'achat</th>
                      <th className="py-2 px-4">Créé en</th>
                      <th className="py-2 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 px-4">
                          Aucun élément trouvé
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr
                          className="hover:bg-gray-300 text-center"
                          key={product.id}
                        >
                          <td className="py-4 px-4 text-center">
                            {product.name}
                          </td>
                          <td className="py-4 px-4">
                            {product.category_id && product.category
                              ? product.category.name
                              : "-"}
                          </td>

                          <td className="py-4 px-4">{product.quantity}</td>
                          <td className="py-4 px-4">{product.stock_min}</td>
                          <td className="py-4 px-4">{product.stock_max}</td>
                          <td className="py-4 px-4">{product.code}</td>
                          <td className="py-4 px-4">{product.price_sell}</td>
                          <td className="py-4 px-4">{product.price_buy}</td>
                          <td className="py-4 px-4">
                            {moment(product.created_at).format("MMMM YYYY")}
                          </td>
                          <td className="py-4 px-4 space-x-4">
                            <button
                              className="cursor-pointer"
                              onClick={() => handleDelete(product.id)}
                            >
                              <IoTrashBin className="text-red-500 text-xl" />
                            </button>
                            <Link href={`/categories/edit/${product.id}`}>
                              <button className="cursor-pointer">
                                <AiFillEdit className="text-blue-500 text-xl cursor-pointer" />
                              </button>
                            </Link>
                            <Link href="/categories/details">
                              <button className="cursor-pointer">
                                <AiOutlineInfoCircle className="text-green-500 text-xl cursor-pointer" />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}

                    {products.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-4 px-4 text-center">
                          Aucun produit
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 10 && (
              <div className="flex justify-between items-center mt-4">
                <div>{`Total produits : ${totalPages}`}</div>
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
        title="Supprimer le produit"
        text="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />
    </>
  );
};

export default Products;
