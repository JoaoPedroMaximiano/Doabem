import Button from "@/Components/Button";
import Input from "@/Components/Input";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

export default function CadastrarEntidadeBeneficente(){
    let [isPasswordVisible, setIsPasswordVisible] = useState(false);
    let [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    return <div className="container mx-auto p-4 min-h-screen flex flex-col justify-between">
        <head>
            <title>Cadastrar</title>
        </head>
        <div className="flex flex-col gap-2.5">
        
            <h1 className="font-bold text-x1">Criar nova conta</h1>
            <label>
                <p>Login</p>
                <Input placeholder="Digite seu login" name="login"/>
            </label>

            <label>
                <p>E-mail</p>
                <Input placeholder="Digite seu e-mail" name="email"/>
            </label>

            <label>
                <p>Celular</p>
                <Input placeholder="Digite seu celular" name="celular"/>
            </label>

            <label>
                <p>Razão social</p>
                <Input placeholder="Digite sua razão social" name="celular"/>
            </label>

            <label>
                <p>Nome fantasia</p>
                <Input placeholder="Digite seu nome fantasia" name="celular"/>
            </label>

            <label>
                <p>CNPJ</p>
                <Input placeholder="Digite seu CNPJ" name="celular"/>
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
                    <Input inputType={ isConfirmPasswordVisible ? "text" : "password"} placeholder="Confirmar senha" className="!pr-10" />
                    <Eye size={32} onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className={"absolute top-1.5 right-2 " + (isConfirmPasswordVisible ? "hidden" : "block")} />   
                    <EyeSlash size={32} onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className={"absolute top-1.5 right-2 " + (!isConfirmPasswordVisible ? "hidden" : "block")} />   
                </div>
            </label>
        
        </div>
        <div className="flex flex-col gap-2.5">
            <Button texto="Registrar conta" onClick={() => {}}/>
            <Button texto="Cancelar" onClick={() => {}} btnType="secondary"/>   
        </div>

    </div>
}