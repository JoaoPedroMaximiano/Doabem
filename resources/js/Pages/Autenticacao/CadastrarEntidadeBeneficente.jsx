import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { Head, router } from "@inertiajs/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function CadastrarEntidadeBeneficente(){
    let [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    let [dados, setDados] = useState({});

    function cadastrar() {
        axios.post('/entidade-beneficente/cadastrar/salvar', dados)
        .then(() => {
            router.visit('/login');
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

    return <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between">
        <Head>
            <title>Cadastrar</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <h1 className="font-bold text-x1">Criar nova conta</h1>
            <a href="/doador/cadastrar" className="underline text-[#06B6D4] w-100">
                <p className="text-sm">Sou um doador</p>
            </a>
            <label>
                <p>Login</p>
                <Input placeholder="Digite seu login" name="login" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, login: value }))}/>
            </label>

            <label>
                <p>E-mail</p>
                <Input placeholder="Digite seu e-mail" name="email" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, email: value }))}/>
            </label>

            <label>
                <p>Celular</p>
                <Input placeholder="Digite seu celular" name="celular" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, celular: value }))}/>
            </label>

            <label>
                <p>Razão social</p>
                <Input placeholder="Digite sua razão social" name="razaoSocial" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, razaoSocial: value }))}/>
            </label>

            <label>
                <p>Nome fantasia</p>
                <Input placeholder="Digite seu nome fantasia" name="nomeFantasia" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, nomeFantasia: value }))}/>
            </label>

            <label>
                <p>CNPJ</p>
                <Input mask="99.999.999/9999-99" placeholder="Digite seu CNPJ" name="cnpj" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, cnpj: value }))}/>
            </label>

            <label>
                <p>Senha</p>
                <div className="relative">
                    <Input inputType={ isPasswordVisible ? "text" : "password"} placeholder="Digite sua senha" className="!pr-10"  onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, senha: value }))} />
                    <Eye size={32} onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={"absolute top-1.5 right-2 " + (isPasswordVisible ? "hidden" : "block")} />
                    <EyeSlash size={32} onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={"absolute top-1.5 right-2 " + (!isPasswordVisible ? "hidden" : "block")} />
                </div>
            </label>

            <label>
                <p>Confirmar senha</p>
                <div className="relative">
                    <Input inputType={ isConfirmPasswordVisible ? "text" : "password"} placeholder="Confirmar senha" className="!pr-10" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, senha_confirmation: value }))}/>
                    <Eye size={32} onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className={"absolute top-1.5 right-2 " + (isConfirmPasswordVisible ? "hidden" : "block")} />
                    <EyeSlash size={32} onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className={"absolute top-1.5 right-2 " + (!isConfirmPasswordVisible ? "hidden" : "block")} />
                </div>
            </label>
        </div>
        <div className="flex flex-col gap-2.5">
            <Button texto="Registrar conta" onClick={cadastrar}/>
            <Button texto="Cancelar" onClick={() => router.visit('/login')} btnType="secondary"/>
        </div>
    </div>
}
