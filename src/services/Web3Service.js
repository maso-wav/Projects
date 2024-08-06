import Web3 from "web3";
import Error from "next/error";
import ABI from "./ABI.json"

const CONTRACT_ADDRESS = "0xfeAE3B3cef725F1B3221591B6453643d405208A2";

export async function doLogin(){

    if(!window.ethereum) throw new Error("O MetaMask não foi encontrado!");
    
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Carteira não encontrada/permitida!");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];
}

function getContract(){
    const web3 = new Web3(window.ethereum);
    const from = localStorage.getItem("wallet");
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export function addCampanha(campanha){
    const contract = getContract();
    return contract.methods.addCampanha(campanha.titulo, campanha.descricao, campanha.videoUrl, campanha.imageUrl, campanha.meta).send();
}

export function getLastCampaignId(){
    const contract = getContract();
    return contract.methods.nextId().call();
}

export function getCampanha(id){
    const contract = getContract();
    return contract.methods.Campanhas(id).call();
}

export function doar(id, donation){
    const contract = getContract();
    return contract.methods.doar(id).send({value: Web3.utils.toWei(donation, "ether")});
}