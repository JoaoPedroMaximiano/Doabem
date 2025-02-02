import Input from "@/Components/Input";
import Layout from "@/Components/Layout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import Card from "./Components/Card";
import { Basket, HouseLine, MapPinArea } from "@phosphor-icons/react";

export default function Listagem() {
    let {listagem} = usePage().props;
    console.log(listagem);
    let { auth } = usePage().props;
    let [tipo, setTipo] = useState("Necessidades");
    let [lista, setLista] = useState(listagem);
    let [pesquisa, setPesquisa] = useState("");
    let [userLocation, setUserLocation] = useState(null);
    /* Distância máxima para exibir um item em quilômetros */
    let distanciaMaxima = 20;

    useEffect(() => {
        if (window.location.href.includes("/listagem#necessidades")) {
            setTipo("Necessidades");
            setLista(listagem);
            setPesquisa("");
        } else if (window.location.href.includes("/listagem#eventos")) {
            setTipo("Eventos");
            setLista(listagem);
            setPesquisa("");
        } else if (window.location.href.includes("/listagem#locais")) {
            setTipo("Locais");
            setLista(listagem);
            setPesquisa("");
        }
    }, []);

    let mapTipo = {
        "Necessidades": "Necessidades",
        "Eventos": "Eventos beneficentes",
        "Locais": "Locais de doação",
    };

    let returnTipo = (tipo, valor) => {
        if(tipo == valor) return "border-b border-[#06B6D4] text-[#06B6D4]";
    }

    let formatKm = (km) => {
        return Number.parseFloat(km).toFixed(1).split('.').join(',');
    }

    let handleType = tipo => {
        setTipo(tipo);
        setLista(listagem);
        setPesquisa("");
    }

    let calculateDistance = (lat1, lon1, lat2, lon2) => {
        let toRad = (value) => (value * Math.PI) / 180;
        let R = 6371;
        let dLat = toRad(lat2 - lat1);
        let dLon = toRad(lon2 - lon1);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        setLista(prevLista => ({
            ...prevLista,
            [tipo]: listagem[tipo].filter(item => item.nome.toLowerCase().includes(pesquisa.toLowerCase())),
        }));
    }, [pesquisa, tipo]);

    useEffect(() => {
        if ("geolocation" in navigator && auth.nivel_acesso != 'entidade') {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (userLocation) {
            let { latitude, longitude } = userLocation;

            let updatedList = { ...lista };
            updatedList[tipo] = listagem[tipo]
                .map(item => ({
                    ...item,
                    distancia: formatKm(calculateDistance(latitude, longitude, item.latitude, item.longitude))
                }))
                .filter(item => calculateDistance(latitude, longitude, item.latitude, item.longitude) <= distanciaMaxima);
            setLista(updatedList);
        }
    }, [userLocation, tipo, listagem]);

    return <Layout titulo={tipo}>
        <div className="flex md:flex-row justify-around md:justify-start cursor-pointer gap-5 mb-5 border-b border-[#C2C2C2]">
            <div className="flex flex-col items-center">
                <a href="#necessidades" id="necessidades" className={returnTipo(tipo, "Necessidades")} onClick={() => handleType("Necessidades")}>
                    <div className="flex flex-col items-center">
                        <Basket size={28} />
                        <span>Necessidades</span>
                    </div>
                </a>
            </div>
            <div className="flex flex-col items-center">
                <a href="#eventos" id="eventos" className={returnTipo(tipo, "Eventos")} onClick={() => handleType("Eventos")}>
                    <div className="flex flex-col items-center">
                        <HouseLine size={28} />
                        <span>Eventos</span>
                    </div>
                </a>
            </div>
            <div className="flex flex-col items-center">
                <a href="#locais" id="locais" className={returnTipo(tipo, "Locais")} onClick={() => handleType("Locais")}>
                    <div className="flex flex-col items-center">
                        <MapPinArea size={28} />
                        <span>Locais</span>
                    </div>
                </a>
            </div>
        </div>

        <h1>{mapTipo[tipo]}</h1>

        <Input value={pesquisa} onChange={e => setPesquisa(e.target.value)} className="my-5" placeholder={"Buscar "+mapTipo[tipo].toLowerCase()} name="s" />

        {
            lista[tipo].length == 0 &&
            <p>Nenhum registro encontrado.</p>
        }
        {
            lista[tipo].length > 0 &&
            <div className="gap-2 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {lista[tipo].map((item, i) => {
                    return <Card card={item} tipo={tipo.toLowerCase()} key={i} />
                })}
            </div>
        }
    </Layout>
}
