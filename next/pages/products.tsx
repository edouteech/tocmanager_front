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

interface Session {
  user: User;
  expires: string;
}

interface ProductsPageProps {
  page: number;
}


const ProductsPage: React.FC<ProductsPageProps> = ({page}) => {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [user, setUser] = useState<User>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    value: number;
    label: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [priceSell, setPriceSell] = useState(0);
  const [priceBuy, setPriceBuy] = useState(0);
  const [stockMin, setStockMin] = useState(0);
  const [stockMax, setStockMax] = useState(0);
  const [code, setCode] = useState("");
  const [products, setProducts] = useState<Product[]>([]);


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
          page,
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    }
  };

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSelectChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
    setSelectedOption(selectedOption);
  };

  const fetchProducts = async () => {
    if (user) {
      try {
        const response = await readProducts(
          user.compagnie_id,
          user.accessToken,
          page
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    }
  };

  const handleSaveProduct = async () => {
    const newProduct: Product = {
      name: name,
      quantity: quantity,
      price_sell: priceSell,
      price_buy: priceBuy,
      category_id: selectedOption?.value,
      stock_min: stockMin,
      stock_max: stockMax,
      code: code,
    };
    console.log(newProduct);
    try {
      if (user) {
        const response = await createProduct(
          user.compagnie_id,
          newProduct,
          user?.accessToken
        );
        console.log(response);
        handleCloseModal();
        fetchCategories();
        fetchProducts();
      }
    } catch (error) {
      console.error("Erreur lors de la création du produit :", error);
    }
    console.log(newProduct);
  };

  const submitUpdate = () => {};


  useEffect(() => {
    fetchCategories();
    fetchProducts();
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
                Prix d'achat
              </th>
              <th className="px-4 py-2 bg-gray-200 border-b text-center">
                Prix de vente
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
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 text-center">{product.id}</td>
                <td className="px-4 py-2 text-center">{product.name}</td>
                <td className="px-4 py-2 text-center">{product.price_buy}</td>
                <td className="px-4 py-2 text-center">{product.price_sell}</td>
                <td className="px-4 py-2 border-b text-center ">
                  <FaTrash
                    className="text-red-600 cursor-pointer"
                    onClick={() => ({})}
                  />
                </td>
                <td className="px-4 py-2 border-b text-center ">
                  <FaEdit
                    className="text-blue-700 cursor-pointer"
                    onClick={() => ({})}
                  />
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </td>
              </tr>
            ))}
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
            <h2 className="text-lg font-bold mb-4">Ajouter un produit</h2>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">
                Nom du produit :
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
              <label htmlFor="quantity" className="block mb-2">
                Quantité :
              </label>
              <input
                type="number"
                id="quantity"
                className="border border-gray-300 p-2 rounded w-full"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceSell" className="block mb-2">
                Prix de vente :
              </label>
              <input
                type="number"
                id="priceSell"
                className="border border-gray-300 p-2 rounded w-full"
                value={priceSell}
                onChange={(e) => setPriceSell(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priceBuy" className="block mb-2">
                Prix d'achat :
              </label>
              <input
                type="number"
                id="priceBuy"
                className="border border-gray-300 p-2 rounded w-full"
                value={priceBuy}
                onChange={(e) => setPriceBuy(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block mb-2">
                Sélectionnez une catégorie :
              </label>

              <Select
                className="border p-2 rounded w-full"
                id="category"
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stockMin" className="block mb-2">
                Stock minimum :
              </label>
              <input
                type="number"
                id="stockMin"
                className="border border-gray-300 p-2 rounded w-full"
                value={stockMin}
                onChange={(e) => setStockMin(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stockMax" className="block mb-2">
                Stock maximum :
              </label>
              <input
                type="number"
                id="stockMax"
                className="border border-gray-300 p-2 rounded w-full"
                value={stockMax}
                onChange={(e) => setStockMax(parseInt(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="code" className="block mb-2">
                Code :
              </label>
              <input
                type="text"
                id="code"
                className="border border-gray-300 p-2 rounded w-full"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={isUpdate ? submitUpdate : handleSaveProduct}
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

export default ProductsPage;
