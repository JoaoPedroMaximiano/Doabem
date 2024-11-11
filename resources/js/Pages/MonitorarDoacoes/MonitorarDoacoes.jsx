import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function MonitorarDoacoes() {
    let [arrayDonations, setArrayDonations] = useState([]); 

    let handleEnter = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
        }
    }

    return <Layout titulo="Monitorar doações">
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1>Monitorar doações</h1>
                <Link href="/" className="underline text-[#06B6D4]">Voltar</Link>
            </div>

            <Input placeholder={"Digite o CPF para buscar doações"} mask={"999.999.999-99"} name="CPF" onKeyDown={handleEnter} />
            
            <div className="flex flex-col gap-2.5">

            </div>
        </div>
    </Layout>
}