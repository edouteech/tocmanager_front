import InputWithLabel from "@/components/InputWithLabel";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Select from "react-select";

const CreateProducts = () => {
  const [nameError, setNameError] = useState(""); // State for name error

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // // Check if the name field is empty
    // if (formData.name.trim() === "") {
    //   setNameError("Ce champ est obligatoire.");
    //   return;
    // }
    // try {
    //   const token = "183|iHHcwWaBKUayYDJ428KvhtuvhtvhBwep7hQH4J0N";

    //   // Send a POST request to add a new category
    //   const response = await axios.post(
    //     "http://127.0.0.1:8000/api/categories",
    //     {
    //       name: formData.name,
    //       parent_id: formData.parent_id,
    //       compagnie_id: 1,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   if (response.status === 200 && response.data.status === "success") {
    //     // Display success toast notification
    //     toast.success("Categorie ajoutée avec succès !", {
    //       style: {
    //         borderRadius: "10px",
    //         background: "#333",
    //         color: "#fff",
    //       },
    //       duration: 2000,
    //     });

    //     // Reset the form data and navigate to the categories page
    //     setFormData({ name: "", parent_id: "" });
    //     router.push("/categories");
    //   } else {
    //     // Display error toast notification
    //     toast.error(response.data.message, {
    //       style: {
    //         borderRadius: "10px",
    //         background: "#333",
    //         color: "#fff",
    //       },
    //       duration: 2000,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Failed to add category:", error);
    // }
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
            <form className=" space-x-4 justify-center" onSubmit={handleFormSubmit}>
              <div className="flex justify-center space-x-4">
                <div className="w-1/4">
                  <InputWithLabel label="Nom du produit">
                    <input
                      //   value={formData.name}
                      //   onChange={handleInputChange}
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

                <div className="w-1/4">
                  <InputWithLabel label="Catégorie">
                    <Select
                      //   onChange={handleSelectChange}
                      className="w-full border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                      id="category_id"
                      defaultValue={{
                        label: "Choisir une catégorie",
                        value: 0,
                      }}
                      options={[
                        { value: 0, label: "Sans catégorie" },
                        // ...options,
                      ]}
                      placeholder="Choisir une catégorie"
                    />
                  </InputWithLabel>
                </div>
                <div className="w-1/4">
                  <InputWithLabel label="Quantité">
                    <input
                      //   value={formData.name}
                      //   onChange={handleInputChange}
                      type="number"
                      id="name"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Code">
                    <input
                      //   value={formData.name}
                      //   onChange={handleInputChange}
                      type="text"
                      id="code"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="w-1/4">
                  <InputWithLabel label="Nom du produit">
                    <input
                      //   value={formData.name}
                      //   onChange={handleInputChange}
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

                <div className="w-1/4">
                  <InputWithLabel label="Catégorie">
                    <Select
                      //   onChange={handleSelectChange}
                      className="w-full border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500"
                      id="category_id"
                      defaultValue={{
                        label: "Choisir une catégorie",
                        value: 0,
                      }}
                      options={[
                        { value: 0, label: "Sans catégorie" },
                        // ...options,
                      ]}
                      placeholder="Choisir une catégorie"
                    />
                  </InputWithLabel>
                </div>
                <div className="w-1/4">
                  <InputWithLabel label="Quantité">
                    <input
                      //   value={formData.name}
                      //   onChange={handleInputChange}
                      type="number"
                      id="name"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
                    />
                  </InputWithLabel>
                </div>

                <div className="w-1/4">
                  <InputWithLabel label="Code">
                    <input
                      //   value={formData.name}
                      //   onChange={handleInputChange}
                      type="text"
                      id="code"
                      className={`w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 ${
                        nameError ? "border-red-500" : ""
                      }`}
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

export default CreateProducts;
