import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Insert = () => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    nome: '',
    senha: '',
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
  // Inserting a new user into the Database.
  const submitUser = async(event) => {
    try {
      event.preventDefault();
      event.persist();
     
      axios.post(`http://192.168.0.103/smart-home/Apicrud/addusers.php`, { 
        username: userInfo.nome,
        usersenha: userInfo.senha,
      })
      .then(res => {
        console.log(res.data);
        navigate(`/`);
        return;
       })
    } catch (error) { throw error;}    
  };

return (
  <form className="insertForm" onSubmit={submitUser}>
    <h2> Add Form </h2>
    <label htmlFor="_nome">Nome</label>
    <input
      type="text"
      id="_nome"
      name="nome"
      onChange={onChangeValue}
      placeholder="Enter name"
      autoComplete="off"
      required
    />
    <br /> <br />
    <label htmlFor="_senha">Senha</label>
    <input
      type="password"
      id="_senha"
      name="senha"
      onChange={onChangeValue}
      placeholder="Enter password"
      autoComplete="off"
      required
    />
    <br /> <br />
    <input type="submit" value="Insert" />
  </form>
);
};

export default Insert;