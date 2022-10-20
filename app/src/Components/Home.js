import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Enroll from "../artifacts/contracts/Enroll.sol/Enroll.json";
const Home = () => {
  const [acc, setAcc] = useState(false);
  const [userAcc, setUserAcc] = useState("");
  const [sub, setSub] = useState(1);
  const [sub2, setSub2] = useState(1);
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  console.log(ethers.BigNumber.from("0x2a"));
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    requestAccount();
  }, []);
  const submitEnrollment = async (event) => {
    event.preventDefault();
    await requestAccount();
    if (typeof window.ethereum !== "undefined" && acc === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Enroll.abi, signer);

      // const data = await contract.show(sub);
      const data = await contract.select(userAcc, sub);

      console.log(data);
    }
  };
  const viewEnrollment = async (e) => {
    e.preventDefault();
    await requestAccount();
    console.log(sub);
    console.log(userAcc);

    if (typeof window.ethereum !== "undefined" && acc === true) {
      console.log("asdf");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Enroll.abi, signer);

      // const data = await contract.show(sub);
      console.log(sub, "daf");
      const data = await contract.show(sub);

      console.log(data._hex);
      const a = parseInt(data._hex, 16);
      console.log(a);
    }
  };
  const show = (e) => {
    setSub(e.target.value);
    console.log(sub);
  };
  const show2 = (e) => {
    setSub2(e.target.value);
    console.log(sub2);
  };
  async function requestAccount() {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAcc(accounts[0]);
        setAcc(true);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
  return (
    <div>
      <h1>Enroll here</h1>
      <h1>ID - {userAcc}</h1>
      <form onSubmit={submitEnrollment}>
        <select name="admission" required onChange={show2}>
          <option value="1">BlockChain</option>
          <option value="2">Natural Language Processing</option>
          <option value="3">Machine Vision</option>
          <option value="4">Artificial Intelligence</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <h1>View Enrollment information</h1>
      <form onSubmit={viewEnrollment} onChange={show}>
        <select name="admission1" required>
          <option value="1">BlockChain</option>
          <option value="2">Natural Language Processing</option>
          <option value="3">Machine Vision</option>
          <option value="4">Artificial Intelligence</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <button>Connect metamask</button>
    </div>
  );
};
export default Home;
