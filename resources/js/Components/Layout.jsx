import { Head, usePage } from "@inertiajs/react";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Layout({titulo, children}) {
    let [isMenuHidden, setIsMenuHidden] = useState(true);

    return <>
        <Head>
            <title>{titulo}</title>
        </Head>

        <div className="relative z-20 w-full bg-[#06B6D4] py-5 px-2.5">
            <div className="container mx-auto flex justify-between items-center px-4">
                <a href="/" className="text-3xl text-white ">Logo</a>
                <div className="cursor-pointer" onClick={() => setIsMenuHidden(!isMenuHidden)}>
                    {
                        isMenuHidden ?
                        <List size={32} color="#ffffff" /> :
                        <X size={32} color="#ffffff" />
                    }
                </div>
            </div>
        </div>

        <div className="relative">
            <div className="container mx-auto p-4 min-h-screen xl:min-h-[869px]">
                {children}
            </div>

            <div className={"absolute z-10 top-0 left-0 bg-[#00000025] w-full h-full "+(isMenuHidden ? ' hidden' : '')} onClick={() => setIsMenuHidden(!isMenuHidden)}></div>
            <div className={"absolute z-30 top-0 right-0 xl:right-44 bg-[#06B6D4] flex flex-col text-right px-5 p-5 rounded-bl-md md:rounded-b-md w-6/7 md:w-fit" + (isMenuHidden ? ' hidden' : '')}>
                <div className="flex flex-col divide-y-2">
                    <Menu />
                </div>
            </div>
        </div>
    </>
}

function Menu() {
    let {auth} = usePage().props;

    let listaMenu = [
        {nome: "Monitorar doações", caminho: "/monitorar-doacoes"},
    ];

    if (!auth?.user){
        listaMenu.push({nome: "Entrar", caminho: "/login"});
        listaMenu.push({nome: "Criar nova conta", caminho: "/doador/cadastrar"});
    }

    if (auth?.user?.nivel_acesso == 'entidade') {
        listaMenu.push({nome: "Cadastrar doação", caminho: "/doacao/cadastrar"});
        listaMenu.push({nome: "Cadastrar necessidade", caminho: "/necessidade/cadastrar"});
        listaMenu.push({nome: "Cadastrar evento beneficente", caminho: "/evento/cadastrar"});
        listaMenu.push({nome: "Cadastrar local de doação", caminho: "/local/cadastrar"});
        listaMenu.push({nome: "Relatório de doações", caminho: "/relatorio-doacoes"});
    }

    if (auth?.user){
        listaMenu.push({nome: "Gerenciar conta", caminho: "/gerenciar-conta"});
        listaMenu.push({nome: "Sair", caminho: "/logout"});
    }

    return listaMenu.map((item, i) => {
        return <a href={item.caminho} key={i} className="text-white text-xl py-2">{item.nome}</a>
    });
}
