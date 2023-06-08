import "@/styles/globals.css";
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

interface SellsPageProps {
  page: number;
}

interface FormRow {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
}

const SellsPage: React.FC<SellsPageProps> = ({ page }) => {
  const router = useRouter();
  const [session, setSession] = useState({});
  const [user, setUser] = useState<User>();
  const [formRows, setFormRows] = useState<FormRow[]>([]);

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

  const handleAddRow = () => {
    const newFormRow: FormRow = {
      field1: "",
      field2: "",
      field3: "",
      field4: "",
    };
    setFormRows([...formRows, newFormRow]);
    console.log(newFormRow);
  };

  const handleChange = (index: number, field: keyof FormRow, value: string) => {
    const updatedFormRows = [...formRows];
    updatedFormRows[index][field] = value;
    setFormRows(updatedFormRows);
  };
  const handlePrintFormRows = () => {
    console.log(formRows);
  };

  return (
    <SessionProvider>
      <div>{user && <NavBar userName={user.name} />}</div>
      <h1 className="text-center items-center flex justify-center mt-6 text-2xl font-bold">
        Ajouter une vente
      </h1>

      <div className="my-4 mx-4 justify-end ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddRow}
        >
          Ajouter
        </button>
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePrintFormRows}
      >
        Afficher dans la console
      </button>

      {formRows.map((formRow, index) => (
        <div key={index} className="form-row">
          <input
            className="border border-gray-300 p-2 rounded m-6"
            type="text"
            value={formRow.field1}
            onChange={(e) => handleChange(index, "field1", e.target.value)}
          />
          <input
            className="border border-gray-300 p-2 rounded m-6"
            type="text"
            value={formRow.field2}
            onChange={(e) => handleChange(index, "field2", e.target.value)}
          />
          <input
            className="border border-gray-300 p-2 rounded m-6"
            type="text"
            value={formRow.field3}
            onChange={(e) => handleChange(index, "field3", e.target.value)}
          />
          <input
            className="border border-gray-300 p-2 rounded m-6   "
            type="text"
            value={formRow.field4}
            onChange={(e) => handleChange(index, "field4", e.target.value)}
          />
        </div>
      ))}
    </SessionProvider>
  );
};

export default SellsPage;
