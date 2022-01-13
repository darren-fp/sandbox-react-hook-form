import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import "./App.css";

type FormData = {
  email: string;
  password: string;
  hobby: string[];
  gender: string;
  manualInput: string;
  height: number;
  weight: number;
  materialUiInput: string;
};

function App() {
  const { register, handleSubmit, formState, watch, control } =
    useForm<FormData>({
      defaultValues: {
        email: "",
        password: "",
        hobby: [],
        gender: "",
        manualInput: "",
        height: 0,
        weight: 0,
        materialUiInput: "",
      },
    });

  // Include entire formState in dep array in useEffect
  useEffect(() => {
    console.log("formState.errors", formState.errors);
    console.log("formState.touchedFields", formState.touchedFields);
  }, [formState]);

  // Manual register
  const manualInput = register("manualInput");

  // Watch specified inputs. Useful for determining what to render
  const watchGender = watch("gender");

  // Submit success callback
  const onSubmitSuccess = (data: any) => alert(JSON.stringify(data));

  // Submit error callback
  const onSubmitError = (errors: any) => console.log("errors", errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmitSuccess, onSubmitError)}
      className="container"
    >
      <h1>Test React Hook Form</h1>
      <label>Email</label>
      <input
        {...register("email", {
          required: "Email is required",
          onChange: (e) => {
            console.log(e.target.value);
          },
          value: "123",
        })}
      />
      <p>{formState.errors.email?.message}</p>

      <label>Password</label>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: {
            message: "Minimum 8 characters",
            value: 8,
          },
        })}
      />

      <label>Hobbies:</label>
      <input {...register("hobby.0")} />
      <input {...register("hobby.1")} />
      <input {...register("hobby.2")} />
      <p>{formState.errors.password?.message}</p>

      <label>Gender</label>
      <label htmlFor="male">Male</label>
      <input {...register("gender")} id="male" type="radio" value="male" />
      <label htmlFor="female">Female</label>
      <input {...register("gender")} id="female" type="radio" value="female" />

      {watchGender === "male" && (
        <>
          <label>Height</label>
          <input {...register("height")} />
        </>
      )}
      {watchGender === "female" && (
        <>
          <label>Weight</label>
          <input {...register("weight")} />
        </>
      )}

      <label>Manual Input</label>
      <input
        onChange={manualInput.onChange}
        onBlur={manualInput.onBlur}
        ref={manualInput.ref}
      />

      <label>Material UI Input</label>
      <Controller
        control={control} // object containing methods for registering component. for internal usage only
        name="materialUiInput"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => <TextField value={value} onChange={onChange} onBlur={onBlur} />}
      />

      <input type="submit" />
      <button onClick={handleSubmit(onSubmitSuccess, onSubmitError)}>
        Another button to submit
      </button>
    </form>
  );
}

export default App;

// Creating wizard form
// https://react-hook-form.com/advanced-usage#WizardFormFunnel

// Using React Hook From with deeply nested component trees
// https://react-hook-form.com/api/useformcontext
// https://react-hook-form.com/advanced-usage#ConnectForm
