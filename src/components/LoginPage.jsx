import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export const LoginPage = () => {

  const {
    register, 
    formState: {
      errors, isValid
    },
    handleSubmit
  } = useForm({
    mode:"onBlur"
  });

const navigate = useNavigate();

const [error, setError] = useState(null);

const onSubmit=(data)=> {
  sendLoginRequest();
}

  const sendLoginRequest = () => {
    const login = document.querySelector('#login');
    const password = document.querySelector('#password');    

    const headers = { 
      'Content-Type': 'application/json'
    };

    axios.post("http://localhost:8085/module2/auth/signIn", {
      login: login.value,
      password: password.value,
      }, {headers})
      .then(response  => {
        if(response.status === 200){
          console.log(response)
          localStorage.setItem('login', response.data.login)
          localStorage.setItem('token',response.data.token)
          navigate("/certificates")
        }
      })
      .catch(error  => {
        setError(error)
      });
  };


  return (
    <div id='form' className="col-8 col-md-4  mx-auto">
    <h3 id="form__head" className="mb-4">Registration Form</h3>
    <form id="newform" onSubmit={handleSubmit(onSubmit)} noValidate>      
        <div className="form-group p-1">
            <label htmlFor="login"> Login </label>
            <input type="text" className="form-control" id="login" {...register('login', {
              required: "Login cannot be empty!",
              minLength: {
                value:3,
                message:"Minimum login length is 3"
              },
              maxLength: {
                value:30,
                message:"Maximum login length is 30"
              },
            })}/>
          </div>
        <div className="errorMSG">{errors?.login && <p>
          {errors?.login?.message || "Error!"}</p>}</div>
        <div className="form-group p-1">
            <label htmlFor="password"> Password </label>
            <input type="password" className="form-control" id="password" {...register('password', {
              required: "Password cannot be empty!",
              minLength: {
                value:3,
                message:"Minimum password length is 3"
              },
              maxLength: {
                value:30,
                message:"Maximum password length is 30"
              },
            })}/>
          </div>
        <div className="errorMSG">{errors?.password && 
        <p>{errors?.password?.message || "Error!"}</p>}</div>
        <button type="submit" className=" mt-4 d-block w-100 btn btn-primary" disabled={!isValid}>Submit</button>
        <div className="errorMSG">{error}</div>
      </form>    
</div>
  );
};

