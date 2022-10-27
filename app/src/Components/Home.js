import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Enroll from "../artifacts/contracts/Enroll.sol/Enroll.json";
const Home = () => {
  const [acc, setAcc] = useState(false);
  const [userAcc, setUserAcc] = useState("");
  const [sub, setSub] = useState(1);
  const [sub2, setSub2] = useState(1);
  const [result, setResult] = useState("");
  const address = "0xF8525e0D72361dA8a9E950568358cB174E1B5Baf";

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
      const data = await contract.select(userAcc, sub2);
      contract.on("entered", function (result) {
        console.log(`Result is ${result}`);
      });
    }
  };
  const viewEnrollment = async (e) => {
    e.preventDefault();
    await requestAccount();

    if (typeof window.ethereum !== "undefined" && acc === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Enroll.abi, signer);

      // const data = await contract.show(sub);

      const data = await contract.show(sub);

      const a = parseInt(data._hex, 16);
      console.log(a);
      setResult(a);
    }
  };
  const show = (e) => {
    setSub(e.target.value);
  };
  const show2 = (e) => {
    setSub2(e.target.value);
  };
  async function requestAccount() {
    if (window.ethereum) {
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
    <div className="d-flex flex-column justify-content-center w-100 h-100">
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
      <h1>{result}</h1>
      <button>Connect metamask</button>
    </div>
  );
};
export default Home;
