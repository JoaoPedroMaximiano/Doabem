import FloatButton from "@/Components/FloatButton";
import Layout from "@/Components/Layout";
import { Head, router, usePage } from "@inertiajs/react";
import { Handshake, MapPinArea, PencilSimple } from "@phosphor-icons/react";

export default function Detalhe() {
    let { localDoacao } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;

    const handleLinkClick = (event) => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',14z?entry=ttu', '_blank');
    };
    return <Layout>
        <Head>
            <title>{localDoacao.nome}</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-x1">{localDoacao.nome}</h1>
                <a href="/" className="underline text-[#06B6D4] w-100">
                    <p className="text-sm">voltar</p>
                </a>
            </div>
            <img src={localDoacao.imagem == null ? "/storage/blank.svg" : localDoacao.imagem} />
            <div className="flex flex-row items-center gap-2.5">
                <Handshake size={32} />
                <h1 className="text-lg">{entidade.razao_social}</h1>
            </div>
            <div className="flex flex-row items-center gap-2.5" onClick={handleLinkClick}>
                <MapPinArea size={32} className="text-[#06B6D4]"/>
                <h1 className="text-lg underline text-[#06B6D4]">Localização</h1>
            </div>
            <p>{localDoacao.descricao}</p>
            <FloatButton onClick={()=> router.visit('/local-doacao/editar/'+localDoacao.id)} icone={<PencilSimple size={32} />}></FloatButton>
        </div>
            
    </Layout>
}