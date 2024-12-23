import Layout from "@/Components/Layout";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { router, usePage } from "@inertiajs/react";
import { PlusCircle, UserCircle } from "@phosphor-icons/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Radio from "@/Components/Radio";
import Select from "@/Components/Select";
import Modal from "@/Components/Modal";
import ModalCadastrarDoador from "./Components/ModalCadastrarDoador";

export default function Cadastro() {
    let { necessidades, eventos, locais } = usePage().props;
    let [dados, setDados] = useState({
        cpf: '',
        descricao: '',
        qtd: ''
    });1

    let [tipoDoacao, setTipoDoacao] = useState('necessidade');
    let [nomeDoador, setNomeDoador] = useState('');
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [selectValue, setSelectValue] = useState('');

    let handleChange = (e) => {
        let { name, value } = e.target;
        setDados(prevDados => ({
            ...prevDados,
            [name]: value
        }));
    };

    let handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    let handleTipoDoacaoChange = (e) => {
        setSelectValue('');
        setTipoDoacao(e.target.value);
    };

    let handleSalvar = () => {
        if (!selectValue) {
            Swal.fire({
                title: 'Dados incorretos',
                text: 'Selecione um tipo de doação!',
                icon: 'warning',
            });
            return;
        }
        axios.post('/doacao/cadastrar/salvar', {
            ...dados,
            tipoDoacao,
            idTipoDoacao: selectValue
        })
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

    let verifyIfDonatorExists = (cpf) => {
        let cpftemp = cpf.replace(/[^\d]/g, '');
        if (cpftemp.length !== 11) {
            setNomeDoador('');
            return;
        }

        axios.post('/doacao/cadastrar/verify-donator', {cpf: cpf})
        .then(response => {
            if (!response.data.exists) {
                Swal.fire({
                    title: 'CPF não encontrado.',
                    icon: "error",
                    html: `<ul>Cadastre um doador!</ul>`,
                });
                return;
            }
            setNomeDoador(response.data.nome);
        })
        .catch(() => {
            Swal.fire({
                title: 'Erro inesperado',
                text: 'Ocorreu um erro, tente novamente mais tarde.',
                icon: 'error',
            });
        });
    }
    return <Layout titulo="Cadastro de doação">
        <div className="flex flex-col gap-5">
            <h1>Cadastro de doação</h1>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalCadastrarDoador />
            </Modal>

            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-end gap-2.5">
                        <Label texto="CPF" className="w-full">
                            <Input mask="999.999.999-99" placeholder="Digite o CPF do doador" name="cpf" value={dados.cpf} onChange={handleChange} onBlur={() => verifyIfDonatorExists(dados.cpf)} />
                        </Label>

                        <PlusCircle className="cursor-pointer" size={42} onClick={() => setIsModalOpen(true)} />
                    </div>
                    <div className={"flex flex-row items-center gap-2.5 " + (nomeDoador != '' ? "visible" : "hidden")}>
                        <UserCircle size={32} />
                        <p>{nomeDoador}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2.5">
                    <p>Tipo de doação</p>
                    <Radio texto="Necessidade" name="tipo-doacao" value="necessidade" onChange={handleTipoDoacaoChange} checked={tipoDoacao=="necessidade"} />
                    <Radio texto="Evento beneficente" name="tipo-doacao" value="evento" onChange={handleTipoDoacaoChange} checked={tipoDoacao=="evento"} />
                    <Radio texto="Local de doação" name="tipo-doacao" value="local" onChange={handleTipoDoacaoChange} checked={tipoDoacao=="local"} />

                    {
                        tipoDoacao == 'necessidade' &&
                        <Select value={selectValue} onChange={handleSelectChange} options={necessidades} />
                    }
                    {
                        tipoDoacao == 'evento' &&
                        <Select value={selectValue} onChange={handleSelectChange} options={eventos} />
                    }
                    {
                        tipoDoacao == 'local' &&
                        <Select value={selectValue} onChange={handleSelectChange} options={locais} />
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
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/listagem')} />
            </div>
        </div>
    </Layout>
}
