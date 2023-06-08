import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

const DetailsCategories = () => {
    return (  <>
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
              {/* <form className=" space-x-4 " onSubmit={handleFormSubmit}>
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
                        options={options}
                        placeholder="Choisir une catégorie"
                      />
                    </InputWithLabel>
                  </div>
                </div>
  
                <button className="flex items-center bg-gray-200 hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 rounded focus:outline-none hover:text-white">
                  Add Category
                </button>
              </form> */}
            </div>
          </div>
        </div>
        <div>
          <Toaster />
        </div>
      </> );
}
 
export default DetailsCategories;