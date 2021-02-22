import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import axios from 'axios'



export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        positions: "",
    });

    const [serverError, setServerError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        positions: "",
    });
    const [order, setOrder] = useState([]);

    const changeValidate = (e) => {
        yup
            .reach(schema, e.target.name)
            .validate(
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        )
            .then((valid) => {
            setErrors({...errors, [e.target.name]: "" });
        })
            .catch((err) => {
                 console.log("err", err);
                 setErrors({...errors, [e.target.name]: err.errors[0] });
        });
    };


    const inputChange = (e) => {
        e.persist();
        const newFormState = {
            ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value};
            changeValidate(e);
            setFormState(newFormState);
        };
    const formSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/", formState)
            .then((response) => {
            setOrder(response.data);
            setServerError(null);
            setFormState({
                name: "",
                positions: ""
            });
        })
        .catch((err) => {
            setServerError("Sorry, Something Happened");
        });
    };

    const schema = yup.object().shape({
        name: yup.string().required("We need your name so that someone else doesnt get your order"),
        positions: yup
            .string()
            .oneOf(["Personal Pan", "Small", "Medium", "Large", "Ultimate"]),
        Pepperoni: yup.boolean().oneOf([true, !true]),
        ItalianSausage: yup.boolean().oneOf([true, !true]),
        Onions: yup.boolean().oneOf([true, !true]),
        Mushrooms: yup.boolean().oneOf([true, !true]),
        Ham: yup.boolean().oneOf([true, !true]),
        Anchovies: yup.boolean().oneOf([true, !true]),
        Bacon: yup.boolean().oneOf([true, !true])
    });

    useEffect(() => {
        schema.isValid(formState).then((valid) => {
          console.log("Valid?", valid);
         setButtonDisabled(!valid);
        });
    
      }, [formState, schema]);
    
      console.log("formState", formState)


      return (
        <form onSubmit={formSubmit} className="theForm">
            {serverError && <p className="error">{serverError}</p>}

            <label className="name">
                Name 
                <input
                id="name"
                type="text"
                name="name"
                value={formState.name}
                onChange={inputChange}
                 />
                 {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>

            <label className="size">
                Please Choose an Awesome Pizza Size
                 <select
                   id="positions"
                   name="positions"
                   value={formState.positions}
                   onChange={inputChange}
                >
                <option value="">--Select One--</option>
                <option value="Personal">Personal Pan</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Ultimate">Ultimate</option>
                
                </select>
                {errors.positions.length > 0 ? (
                    <p className="error">{errors.positions}</p>
                ) : null}
            </label>

            <label className="toppings">
                <input
                    type="checkbox"
                    id="toppings"
                    name="Pepperoni"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Pepperoni
                  <input
                    type="checkbox"
                    id="toppings"
                    name="ItalianSausage"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Italian Sausage
                  <input
                    type="checkbox"
                    id="toppings"
                    name="Mushrooms"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Mushrooms
                  <input
                    type="checkbox"
                    id="toppings"
                    name="Onions"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Onions
                  <input
                    type="checkbox"
                    id="toppings"
                    name="Ham"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Ham
                  <input
                    type="checkbox"
                    id="toppings"
                    name="Anchovies"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Anchovies
                  <input
                    type="checkbox"
                    id="toppings"
                    name="Bacon"
                    checked={formState.toppings}
                    onChange={inputChange}
                  />
                  Bacon


            </label>
            <button type="submit" disabled={buttonDisabled}>
                Submit
             </button>
            <pre>{JSON.stringify(order, null, 2)}</pre>

        </form>
      )
 };
