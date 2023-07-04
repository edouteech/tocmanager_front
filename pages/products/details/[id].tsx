import { Product } from "@/Models/Product";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";

interface DetailsProductProps {
  id: number;
}

const ProductDetails: React.FC<DetailsProductProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const token = "1|f3btxksdJymp8jGLqsdp7BnLuLoLReHJkYElZXzj";
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            compagnie_id: 1,
          },
        }
      );
      if (response.status === 200 && response.data.status == "success") {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex px-4">
        <div className="w-1/5">
          <Sidebar />
        </div>

        <div className="w-4/5 h-screen pt-[5rem] ">
          <div className="relative justify-between flex items-center">
            <div className="relative">
              <h3 className="font-bold text-xl">Détails Categories</h3>
              <p className="font-small text-gray-600 text-sm pt-1">
                Détails de la catégorie
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <div className="w-full bg-white rounded-lg mt-4 p-4 border-[1px] black ">
                <div className="relative justify-between flex items-center">
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
                    <table className="w-full mt-4">
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
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
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
                          </tr>
                        ))}

                        {products.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-4 px-4 text-center">
                              Aucun Détails disponible
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:ml-4">
              <div className="w-full bg-white rounded-lg mt-4 p-4 border-[1px] black ">
                <div className="relative">
                  <p className="font-small text-gray-600 text-sm pt-1">
                    Historique des entrées et des sorties
                  </p>
                </div>

                {isLoading ? (
                  <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full mt-4">
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
                        </tr>
                      </thead>
                      <tbody>
                        {/* {products.map((product) => (
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
                          </tr>
                        ))}

                        {products.length === 0 && (
                          <tr>
                            <td colSpan={4} className="py-4 px-4 text-center">
                              Aucun Détails disponible
                            </td>
                          </tr>
                        )} */}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
