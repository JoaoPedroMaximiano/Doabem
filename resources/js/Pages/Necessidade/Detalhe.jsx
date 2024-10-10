import Layout from "@/Components/Layout";
import ProgressBar from "@/Components/ProgressBar";
import { Head, usePage } from "@inertiajs/react";
import { PencilSimple, Handshake, MapPinArea } from "@phosphor-icons/react";
import FloatButton from "@/Components/FloatButton";

export default function Detalhe() {
    let { auth } = usePage().props
    let { necessidade } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;
    const handleLinkClick = () => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',17z?entry=ttu', '_blank');
    };

    return <Layout>
        <Head>
            <title>{necessidade.nome}</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-x1">{necessidade.nome}</h1>
                <a href="/" className="underline text-[#06B6D4] w-100">
                    <p className="text-sm">voltar</p>
                </a>
            </div>
            <img src={necessidade.imagem == null ? "/storage/blank.svg" : necessidade.imagem} />
            <div className="flex flex-row items-center gap-2.5">
                <Handshake size={32} />
                <h1 className="text-lg">{entidade.razao_social}</h1>
            </div>
            <div className="flex flex-row items-center gap-2.5" onClick={handleLinkClick}>
                <MapPinArea size={32} className="text-[#06B6D4]"/>
                <h1 className="text-lg underline text-[#06B6D4]">Localização</h1>
            </div>
            <ProgressBar qtd_necessaria={necessidade.qtd_necessaria} qtd_falta={necessidade.qtd_doacoes}/>
            <p>{necessidade.descricao}</p>
            {auth?.user?.id && entidade?.id_usuario && auth.user.id === entidade.id_usuario && (
                <FloatButton 
                    onClick={() => router.visit('/necessidades/editar/' + localDoacao.id)} 
                    icone={<PencilSimple size={32} />} 
                />
            )}
        </div>
            
    </Layout>
}