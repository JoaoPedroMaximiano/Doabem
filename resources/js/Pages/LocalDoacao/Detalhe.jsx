import FloatButton from "@/Components/FloatButton";
import Layout from "@/Components/Layout";
import Modal from "@/Components/Modal";
import ModalInformacoesEntidade from "@/Components/ModalInformacoesEntidade";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Handshake, MapPinArea, PencilSimple } from "@phosphor-icons/react";
import { useState } from "react";

export default function Detalhe() {
    let { auth } = usePage().props
    let { localDoacao } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;
    let [isModalEntidadeDescriptionOpen, setIsModalEntidadeDescriptionOpen] = useState(false);

    const handleLinkClick = () => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',17z?entry=ttu', '_blank');
    };
    return <Layout>
        <Modal isOpen={isModalEntidadeDescriptionOpen} onClose={() => setIsModalEntidadeDescriptionOpen(false)}>
            <ModalInformacoesEntidade dados={entidade}></ModalInformacoesEntidade>
        </Modal>

        <Head>
            <title>{localDoacao.nome}</title>
        </Head>
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-between gap-1">
                <h1 className="font-bold text-x1">{localDoacao.nome}</h1>
                <Link href="/listagem#locais" className="underline text-[#06B6D4]">Voltar</Link>
            </div>
            <div className="flex flex-wrap gap-10">
                <img className="w-full h-auto md:max-w-[600px] md:max-h-[600px] object-contain self-start" src={localDoacao.imagem == null ? "/storage/blank.svg" : localDoacao.imagem} />
                <div className="w-full md:w-auto min-w-[300px] md:max-w-[800px] gap-5 flex flex-col">
                    <div onClick={() => setIsModalEntidadeDescriptionOpen(true)} className="flex flex-row items-center gap-2.5 cursor-pointer">
                        <Handshake className="text-[#06B6D4]" size={32} />
                        <h1 className="text-lg text-[#06B6D4]">{entidade.nome_fantasia}</h1>
                    </div>
                    <div className="flex flex-row items-center gap-2.5 cursor-pointer" onClick={handleLinkClick}>
                        <MapPinArea size={32} className="text-[#06B6D4]"/>
                        <h1 className="text-lg underline text-[#06B6D4]">Localização</h1>
                    </div>
                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: localDoacao.descricao.replace(/\n/g, "<br>")}}/>
                </div>
            </div>
            {auth?.user?.id && entidade?.id_usuario && auth.user.id === entidade.id_usuario && (
                <FloatButton
                    onClick={()=> router.visit('/locais/editar/'+localDoacao.id)}
                    icone={<PencilSimple size={32} />}/>
            )}
        </div>

    </Layout>
}
