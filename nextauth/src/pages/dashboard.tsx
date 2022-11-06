import { useContext, useEffect } from "react";
import { AuthContext, signOut } from "../contexts/AuthContext";
import { api } from '../lib/apiClient';
import { withSSRAuth } from "../utils/withSSRAuth";

import { SignOut, User } from "phosphor-react";
import { setupAPIClient } from "../lib/api";
import { AuthTokenError } from "../lib/erros/AuthTokenError";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  function logout(){
    signOut()
  }

  useEffect(() => {
    api.get("/me")
    .then((response) => console.log(response))
    .catch(err => console.log(err))
  }, []);
  return (
    <div className="text-white flex flex-col">
      <div className="flex items-center justify-end mt-5">
        <User size={30} />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="">Email: </label>
            {user?.email}
          </div>
          <div>
            <label htmlFor="">Cargo: </label>
            {user?.roles}
          </div>
        </div>
        <span className="px-2 hover:text-gray-200 cursor-pointer">
          <SignOut 
            size={32} 
            onClick={logout}        
          />
        </span>
      </div>
      <h1 className="flex justify-center mt-10">Dashboard</h1>
    </div>
  );
}

//este aqui é o (fn: Function)
export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  try {
    const response = await apiClient.get('/me');
  } catch (err) {
    console.log(err instanceof AuthTokenError);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
})
