import { Link } from "@inertiajs/react";

export default function Card({card, tipo}) {
    return <Link className={"flex flex-col gap-1.5 p-2.5 h-fit rounded-lg w-full min-h-[250px] " + (card.status == 'ativo' ? "bg-white" : "bg-red-100")} href={`/${tipo}/${card.id}`}>
        <img src={card.imagem == null ? "/storage/blank.svg" : card.imagem} alt={"Imagem de "+card.nome} className="w-full max-h-[180px]" />
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-5">
                <h3 className="truncate">{card.nome}</h3>
                <h3 className="whitespace-nowrap">{card?.distancia ? card.distancia + " km" : ""}</h3>
            </div>
            <h3 className="self-end text-[#06B6D4] underline">Ver detalhes</h3>
        </div>
    </Link>
}
