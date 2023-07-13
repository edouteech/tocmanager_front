import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { RxDotsHorizontal } from "react-icons/rx";
import { TbTrash } from "react-icons/tb";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/Models/User";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const checkSession = async () => {
    const session = await getSession();
    if (session) {
      setUser(session.user as User);
    } else {
      router.replace("/auth/login");
    }
  };

  useEffect(() => {
    checkSession();
  }, [router]);

  
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="w-full h-screen pt-[30rem] bg-indigo-600">
        <div className="relative justify-between flex items-center">
          <div className="relative">
            <h3 className="font-bold text-red-500">Order List</h3>
            <p className="font-small text-white text-sm">
              Transaction id : #65565
            </p>
          </div>

          {/* <div className="flex justify-center items-center space-x-2 mr-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-4">
              <TbTrash className="w-4 h-4 text-red-600" />
            </div>
            <div className="relative">
              <RxDotsHorizontal className="mr-4 text-gray-500 font-bold w-6 h-6" />
            </div>
          </div> */}
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default Dashboard;
