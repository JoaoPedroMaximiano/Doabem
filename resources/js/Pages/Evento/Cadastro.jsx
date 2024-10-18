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

export default function Cadastro() {
    let { evento } = usePage().props;
    let { local } = usePage().props;

    let initialData = {
        id: '',
        nome: '',
        descricao: '',
        dataInicio: '',
        dataFim: '',
        imagem: null,
        link: '',
        cep: '',
        latitude: '',
        longitude: '',
        cidade: '',
        estado: '',
        uf: '',
    };

    if (evento && local) {
        initialData = {
            id: evento.id || '',
            nome: evento.nome || '',
            descricao: evento.descricao || '',
            dataInicio: evento.data_inicio ? evento.data_inicio.slice(0, 10) : '',
            dataFim: evento.data_fim ? evento.data_fim.slice(0, 10) : '',
            cep: local.cep || '',
            latitude: local.latitude || '',
            longitude: local.longitude || '',
            imagem: evento.imagem,
            cidade: '',
            estado: '',
            uf: '',
        };
    }

    let [dados, setDados] = useState(initialData);
    let [imagemPreview, setImagemPreview] = useState(initialData.imagem);

    let handleSalvar = () => {
        let formData = new FormData();

        Object.keys(dados).forEach(key => {
            formData.append(key, dados[key]);
        });

        axios.post('/evento/cadastrar/salvar', formData, {
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

        formData.append('_method', 'PUT');

        axios.post('/eventos/editar/salvar', formData, {
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

    return <Layout titulo="Cadastrar evento beneficente">
        <div className="flex flex-col gap-5">
            {dados.id === '' ? <h1>Cadastrar evento beneficente</h1> : <h1>Gerenciar evento beneficente</h1>}

            <div className="flex flex-col gap-2.5">
                <Label texto="Nome da evento">
                    <Input placeholder="Digite o nome da evento" value={dados.nome} onChange={e => setDados(p => ({...p, nome: e.target.value}))} />
                </Label>

                <Label texto="Descrição">
                    <TextArea placeholder="Digite a descricação" value={dados.descricao} onChange={e => setDados(p => ({...p, descricao: e.target.value}))} />
                </Label>

                <Label text="Data inicio">
                    <input type="date"
                        value={dados.dataInicio}
                        onChange={e => setDados(p => ({...p, dataInicio: e.target.value}))}
                    />
                </Label>

                <Label text="Data final">
                    <input type="date"
                        value={dados.dataFim}
                        onChange={e => setDados(p => ({...p, dataFim: e.target.value}))}
                    />
                </Label>

                {
                    imagemPreview &&
                    <img src={imagemPreview} alt="Imagem do evento beneficente" />
                }
                <Label texto={"Imagem"}>
                    <Input
                        inputType="file"
                        onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                                setDados(p => ({...p, imagem: file}));
                                setImagemPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </Label>

                <Map setDados={setDados} dados={dados} />
            </div>

            <div className="flex flex-col gap-2.5">
                <Button texto="Salvar" onClick={ dados.id === '' ? handleSalvar : handleAlterar} />
                <Button texto="Cancelar" btnType="secondary" onClick={() => router.visit('/')} />
            </div>
        </div>
    </Layout>
}
