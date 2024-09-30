import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import Card from "./Components/Card";

export default function Listagem() {
    let {listagem} = usePage().props;

    let [tipo, setTipo] = useState("Necessidades");
    let [lista, setLista] = useState(listagem);
    let [pesquisa, setPesquisa] = useState("");

    let returnTipo = (tipo, valor) => {
        if(tipo == valor) return "border-b border-[#06B6D4] text-[#06B6D4]";
    }

    let mapTipo = {
        "Necessidades": "Necessidades",
        "Eventos": "Eventos beneficentes",
        "Locais": "Locais de doação",
    };

    let handleType = tipo => {
        setTipo(tipo);
        setLista(listagem);
        setPesquisa("");
    }

    useEffect(() => {
        setLista(prevLista => ({
            ...prevLista,
            [tipo]: listagem[tipo].filter(item => item.nome.toLowerCase().includes(pesquisa.toLowerCase())),
        }));
    }, [pesquisa, tipo]);


    return <Layout titulo={tipo}>
        <div className="flex gap-5 mb-5 border-b border-[#C2C2C2]">
            <p className={returnTipo(tipo, "Necessidades")} onClick={() => handleType("Necessidades")}>Necessidades</p>
            <p className={returnTipo(tipo, "Eventos")} onClick={() => handleType("Eventos")}>Eventos</p>
            <p className={returnTipo(tipo, "Locais")} onClick={() => handleType("Locais")}>Locais</p>
        </div>

        <h1>{mapTipo[tipo]}</h1>

        <Input value={pesquisa} onChange={e => setPesquisa(e.target.value)} className="my-5" placeholder={"Buscar "+mapTipo[tipo].toLowerCase()} name="s" />

        {
            lista[tipo].length == 0 &&
            <p>Nenhum registro encontrado.</p>
        }
        {
            lista[tipo].length > 0 &&
            <div className="gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                {lista[tipo].map((item, i) => {
                    return <Card card={item} tipo={tipo.toLowerCase()} key={i} />
                })}
            </div>
        }
    </Layout>
}