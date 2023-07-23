import React, { createContext, useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import MessageContext from "./MessageContext";
import env from "react-dotenv";
import { contractAddress, contractAbi } from "./Constant";
window.Buffer = window.Buffer || require("buffer").Buffer; //for buffer defined

//interact with ipfs and infura
const projectId = env.INFURA_ID;
const projectSecret = env.INFURA_SECRET_KEY;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const connectWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

const FetchDataContext = createContext();

export const FetchDataContextProvider = (props) => {
  //context
  const { setMessage } = useContext(MessageContext);

  //hooks
  const [currentAccount, setCurrentAccount] = useState("");
  //candidate section
  const pushCandidate = []; //single candidate data
  const [candidateArray, setCandidateArray] = useState(pushCandidate); //loop all candidates data
  const [candidateLength, setCandidateLength] = useState("");
  //voter section
  const pushVoter = []; //single voter data
  const [voterArray, setVoterArray] = useState(pushVoter); //loop all voter data
  const [voterLength, setVoterLength] = useState("");

  //organizer address
  const [organizerAddress, setOrganizerAddress] = useState("");

  //connection metamask
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum)
      return setMessage({ type: "error", message: "Please Install MetaMask" });
    const account = await window.ethereum.request({ method: "eth_accounts" });
    if (account.length) {
      setCurrentAccount(account[0]);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum)
      return setMessage({ type: "error", message: "Please Install Message" });
    const account = await window.ethereum.request({
      methos: "eth_requestAccounts",
    });
    setCurrentAccount(account[0]);
  };

  //upload to ipfs for voter
  const uploadToIPFSVoter = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setMessage({ type: "error", message: "Error uploading to ipfs" });
    }
  };

  //create voter
  const createVoter = async (formInput, fileUrl, navigate, setLoader) => {
    try {
      setLoader(true);
      const { name, address, position } = formInput;
      if (!name || !address || !position)
        return setMessage({ type: "error", message: "Input data is missing." });
      //connection smart contract
      const contract = await connectWithContract();
      const data = JSON.stringify({ name, address, position, image: fileUrl }); //convert to json
      const added = await client.add(data); //upload ipfs that all data
      const url = `https://ipfs.io/ipfs/${added.path}`; //set ipfs gateway with url
      const voter = await contract.voterRight(address, name, fileUrl, url); //write in smart contract
      await voter.wait();
      setLoader(false);
      navigate("/voterList");
      setMessage({
        type: "success",
        message: "Successfully created for voter! 🥳",
      });
    } catch (error) {
      setLoader(false);
      setMessage({
        type: "error",
        message: "Can't create properly! Try again. 🥵",
      });
    }
  };

  //get voter data
  const getAllVoterData = async () => {
    try {
      const contract = await connectWithContract();
      //get voter addresses data
      const allVoter = await contract.getVoterList();
      //get every single voter data
      allVoter.map(async (el) => {
        const singleVoterData = await contract.getVoterdata(el);
        pushVoter.push(singleVoterData);
        setVoterArray(pushVoter);
      });
      //get voter length
      const voterListData = await contract.getVoterLength();
      setVoterLength(voterListData);
    } catch (error) {
      console.log("Something went wrong fetching data!");
    }
  };

  //upload to ipfs for voter
  const uploadToIPFSCandidate = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      return url;
    } catch (error) {
      setMessage({ type: "error", message: "Error uploading to ipfs" });
    }
  };

  //create candidate
  const createCandidate = async (formInput, fileUrl, navigate, setLoader) => {
    try {
      setLoader(true);
      const { name, address, age } = formInput;
      if (!name || !address || !age)
        return setMessage({
          type: "error",
          message: "Input data is missing.",
        });
      //connection smart contract
      const contract = await connectWithContract();
      const data = JSON.stringify({
        address,
        age,
        name,
        image: fileUrl,
      }); //convert to json
      const added = await client.add(data); //upload ipfs that all data
      const url = `https://ipfs.io/ipfs/${added.path}`; //set ipfs gateway with url
      const candidate = await contract.setCandidate(
        address,
        age,
        name,
        fileUrl,
        url
      ); //write in smart contract
      await candidate.wait();
      setLoader(false);
      navigate("/");
      setMessage({
        type: "success",
        message: "Successfully created for candidate! 🥳",
      });
    } catch (error) {
      setLoader(false);
      setMessage({
        type: "error",
        message: "Can't create properly! Try again. 🥵",
      });
    }
  };

  //get candidate data
  const getAllCandidateData = async () => {
    try {
      const contract = await connectWithContract();
      //all candidate data
      const allCandidate = await contract.getCandidate();
      allCandidate.map(async (el) => {
        const singleCandidateData = await contract.getCandidatedata(el);
        pushCandidate.push(singleCandidateData);
        setCandidateArray(pushCandidate);
      });
      //get candidate length
      const candidateListData = await contract.getCandidateLength();
      setCandidateLength(candidateListData);
      //get organizeraddress
      const organizerAdd = await contract.votingOrganizer();
      setOrganizerAddress(organizerAdd);
    } catch (error) {
      console.log("Something went wrong fetching data!");
    }
  };

  //give vote
  const giveVote = async (d, setLoader) => {
    try {
      setLoader(d.id);
      const contract = await connectWithContract();
      const candidateAddress = d.address;
      const candidateId = d.id;
      const votegiving = await contract.vote(candidateAddress, candidateId);
      await votegiving.wait();
      setLoader("");
      setMessage({
        type: "success",
        message: "Congration! You already voted 🥳",
      });
    } catch (error) {
      setLoader("");
      setMessage({
        type: "error",
        message: "You can't vote properly rn! Try again. 🥵 ",
      });
    }
  };

  useEffect(() => {
    getAllVoterData();
    getAllCandidateData();
  }, []);

  return (
    <FetchDataContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFSVoter,
        currentAccount,
        createVoter,
        voterArray,
        voterLength,
        uploadToIPFSCandidate,
        createCandidate,
        candidateArray,
        candidateLength,
        giveVote,
        organizerAddress,
      }}
    >
      {props.children}
    </FetchDataContext.Provider>
  );
};

export default FetchDataContext;
