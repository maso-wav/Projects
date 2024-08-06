import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/footer";
import { useState } from "react";
import {getCampanha, doar} from "../services/Web3Service";

export default function Donate(){

    const[campanha, setCampanha] = useState({});
    const[donation, setDonation] = useState(0);
    const[message, setMessage] = useState("");

    function onChangeId(evt) {
        campanha.id = evt.target.value;
    }

    function btnSaveClick(){
        setMessage("Buscando, aguarde...");
        getCampanha(campanha.id)
            .then(result => {
                setMessage("");
                result.id = campanha.id;
                setCampanha(result);
            })
            .catch(err => setMessage(err.message));
    }

    function onChangeValue(evt){
        setDonation(evt.target.value);
    }

    function btnDonateClick(){
        setMessage("Doando, aguarde...");
        doar(campanha.id, donation)
            .then(tx => setMessage(`Doação realizada, obrigado! Em alguns instantes o saldo será atualizado`) )
            .catch(err => setMessage(err.message));
    }

    return (
        <>
            <Head>
                <title>Doe Crypto | Fazer Doação</title>
                <meta charSet= 'utf-8'/>
                <meta name="description" content="Doe fundos para um jovem negro" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Doe Crypto</h1>
                    {
                        !campanha.id
                        ? (
                            <>
                                <p className="mb-5">
                                    Qual é o ID da campanha que procura?
                                </p>
                                <div className="col-3">
                                    <div className="input-group mb-3">
                                       <input type="number" id="campanhaId" className="formcontrol" onChange={onChangeId} value={campanha.id}/>
                                       <input type="button" value="Buscar" className="btn btn-primary p-3" onClick={btnSaveClick}/> 
                                    </div>
                                </div>
                            </>
                        )
                        : (
                            <>
                                <p>Verifique se esta é a campanha certa antes de finalizar a sua doação</p>
                                <hr />
                                <div className="row flex-lg-row-reverse align-items-center g-5">
                                    <div className="col-7">
                                        {
                                            campanha.videoUrl
                                                ? <iframe width="100%" height="480" src={campanha.videoUrl}></iframe>
                                                : <img src={campanha.imageUrl} className="d-bloc mx-lg-auto img-fluid" width="640" height="480" />
                                        }
                                    </div>
                                    <div className="col-5 mb-5" style={{height: 480, scrollbars: true}}>
                                        <h2>{campanha.titulo}</h2>
                                        <p><strong>Autor:</strong>{campanha.autor}</p> 
                                        <p className="mb-3">{campanha.descricao}</p>
                                        {
                                            campanha.videoUrl
                                            ? <p>Assista ao vídeo ao lado para entender mais sobre nossa campanha.</p>
                                            : <></>
                                        }
                                        <p className="mb-3 fst-italic mt-5">    
                                            E aí, o que achou do projeto? Já foi arrecadado {campanha.balanco} BNB nesta campanha. O quanto você quer doar?
                                        </p>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <input type="number" id="donation" className="formcontrol" onChange={onChangeValue} value={donation}/>
                                                <span className="input-group-text">BNB</span>
                                                <input type="button" value="Doar" className="btn btn-primary p-3 w-25" onClick={btnDonateClick}/> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                <Footer />
            </div>
        </>
        
    )
}