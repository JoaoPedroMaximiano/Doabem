import Layout from "@/Components/Layout";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { router } from "@inertiajs/react";
import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Cadastro() {
    let [dados, setDados] = useState({
        cpf: '',
        descricao: '',
        qtd: ''
    });

    let handleChange = (e) => {
        let { name, value } = e.target;
        setDados(prevDados => ({
            ...prevDados,
            [name]: value
        }));
    };

    let handleSalvar = () => {
        axios.post('/doacao/cadastrar/salvar', dados)
        .then(() => {
            Swal.fire({
                title: 'Sucesso',
                icon: "success",
                html: `<ul>Cadastro realizado com sucesso</ul>`,
            });
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                let errors = error.response.data.errors;
                let errorMessages = '';
                Object.keys(errors).forEach((field) => {
                    errors[field].forEach((message) => {
                        errorMessages += `<li>${message}</li>`;
                    });
                });
                Swal.fire({
                    title: 'Erros de Validação',
                    icon: 'error',
                    html: `<ul>${errorMessages}</ul>`,
                });
            } else {
                Swal.fire({
                    title: 'Erro inesperado',
                    text: 'Ocorreu um erro, tente novamente mais tarde.',
                    icon: 'error',
                });
            }
        });
    }

    return <Layout titulo="Cadastro de doação">
        <div className="flex flex-col gap-5">
            <h1>Cadastro de doação</h1>

            <div className="flex flex-col gap-5">
                <div className="flex items-end gap-2.5">
                    <Label texto="CPF" className="w-full">
                        <Input mask="999.999.999-99" placeholder="Digite o CPF do doador" name="cpf" value={dados.cpf} onChange={handleChange} />
                    </Label>

                    <PlusCircle className="cursor-pointer" size={42} />
                </div>

                <div className="flex flex-col gap-2.5">
                    <p>Tipo de doação</p>
                    <label className="flex gap-2.5 items-center">
                        <input type="radio" name="tipoDoacao" value="necessidade" />
                        <p>Necessidade</p>
                    </label>
                    <label className="flex gap-2.5 items-center">
                        <input type="radio" name="tipoDoacao" value="evento" />
                        <p>Evento beneficente</p>
                    </label>
                    <label className="flex gap-2.5 items-center">
                        <input type="radio" name="tipoDoacao" value="local" />
                        <p>Local de doação</p>
                    </label>

                    <select>
                        <option>oi</option>
                        <option>teste</option>
                    </select>
                </div>


                <Label texto="Descrição">
                    <Input placeholder="Digite a descrição da doação" name="descricao" value={dados.descricao} onChange={handleChange} />
                </Label>
                <Label texto="Quantidade">
                    <Input inputType="number" placeholder="Digite a quantidade de itens doados" name="qtd" value={dados.qtd} onChange={handleChange} />
                </Label>
            </div>

            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar" onClick={ handleSalvar } />
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')} />
            </div>
        </div>
    </Layout>
}