import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { Head, router } from "@inertiajs/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login(){
    let [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let [dados, setDados] = useState({});

    function login() {
        axios.post('/login', dados)
        .then(() => {
            router.visit('/');
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
                    title: 'Autenticação',
                    text: 'CPF/CNPJ ou Senha Incorretos',
                    icon: 'error',
                });
            }
        });
    }

    return <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between ">
        <Head>
            <title>Login</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <h1 className="font-bold text-xl">Entrar</h1>
            <label>
                <p>CPF ou CNPJ</p>
                <Input placeholder={"Digite o CPF ou CNPJ"} name="CPF" onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, cpf: value }))} />
            </label>
            <label>
                <p>Senha</p>
                <div className="relative">
                    <Input inputType={ isPasswordVisible ? "text" : "password"} placeholder="Digite sua senha" className="!pr-10"  onChange={({ target: { value } }) => setDados(prevDados => ({ ...prevDados, senha: value }))} />
                    <Eye size={32} onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={"absolute top-1.5 right-2 " + (isPasswordVisible ? "hidden" : "block")} />
                    <EyeSlash size={32} onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={"absolute top-1.5 right-2 " + (!isPasswordVisible ? "hidden" : "block")} />
                </div>
            </label>

            <a href="/" className="underline text-[#06B6D4] w-100">
                <p className="text-sm text-right">Voltar a tela inicial</p>
            </a>
        </div>
        <div className="flex flex-col gap-2.5">
            <Button texto="Entrar" onClick={login}/>
            <Button texto="Registrar" onClick={() => router.visit('/doador/cadastrar')} btnType="secondary" />
        </div>
    </div>
}
