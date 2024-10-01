import React, { useState, useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Label from './Label';
import Input from './Input';
import axios from 'axios';

export default function Map() {
    let [cep, setCep] = useState('');
    let [endereco, setEndereco] = useState('');
    let [latitude, setLatitude] = useState(null);
    let [longitude, setLongitude] = useState(null);
    let mapRef = useRef(null);

    let handleCepChange = (event) => {
        setCep(event.target.value);
    };

    useEffect(() => {
        let cepRegex = /^\d{5}-\d{3}$/;
        if (cepRegex.test(cep)) {
            axios.get(`https://www.cepaberto.com/api/v3/cep?cep=${cep.split('-').join('')}`, {
                headers: {'Authorization': 'Token token=ebd84a2d39144564ba4f8cddf0b9d6f6'}
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data.latitude && data.longitude) {
                    setEndereco((data.logradouro ?? 'SN') + ', ' + (data.bairro ?? 'SN') + ', ' + data.cidade.nome + ' - ' + data.estado.sigla);
                    setLatitude(data.latitude);
                    setLongitude(data.longitude);
                } else {
                    setEndereco('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                setEndereco('Erro ao buscar CEP.');
            });
        }
    }, [cep]); 


    useEffect(() => {
        if (latitude && longitude) {
            let map = L.map(mapRef.current).setView([latitude, longitude], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup('Você está aqui')
                .openPopup();
        }
    }, [latitude, longitude]);

    return <>
        <Label texto="CEP">
            <Input value={cep} placeholder="Digite o CEP" onChange={handleCepChange} />
        </Label>

        <p>{endereco}</p>
        <div ref={mapRef} className={"h-[400px]"} />
    </>
}