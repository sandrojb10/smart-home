import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Edituser = (props) => {
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    nome: props.list.nome,
    senha: props.list.senha,
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
      axios.post(`http://192.168.0.103/smart-home/Apicrud/editusers.php`, { 
        username: userInfo.nome,
        usersenha: userInfo.senha,
        userids: props.list.user_id,
      })
      .then(res => {
        console.log(res.data);
        navigate(`/`);
        return;
       })
    } catch (error) { throw error;}    
  };

return (
  <form className="editForm" onSubmit={submitUser}>
    <h2> Edit Form </h2>
    <label htmlFor="_nome">Name</label>
    <input
      type="text"
      id="_nome"
      name="nome"
      value={userInfo.nome}
      onChange={onChangeValue}
      placeholder="Enter nome"
      autoComplete="off"
      required
    />
    <br /> <br />
    <label htmlFor="_senha">Senha</label>
    <input
      type="password"
      id="_senha"
      name="senha"
      value={userInfo.senha}
      onChange={onChangeValue}
      placeholder="Enter password"
      autoComplete="off"
      required
    />
    <br /> <br />
    <input type="submit" value="update" />
  </form>
);
};

export default Edituser;