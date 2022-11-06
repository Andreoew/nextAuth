import { GetServerSideProps } from "next";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { parseCookies } from 'nookies'
import { withSSRGuest } from "../utils/withSSRGuest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handlerSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    await signIn(data);
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto flex justify-center items-center text-white">
      <form onSubmit={handlerSubmit} className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-gray-600"
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-gray-600"
        />
        <button type="submit" className="text-xl mt-3 mb-2 border rounded bg-green-800 hover:bg-green-700 cursor-pointer">
          Entrar
        </button>
        <span className="flex gap-1">
          <a className="text-gray-300 text-xs hover:text-gray-100" href="">Não tem cadastro?</a>
          <a className="text-gray-300 text-xs hover:text-gray-100" href="">Esqueceu sua senha?</a>
        </span>
      </form>
    </div>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }

})
