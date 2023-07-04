import { Category } from "@/Models/Category";
import InputWithLabel from "@/components/InputWithLabel";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { useRouter } from "next/router";

const CreateCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // State for storing categories
  const [formData, setFormData] = useState({ name: "", parent_id: "" }); // State for form data
  const [nameError, setNameError] = useState(""); // State for name error
  const router = useRouter(); // Next.js router instance

  /**
   * Function to fetch categories from the API
   */
  const fetchCategories = async () => {
    try {
      const token = "1|f3btxksdJymp8jGLqsdp7BnLuLoLReHJkYElZXzj";
      // Make GET request to fetch categories
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories?is_paginated=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            compagnie_id: 1,
          },
        }
      );
      // Update categories state with the fetched data
      setCategories(response.data.data);
    } catch (error) {
      // Log an error message if fetching categories fails
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * Update the form data by creating a new object with existing values and the updated value
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * Submit
   */
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if the name field is empty
    if (formData.name.trim() === "") {
      setNameError("Ce champ est obligatoire.");
      return;
    }
    try {
      const token = "1|f3btxksdJymp8jGLqsdp7BnLuLoLReHJkYElZXzj";

      // Send a POST request to add a new category
      const response = await axios.post(
        "http://127.0.0.1:8000/api/categories",
        {
          name: formData.name,
          parent_id: formData.parent_id,
          compagnie_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status === "success") {
        // Display success toast notification
        toast.success("Categorie ajoutée avec succès !", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });

        // Reset the form data and navigate to the categories page
        setFormData({ name: "", parent_id: "" });
        router.push("/categories");
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
      console.error("Failed to add category:", error);
    }
  };

  const options = categories
    .filter((category) => category.parent_id === null)
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  const handleSelectChange = (selectedOption: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      parent_id: selectedOption.value,
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
              <h3 className="font-bold text-xl">Product Add Category</h3>
              <p className="font-small text-gray-600 text-sm pt-1">
                View/Search product Category
              </p>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg mt-4 p-8 border-[1px] black">
            <form className=" space-x-4 " onSubmit={handleFormSubmit}>
              <div className="flex w-full space-x-4 mb-4 items-center">
                <div className="w-1/2">
                  <InputWithLabel label="Nom de la catégorie">
                    <input
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      id="name"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                    {nameError && (
                      <p className="text-red-500 pt-1">{nameError}</p>
                    )}
                  </InputWithLabel>
                </div>

                <div className="w-1/2">
                  <InputWithLabel label="Catégorie parente">
                    <Select
                      onChange={handleSelectChange}
                      className="w-full border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                      id="parent_id"
                      defaultValue={{
                        label: "Choisir une catégorie",
                        value: 0,
                      }}
                      options={[
                        { value: 0, label: "Sans catégorie" },
                        ...options,
                      ]}
                      placeholder="Choisir une catégorie"
                    />
                  </InputWithLabel>
                </div>
              </div>

              <button className="flex items-center bg-gray-200 hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:text-white">
                Add Category
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

export default CreateCategories;
