import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import {Button, TextField, Snackbar, SnackbarContent} from '@material-ui/core';

function start(user,password,setCorrect){
    if(localStorage.getItem("users")==null) {
        setCorrect(false);
        return ;
    }
    var user = getUser(user,password);
    console.log(user);
    if(user!=null){
        localStorage.setItem("isLogged",true);
        localStorage.setItem("name",user.name);
        localStorage.setItem("email",user.email);
        setCorrect("");
    }else{
        setCorrect(false);
    }
}

function getUser(email,password){
    var users = JSON.parse(localStorage.getItem("users"));
    for(var i=0;i<users.length;i++){
        console.log(users[i]);
        if(users[i].email === email && users[i].password===password){
            return users[i];
        }
    }
    return null;
}
export default function Login(props){
    const [user,setUser] = useState("");
    const [pw,setPW] = useState("");
    const [reg,setReg] = useState(false);
    const [correct,setCorrect] = useState(true);
    React.useEffect(()=>{
        console.log("Effect");
        fetch("https://rocky-sands-24100.herokuapp.com/user")
        .then(response=>response.json()).then((data)=>{
            console.log(data);
            localStorage.setItem("users",JSON.stringify(data));
        }).catch(err=>alert("Error"));
    },[]);
    if(localStorage.getItem("isLogged")){
        return <Redirect to="/planer"></Redirect>;
    }
    if(reg) return <Redirect to="/signup"/>;
    const CloseMenssage = (
        <Button color="secondary" size="small" onClick={()=>setCorrect(true)}><CloseIcon style={{background:'white'}}></CloseIcon></Button>
    );
    return (<div id="login" style={{width:'100%',height:'100hv',background:'orange',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:'600px',height:'380px',background:'white',display:'block',borderRadius:'10px'}}>
            <div style={{textAlign:'center'}}><h1>Iniciar sesion</h1></div>
            <div style={{background:'red',height:'1px'}}></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <TextField label="Correo" value={user} onChange={(e)=>setUser(e.target.value)} style={{width:'90%'}}/></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <TextField type="password" value={pw} label="Contraseña" style={{width:'90%'}} onChange={(e)=>setPW(e.target.value)}/></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <Button style={{border:'1px solid orange'}} onClick={()=>start(user,pw,setCorrect)}>Iniciar sesion</Button></div>
            <div style={{height:'30px'}}></div>
            <div style={{display:'flex',justifyContent:'center'}}><Button style={{border:'1px solid orange'}} onClick={()=>setReg(true)}>Registrarse</Button></div>
            <div style={{height:'30px'}}></div>
            <Snackbar open={!correct}>
                <SnackbarContent style={{background:'red'}} message="Usuario y/o contraseña incorrectos, por favor verifique." action={CloseMenssage}></SnackbarContent>
            </Snackbar>
        </div>
    </div>);
}