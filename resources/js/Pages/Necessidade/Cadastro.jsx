import Layout from "@/Components/Layout";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Map from "@/Components/Map";

export default function Cadastro() {
    let [dados, setDados] = useState({
        nome: '',
    });

    let handleSalvar = () => {
        Swal.fire("oi");
    }

    return <Layout titulo="Cadastrar necessidade">
        <div className="flex flex-col gap-5">
            <h1>Cadastrar necessidade</h1>

            <div className="flex flex-col gap-2.5">
                <Label texto="Nome da necessidade">
                    <Input placeholder="Digite o nome da necessidade" value={dados.nome} onChange={e => setDados(p => ({...p, nome: e.target.value}))} />
                </Label>

                <Label texto="Quantidade necessária">
                    <Input placeholder="Digite a quantidade da necessidade" value={dados.qtd} onChange={e => setDados(p => ({...p, qtd: e.target.value}))} />
                </Label>

                <Label texto="Descrição">
                    <TextArea placeholder="Digite a descricação" value={dados.descricao} onChange={e => setDados(p => ({...p, descricao: e.target.value}))} />
                </Label>

                <Label texto="Imagem">
                    <Input inputType="image" value={dados.imagem} onChange={e => setDados(p => ({...p, imagem: e.target.value}))} />
                </Label>

                <Map />
            </div>

            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar" onClick={handleSalvar} />
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')} />
            </div>
        </div>
    </Layout>
}