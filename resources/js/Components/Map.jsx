import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import { usePage } from '@inertiajs/react';

export default function Map({setDados}) {
    let {api} = usePage().props;
    let [cep, setCep] = useState('');
    let [latitude, setLatitude] = useState(null);
    let [longitude, setLongitude] = useState(null);

    let { isLoaded } = useLoadScript({
        googleMapsApiKey: api['google-maps'],
    });

    let handleCepChange = (event) => {
        setCep(event.target.value);
    };

    let handleSearchCEP = () => {
        let cepRegex = /^\d{5}-\d{3}$/;
        if (cepRegex.test(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    setDados(p => ({
                        ...p,
                        cep: cep,
                        cidade: data.localidade,
                        estado: data.estado,
                        uf: data.uf,
                    }));
                    let endereco = data.logradouro + ', ' + data.bairro + ', ' + data.localidade + ' - ' + data.uf;
                    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=${api['google-maps']}`)
                        .then((response) => response.json())
                        .then((geocodeData) => {
                            if (geocodeData.results && geocodeData.results.length > 0) {
                                let location = geocodeData.results[0].geometry.location;
                                setLatitude(location.lat);
                                setLongitude(location.lng);
                                setDados(p => ({
                                    ...p,
                                    latitude: location.lat,
                                    longitude: location.lng,
                                }));
                            }
                        })
                        .catch((error) => {
                            console.error('Erro ao buscar geolocalização:', error);
                        });
                    })
                .catch((error) => {
                    console.error('Erro ao buscar CEP:', error);
                });
        }
    }
    
    return <>
        <Label texto="CEP">
            <Input value={cep} placeholder="Digite o CEP" onChange={handleCepChange} />
        </Label>

        <Button btnType={'tertiary'} texto="Pesquisar CEP" onClick={handleSearchCEP} />

        {isLoaded && latitude !== null && longitude !== null && (
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={{ lat: latitude, lng: longitude }}
                zoom={15}
                defaultOptions={{mapTypeControl: false}}
            >
                <Marker position={{ lat: latitude, lng: longitude }} />
            </GoogleMap>
        )}
    </>;
};