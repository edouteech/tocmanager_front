import Navbar from "@/components/Navbar";
import { TbTrash } from "react-icons/tb";
import { RxDotsHorizontal } from "react-icons/rx";
import { BsUpcScan } from "react-icons/bs";
import Item from "@/components/Items";
import { TbCash } from "react-icons/tb";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import Categories from "@/components/Categories";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Test from "@/components/Test";

export default function Home () {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "183|iHHcwWaBKUayYDJ428KvhtuvhtvhBwep7hQH4J0N";
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories",
          {
            headers: headers,
            params: {
              compagnie_id: 1,
            },
          }
        );
        setCategories(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "183|iHHcwWaBKUayYDJ428KvhtuvhtvhBwep7hQH4J0N";
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://127.0.0.1:8000/api/products", {
          headers: headers,
          params: {
            compagnie_id: 1,
          },
        });
        console.log(response.data.data.data);
        setProducts(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleItemTrashClick = () => {};
  const handleClick = (id: number) => {};

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="h-screen overflow-y-auto py-[6rem] px-4 flex space-x-6 ">
        <div className="w-5/6 ">
          <div className="relative mb-4">
            <h3 className="font-bold ">Catégories</h3>
            <p className="font-small text-gray-600 text-sm">
              Manage your purchases
            </p>
          </div>

          <div className="flex justify-end">
            <div className="bg-white rounded-full p-1 mr-2 cursor-pointer">
              <BiLeftArrow className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-full p-1 cursor-pointer">
              <BiRightArrow className="w-4 h-4" />
            </div>
          </div>

          <div className="flex justify-between items-center space-y-2 w-full">
            {categories.slice(0, 8).map((category) => (
              <Categories
                key={category.id}
                title={category.name}
                name={category.name}
                imageUrl="/Images/marteau.jpg"
              />
            ))}
          </div>

          <div className="flex  items-center w-full mt-6">
            {products.slice(0, 8).map((product) => (
              <Card
                quantity={product.quantity}
                category={product.category.name}
                name={product.name}
                price={product.price_sell}
                imageUrl="/Images/mais.jpg"
              />
            ))}
          </div>
        </div>

        <div className="w-2/5">
          <div className="relative justify-between flex items-center">
            <div className="relative">
              <h3 className="font-bold ">Order List</h3>
              <p className="font-small text-gray-600 text-sm">
                Transaction id : #65565
              </p>
            </div>

            <div className="flex justify-center items-center space-x-2 mr-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
                <TbTrash className="w-4 h-4 text-red-600" />
              </div>
              <div className="relative">
                <RxDotsHorizontal className="mr-4 text-gray-500 font-bold w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white w-full  rounded-t-md p-4 my-1">
            <button className="w-full items-center flex justify-center p-2 hover:bg-green-600 text-green-600 hover:text-white rounded-lg border-2 border-green-500 font-extrabold">
              <span className="text-2xl pr-1">+</span>
              Add customer
            </button>
            <div className="mt-4 space-y-2 w-full">
              <select className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:border-gray-300">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>

              <select className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:border-gray-300">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="flex mt-4">
              <div className="ml-auto justify-center text-white font-bold bg-blue-500 w-3/5 rounded-lg p-2 flex items-center">
                <BsUpcScan className="mr-2" />
                <span className="text-sm">Scan barcode</span>
              </div>
            </div>
          </div>

          <div className="bg-white w-full  rounded-b-md p-4">
            <div className="flex justify-between">
              <div className="w-1/3 bg-gray-200 rounded-full justify-center items-center flex text-sm text-indigo-600 font-bold h-6">
                Total items : 4
              </div>
              <div className="2/3 text-red-500 font-sm font-bold">
                Clear all
              </div>
            </div>
            <div className="overflow-auto h-[200px] p-2 mt-2 space-y-2">
              <Item
                imageSrc="/Images/logo.png"
                name="Pineapple"
                code="Pt647787"
                amount="3000"
                onTrashClick={handleItemTrashClick}
              />
              <Item
                imageSrc="/Images/logo.png"
                name="Pineapple"
                code="Pt647787"
                amount="3000"
                onTrashClick={handleItemTrashClick}
              />
              <Item
                imageSrc="/Images/logo.png"
                name="Pineapple"
                code="Pt647787"
                amount="3000"
                onTrashClick={handleItemTrashClick}
              />

              <Item
                imageSrc="/Images/logo.png"
                name="Pineapple"
                code="Pt647787"
                amount="3000"
                onTrashClick={handleItemTrashClick}
              />
            </div>
          </div>

          <div className="bg-white w-full  rounded-b-md p-4 mt-2">
            <div className="flex justify-between">
              <div className="w-1/3 flex text-sm font-bold">Subtotal</div>
              <div className="1/3 flex text-sm  font-bold">55.00$</div>
            </div>
            <div className="flex justify-between m-2">
              <div className="w-1/3 flex text-sm font-bold ">Tax</div>
              <div className="1/3 flex text-sm  font-bold">5.00$</div>
            </div>

            <div className="flex justify-between m-2">
              <div className="w-1/3 flex text-md text-indigo-500 font-bold">
                Total
              </div>
              <div className="1/3 flex text-sm text-indigo-500  font-bold">
                60.00$
              </div>
            </div>

            <div className="flex justify-between m-4 space-x-4">
              <div className="w-1/3 flex">
                <div className="w-full items-center justify-center flex flex-col p-2 border border-solid border-gray-300 rounded-lg hover:border-solid hover:border-indigo-500 hover:text-indigo-400">
                  <TbCash className="w-8 h-8 text-gray-500" />
                  <span className="mt-2 text-sm font-bold">Cash</span>
                </div>
              </div>

              <div className="w-1/3 flex">
                <div className="w-full items-center justify-center flex flex-col p-2 border border-solid border-gray-300 rounded-lg">
                  <TbCash className="w-8 h-8 text-gray-500 hover:text-indigo-400" />
                  <span className="mt-2 text-sm font-bold">Cash</span>
                </div>
              </div>

              <div className="w-1/3 flex">
                <div className="w-full items-center justify-center flex flex-col p-2 border border-solid border-gray-300 rounded-lg">
                  <TbCash className="w-8 h-8 text-gray-500" />
                  <span className="mt-2 text-sm font-bold">Cash</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-blue-500 justify-between flex my-8 p-2 rounded-lg cursor-pointer">
              <p className="text-white text-sm font-bold ">Chekout</p>
              <span className="text-white text-sm font-bold ">60.00$</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
