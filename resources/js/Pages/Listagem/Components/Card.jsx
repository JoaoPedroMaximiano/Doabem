import { Link } from "@inertiajs/react";

export default function Card({card, tipo}) {
    return <Link className="flex flex-col gap-1.5 h-fit bg-white p-2.5 rounded-lg w-full" href={`/${tipo}/${card.id}`}>
        <img src={card.imagem == null ? "/storage/blank.svg" : card.imagem} alt={"Imagem de "+card.nome} className="w-full max-h-[140px]" />
        <div className="flex justify-between">
            <h3>{card.nome}</h3>
            <h3>{card?.distancia ? card.distancia +" km" : ''}</h3>
        </div>
    </Link>
}
