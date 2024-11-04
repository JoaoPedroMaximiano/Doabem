import Layout from "@/Components/Layout";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { router, usePage } from "@inertiajs/react";
import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Radio from "@/Components/Radio";
import Select from "@/Components/Select";

export default function Cadastro() {
    let { necessidades, eventos, locais } = usePage().props;
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

    let [tipoDoacao, setTipoDoacao] = useState('necessidade');

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
                    <Radio texto="Necessidade" name="tipo-doacao" value="necessidade" onChange={() => setTipoDoacao('necessidade')} checked={tipoDoacao=="necessidade"} />
                    <Radio texto="Evento beneficente" name="tipo-doacao" value="evento" onChange={() => setTipoDoacao('evento')} checked={tipoDoacao=="evento"} />
                    <Radio texto="Local de doação" name="tipo-doacao" value="local" onChange={() => setTipoDoacao('local')} checked={tipoDoacao=="local"} />

                    {
                        tipoDoacao == 'necessidade' &&
                        <Select options={necessidades} />
                    }
                    {
                        tipoDoacao == 'evento' &&
                        <Select options={eventos} />
                    }
                    {
                        tipoDoacao == 'local' &&
                        <Select options={locais} />
                    }
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