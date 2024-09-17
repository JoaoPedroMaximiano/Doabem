import { Head } from "@inertiajs/react";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Layout({titulo, children}) {
    let [isMenuHidden, setIsMenuHidden] = useState(true);

    return <div className="relative">
        <Head>
            <title>{titulo}</title>
        </Head>

        <div className="flex justify-between items-center w-full bg-[#06B6D4] py-5 px-2.5">
            <a href="/" className="text-3xl text-white">Logo</a>
            <div className="pointer" onClick={() => setIsMenuHidden(!isMenuHidden)}>
                {
                    isMenuHidden ?
                    <List size={32} color="#ffffff" /> :
                    <X size={32} color="#ffffff" />
                }
            </div>
        </div>

        <div className="py-5 px-4">
            {children}
        </div>

        <div className={"absolute top-[75px] right-0 flex flex-col bg-[#06B6D4] text-right px-5 gap-2 h-screen w-2/3 md:w-1/5 " + (isMenuHidden ? 'hidden' : '')}>
            <Menu />
        </div>
    </div>;
}

function Menu() {
    let listaMenu = [
        {nome: "Monitorar doações", caminho: "/monitorar-doacoes"},
        {nome: "Gerenciar conta", caminho: "/gerenciar-conta"},
        {nome: "Cadastrar doação", caminho: "/cadastrar-doacao"},
        {nome: "Relatório de doações", caminho: "/relatorio-doacoes"},
        {nome: "Entrar", caminho: "/login"},
        {nome: "Criar nova conta", caminho: "/registrar"},
    ];

    return listaMenu.map((item, i) => {
        return <a href={item.caminho} key={i} className="text-white text-xl border-b border-white">{item.nome}</a>
    });
}