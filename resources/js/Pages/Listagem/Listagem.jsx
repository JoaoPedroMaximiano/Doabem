import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { usePage } from "@inertiajs/react";
import { useState } from 'react';
import Card from "./Components/Card";

export default function Listagem() {
    let {listagem} = usePage().props;

    let [tipo, setTipo] = useState("Necessidades");

    let returnTipo = (tipo, valor) => {
        if(tipo == valor) return "border-b border-[#06B6D4] text-[#06B6D4]";
    }

    let mapTipo = {
        "Necessidades": "Necessidades",
        "Eventos": "Eventos beneficentes",
        "Locais": "Locais de doação",
    };

    return <Layout titulo={tipo}>
        <div className="flex gap-5 mb-5 border-b border-[#C2C2C2]">
            <p className={returnTipo(tipo, "Necessidades")} onClick={() => setTipo("Necessidades")}>Necessidades</p>
            <p className={returnTipo(tipo, "Eventos")} onClick={() => setTipo("Eventos")}>Eventos</p>
            <p className={returnTipo(tipo, "Locais")} onClick={() => setTipo("Locais")}>Locais</p>
        </div>

        <h1>{mapTipo[tipo]}</h1>

        <form className="my-5">
            <Input placeholder={"Pesquisar "+mapTipo[tipo].toLowerCase()} name="s" />
        </form>

        {
            listagem[tipo].length == 0 &&
            <p>Nenhum registro encontrado.</p>
        }
        {
            listagem[tipo].length > 0 &&
            <div className="gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                {listagem[tipo].map((item, i) => {
                    return <Card card={item} tipo={tipo.toLowerCase()} key={i} />
                })}
            </div>
        }
    </Layout>
}