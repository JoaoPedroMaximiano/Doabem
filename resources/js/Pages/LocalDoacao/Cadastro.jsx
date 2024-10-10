import Layout from "@/Components/Layout";
import Button from "@/Components/Button";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Map from "@/Components/Map";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Cadastro() {
    let { localDoacao } = usePage().props;
    let { local } = usePage().props;

    let [dados, setDados] = useState({
        id: '',
        nome: '',
        descricao: '',
        imagem: null,
        cep: '',
        latitude: '',
        longitude: '',
        cidade: '',
        estado: '',
        uf: '',
    });

    if (localDoacao && local) {
        setDados({
            id: localDoacao.id || '',
            nome: localDoacao.nome || '',
            descricao: localDoacao.descricao || '',
            cep: local.cep || '',
            latitude: local.latitude || '',
            longitude: local.longitude || '',
            imagem: localDoacao.imagen,
            cidade: '',
            estado: '',
            uf: '',
        });
    }

    let handleSalvar = () => {
        let formData = new FormData();

        Object.keys(dados).forEach(key => {
            formData.append(key, dados[key]);
        });

        axios.post('/local/cadastrar/salvar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
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
                const errors = error.response.data.errors;
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
    
    let handleAlterar = () => {
        let formData = new FormData();
        
        Object.keys(dados).forEach(key => {
            formData.append(key, dados[key]);
        });
        
        axios.put('/locais/editar/salvar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            Swal.fire({
                title: 'Sucesso',
                icon: "success",
                html: `<ul>Alteração realizada com sucesso</ul>`,
            });
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
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

    return <Layout titulo="Cadastrar local doação">
        <div className="flex flex-col gap-5">
            {dados.id === '' ? <h1>Cadastrar local de doação</h1> : <h1>Gerenciar local de doação</h1>}

            <div className="flex flex-col gap-2.5">
                <Label texto="Nome da local">
                    <Input placeholder="Digite o nome do local" value={dados.nome} onChange={e => setDados(p => ({...p, nome: e.target.value}))} />
                </Label>

                <Label texto="Descrição">
                    <TextArea placeholder="Digite a descricação" value={dados.descricao} onChange={e => setDados(p => ({...p, descricao: e.target.value}))} />
                </Label>

                <Label texto="Imagem">
                    <Input
                        inputType="file"
                        value={dados.link}
                        onChange={
                            e => setDados(p => ({
                                ...p,
                                imagem: e.target.files[0],
                                link: e.target.value
                            }))
                        }
                    />
                </Label>

                <Map setDados={setDados} />
            </div>

            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar" onClick={ dados.id === '' ? handleSalvar : handleAlterar} />
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')} />
            </div>
        </div>
    </Layout>
}
