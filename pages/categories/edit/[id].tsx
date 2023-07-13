import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "@/Models/Category";
import InputWithLabel from "@/components/InputWithLabel";
import Select from "react-select";
import { getSession } from "next-auth/react";
import { User } from "@/Models/User";

interface EditCategoriesProps {
  id: number;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const EditCategories: React.FC<EditCategoriesProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    parent_id: "",
  });
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User>();
  const checkSession = async () => {
    const session = await getSession();
    if (session) {
      setUser(session.user as User);
    }
  };

  const fetchCategory = async () => {
    try {
      const token = "1|f3btxksdJymp8jGLqsdp7BnLuLoLReHJkYElZXzj";
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories/${id}`,
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
        const { name, parent_id } = response.data.data[0];
        setFormData({ name, parent_id });
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = user?.access_token;
      const response = await axios.get(
        `${apiBaseUrl}/categories?is_paginated=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            compagnie_id: user?.compagnies[0].id,
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    checkSession();
    fetchCategory();
    fetchCategories();
  }, []);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
  const selectedOption = options.find(
    (option) => option.value === parseInt(formData.parent_id)
  );
  const selectedLabel = selectedOption ? selectedOption.label : "";

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      setNameError("Ce champ  est obligatoire.");
      return;
    }

    try {
      const token = user?.access_token;
      const response = await axios.put(
        `${apiBaseUrl}/categories/${id}`,
        {
          name: formData.name,
          parent_id: formData.parent_id,
          compagnie_id: user?.compagnies[0].id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data.status == "success") {
        toast.success("Categorie modifiée avec succès !", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });
        setFormData({ name: "", parent_id: "" });
        router.push("/categories");
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
      console.error("Failed to update category:", error);
    }
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
              <h3 className="font-bold text-xl">Update Category</h3>
              <p className="font-small text-gray-600 text-sm pt-1">
                Update my category
              </p>
            </div>
          </div>

          <div className="w-full bg-white rounded-lg mt-4 p-8 border-[1px] black">
            {isLoading ? (
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : (
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
                        value={{
                          value: formData.parent_id,
                          label: selectedLabel,
                        }}
                        defaultValue={{
                          label: "Choisir une catégorie",
                          value: 0,
                        }}
                        onChange={handleSelectChange}
                        className="w-full border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                        id="parent_id"
                        options={[
                          { value: 0, label: "Sans catégorie" },
                          ...options,
                        ]}
                        placeholder="Choisir une catégorie"
                        noOptionsMessage={() => "Aucune catégorie"}
                      />
                    </InputWithLabel>
                  </div>
                </div>

                <button className="flex items-center bg-gray-200 hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:text-white">
                  Update category
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default EditCategories;
