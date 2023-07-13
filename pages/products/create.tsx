import InputWithLabel from "@/components/InputWithLabel";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { BsCloudUpload, BsX } from "react-icons/bs";
import { Category } from "@/Models/Category";
import axios from "axios";
import Router from "next/router";
import { useSession } from "next-auth/react";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateProducts: React.FC = () => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/login");
  }, [status]);

  if (status === "authenticated") {
    const [nameError, setNameError] = useState(""); // State for name error
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); // State for storing categories
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
        const token = data.user?.original.access_token;
        const companyId = data.user?.original.user.compagnies[0].id;
        // Make GET request to fetch categories
        const response = await axios.get(
          `${apiBaseUrl}/categories?is_paginated=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              compagnie_id: companyId,
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const options = categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

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
        const token = data.user?.original.access_token;
        const companyId = data.user?.original.user.compagnies[0].id;
        // Send a POST request to add a new category
        const response = await axios.post(
          `${apiBaseUrl}/products`,
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
            compagnie_id: companyId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200 && response.data.status === "success") {
          console.log(response.data.data);
          // Display success toast notification
          toast.success("Produit ajoutée avec succès !", {
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
          Router.push("/products");
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
        console.error("Failed to add products:", error);
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

    const handleSelectChange = (selectedOption: any) => {
      const categoryId = selectedOption.value === 0 ? "" : selectedOption.value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        category_id: categoryId,
      }));
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
                <h3 className="font-bold text-xl">Ajouter des produits</h3>
                <p className="font-small text-gray-600 text-sm pt-1">
                  Ajouter de nouveaux produits
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
                  Ajouter produit
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
  }
};

export default CreateProducts;
