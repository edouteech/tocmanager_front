import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "@/Models/Category";
import InputWithLabel from "@/components/InputWithLabel";
import Select from "react-select";
import { Product } from "@/Models/Product";
import { BsCloudUpload, BsX } from "react-icons/bs";
import { User } from "@/Models/User";
import { getSession } from "next-auth/react";


interface EditProductProps {
  id: number;
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const EditProduct: React.FC<EditProductProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nameError, setNameError] = useState(""); // State for name error
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const checkSession = async () => {
    const session = await getSession();
    if (session) {
      setUser(session.user as User);
    }
  };

  const [formData, setFormData] = useState<{
    name: string;
    category_id: string;
    quantity: number;
    code: string;
    price_buy: number;
    price_sell: number;
    stock_max: number;
    stock_min: number;
    image: File | null; // Mettre à jour le type de 'image' pour accepter 'File' ou 'null'
  }>({
    name: "",
    category_id: "",
    quantity: 1,
    code: "",
    price_buy: 0,
    price_sell: 0,
    stock_max: 0,
    stock_min: 0,
    image: null, // Initialiser 'image' à 'null'
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  /**
   * Function to fetch categories from the API
   */
  const fetchCategories = async () => {
    try {
      const token = "1|f3btxksdJymp8jGLqsdp7BnLuLoLReHJkYElZXzj";
      // Make GET request to fetch categories
      const response = await axios.get(
        `${apiBaseUrl}/categories?is_paginated=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            compagnie_id: 1,
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  /**
   * Function to fetch product from the API
   */
  const fetchProduct = async () => {
    try {
      const token = "1|f3btxksdJymp8jGLqsdp7BnLuLoLReHJkYElZXzj";
      const response = await axios.get(
        `${apiBaseUrl}/products/${id}`,
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
        const {
          name,
          category_id,
          quantity,
          code,
          price_buy,
          price_sell,
          stock_max,
          stock_min,
          image,
        } = response.data.data[0];
        setFormData({
          name,
          category_id,
          quantity,
          code,
          price_buy,
          price_sell,
          stock_max,
          stock_min,
          image,
        });
        setSelectedImage(`${apiBaseUrl}/${image}`);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
    fetchCategories();
    fetchProduct();
    
  }, []);

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSelectChange = (selectedOption: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category_id: selectedOption.value,
    }));
  };

  const selectedOption = options.find(
    (option) => option.value === parseInt(formData.category_id)
  );

  const selectedLabel = selectedOption ? selectedOption.label : "";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file as File,
      }));
    }
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: null,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (formData.name.trim() === "") {
      setNameError("Ce champ est obligatoire.");
      return;
    }
    try {
      const token = user?.access_token;

      // Send a POST request to add a new category
      const response = await axios.put(
        `${apiBaseUrl}/products/${id}`,
        {
          name: formData.name,
          category_id: formData.category_id,
          quantity: formData.quantity,
          code: formData.code,
          price_buy: formData.price_buy,
          price_sell: formData.price_sell,
          stock_max: formData.stock_max,
          stock_min: formData.stock_min,
          image: formData.image,
          compagnie_id: user?.compagnies[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.status );
      if (response.status === 200 && response.data.status === "success") {
        console.log(response.data.data);
        // Display success toast notification
        toast.success("Produit modifié avec succès !", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });

        // Reset the form data and navigate to the categories page
        setFormData({
          name: "",
          category_id: "",
          quantity: 1,
          code: "",
          price_buy: 0,
          price_sell: 0,
          stock_max: 0,
          stock_min: 0,
          image: null,
        });
        setSelectedImage(null);
        router.push("/products");
      } else {
        // Display error toast notification
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
      console.error("Failed to update products:", error);
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "2.5rem",
      border: "1px solid #E5E7EB",
      borderRadius: "0.375rem",
      backgroundColor: "white",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #CBD5E0",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#5A67D8" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "#5A67D8" : "#F3F4F6",
      },
    }),
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

        <div className="w-4/5 h-screen pt-[5rem] ">
          <div className="relative justify-between flex items-center">
            <div className="relative">
              <h3 className="font-bold text-xl">Modifier des produits</h3>
              <p className="font-small text-gray-600 text-sm pt-1">
                Modifier le produit
              </p>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg mt-4 p-8 border-[1px] black">
            <form
              className=" justify-center space-y-4 "
              onSubmit={handleFormSubmit}
            >
              <div className="flex justify-center space-x-4 ">
                <div className="w-1/4">
                  <InputWithLabel label="Nom du produit">
                    <input
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      id="name"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                    {nameError && (
                      <p className="text-red-500 pt-1">{nameError}</p>
                    )}
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Catégorie">
                    <Select
                      onChange={handleSelectChange}
                      className={`w-full`}
                      id="category_id"
                      value={{
                        value: formData.category_id,
                        label: selectedLabel,
                      }}
                      defaultValue={{
                        label: "Choisir une catégorie",
                        value: 0,
                      }}
                      options={[
                        { value: 0, label: "Sans catégorie" },
                        ...options,
                      ]}
                      placeholder="Choisir une catégorie"
                      styles={customStyles}
                      noOptionsMessage={() => "Aucune catégorie"}
                    />
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Quantité">
                    <input
                      value={formData.quantity}
                      onChange={handleInputChange}
                      type="number"
                      id="quantity"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Code">
                    <input
                      value={formData.code}
                      onChange={handleInputChange}
                      type="text"
                      id="code"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                  {nameError && (
                    <p className="text-red-500 pt-1">{nameError}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="w-1/4">
                  <InputWithLabel label="Prix d'achat">
                    <input
                      value={formData.price_buy}
                      onChange={handleInputChange}
                      type="number"
                      id="price_buy"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                    {nameError && (
                      <p className="text-red-500 pt-1">{nameError}</p>
                    )}
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Prix de vente">
                    <input
                      value={formData.price_sell}
                      onChange={handleInputChange}
                      type="number"
                      id="price_sell"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-2 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                    {nameError && (
                      <p className="text-red-500 pt-1">{nameError}</p>
                    )}
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Stock max">
                    <input
                      value={formData.stock_max}
                      onChange={handleInputChange}
                      type="number"
                      id="stock_max"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                  {nameError && (
                    <p className="text-red-500 pt-1">{nameError}</p>
                  )}
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Stock min">
                    <input
                      value={formData.stock_min}
                      onChange={handleInputChange}
                      type="number"
                      id="stock_min"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                  {nameError && (
                    <p className="text-red-500 pt-1">{nameError}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="w-full">
                  {!selectedImage && (
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <BsCloudUpload className="w-14 h-14 text-blue-400" />
                      <span className="ml-2">
                        Glissez et déposez une image ici
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        id="image"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {selectedImage && (
                    <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-center w-full h-full">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="w-32 h-32"
                        />
                      </div>
                      <button
                        className="absolute top-0 right-0 text-red-700 hover:text-red-500 px-2 py-1"
                        onClick={handleCancelImage}
                      >
                        <BsX className="w-8 h-8 font-extrabold" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button className="flex items-center bg-gray-200 hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:text-white mt-4">
                Modifier produit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default EditProduct;
