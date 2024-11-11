import FloatButton from "@/Components/FloatButton";
import Layout from "@/Components/Layout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Handshake, MapPinArea, PencilSimple } from "@phosphor-icons/react";

export default function Detalhe() {
    let { auth } = usePage().props
    let { localDoacao } = usePage().props;
    let { entidade } = usePage().props;
    let { local } = usePage().props;

    const handleLinkClick = () => {
        window.open('https://www.google.com/maps/@'+local.latitude+","+local.longitude+',17z?entry=ttu', '_blank');
    };
    return <Layout>
        <Head>
            <title>{localDoacao.nome}</title>
        </Head>
        <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold text-x1">{localDoacao.nome}</h1>
                <Link href="/" className="underline text-[#06B6D4] w-100">
                    <p className="text-sm">Voltar</p>
                </Link>
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
            {auth?.user?.id && entidade?.id_usuario && auth.user.id === entidade.id_usuario && (
                <FloatButton 
                    onClick={()=> router.visit('/locais/editar/'+localDoacao.id)} 
                    icone={<PencilSimple size={32} />}/>
            )}
        </div>
            
    </Layout>
}