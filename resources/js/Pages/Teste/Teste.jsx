import Layout from "@/Components/Layout";
import { usePage } from "@inertiajs/react";

export default function Teste() {
    let {nome} = usePage().props;

    return <Layout titulo={"Teste"}>
        <h1>{nome}</h1>
    </Layout>
}