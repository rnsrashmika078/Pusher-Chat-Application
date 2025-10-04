"use client";
import React, { useEffect, useState } from "react";
import Button from "../../lib/Components/Basic/Button";
import InputText from "../../lib/Components/Basic/InputText";
import GoogleSignIn from "../../lib/Components/Basic/Providers/GoogleSignIn";
import UserSignUp from "@/src/server_side/actions/UserSignUp";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signUpSchema } from "@/src/validation/authSchema";
import { SignInData, SignUpData } from "@/interface/Types/index";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ReduxDispatch } from "@/src/redux/store";
import { setSimpleNotification } from "@/src/redux/NotifySlicer";
import Spinner from "@/src/lib/Components/Intermediate/Spinner";
const SignForms: React.FC = () => {
  const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState<string | null>(null);
  type FormData = SignInData | SignUpData;

  // Zod------------------------------------------------------------------
  const schema = formType === "signIn" ? signInSchema : signUpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // Zod------------------------------------------------------------------

  const router = useRouter();
  const dispatch = useDispatch<ReduxDispatch>();
  const onSubmit = async (data: SignInData | SignUpData) => {
    setLoading(true);
    if (formType === "signIn") {
      const signInData = data as SignInData;
      const res = await signIn("credentials", {
        username: signInData.username,
        password: signInData.password,
        redirect: false,
        // callbackUrl: "/dashboard",
      });
      const id = Date.now();
      if (res?.ok) {
        setLoading(false);
        dispatch(
          setSimpleNotification({
            message: "Successfully Logged in!",
            id: id,
          })
        );
        router.push(res.url || "/dashboard");
      } else {
        const id = Date.now();
        dispatch(
          setSimpleNotification({
            message: "Invalid credentials.Please check the login credentials!",
            id: id,
          })
        );
      }
      setLoading(false);
      return new Promise((resolve) =>
        setTimeout(() => {
          setMessage(null);
          resolve(true);
        }, 3000)
      );
    } else {
      // setFormType("signUp");
      const signUpData = data as SignUpData;
      const formData = new FormData();
      formData.append("firstname", signUpData.firstname);
      formData.append("lastname", signUpData.lastname);
      formData.append("username", signUpData.username);
      formData.append("password", signUpData.password);
      const result = await UserSignUp(formData);
      if (result) {
        if (result.status === 401) {
          const id = Date.now();
          setMessage(result.message);
          dispatch(setSimpleNotification({ message: result.message, id: id }));
        } else {
          const id = Date.now();
          dispatch(setSimpleNotification({ message: result.message, id: id }));
          setMessage(result.message);
          reset();
        }
      }
      setLoading(false);
      return new Promise((resolve) =>
        setTimeout(() => {
          setMessage(null);
          resolve(true);
        }, 3000)
      );
    }
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formType]);

  // Framer motion
  // const containerVariants = {
  //     visible: {
  //         transition: {
  //             staggerChildren: 0.2,
  //             staggerDirection: 1, // 1 = forward, -1 = reverse
  //         },
  //     },
  //     exit: {
  //         transition: {
  //             staggerChildren: 0.3,
  //             staggerDirection: -1, // animate out in reverse
  //         },
  //     },
  // };
  const itemVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  };
  return (
    <AnimatePresence mode="wait">
      {loading && <Spinner />}

      <motion.div
        key={formType}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=" mt-5 select-none flex border  border-[var(--border)] rounded-2xl justify-center w-11/12 sm:w-[500px] md:w-[500px] p-5 m-auto shadow-sm bg-[var(--card-background)]"
      >
        <div className="flex flex-col gap-1 w-full md:min-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-center text-2xl">
              {formType === "signIn" ? "Sign In" : "Sign Up"}
            </h1>

            {[
              { fieldname: "Firstname", in: "signUp" },
              { fieldname: "Lastname", in: "signUp" },
              { fieldname: "Username", in: "both" },
              { fieldname: "Password", in: "both" },
              { fieldname: "Confirm", in: "signUp" },
            ].map((field, index) =>
              field.in === formType || field.in === "both" ? (
                // <motion.div key={index} variants={itemVariants}>
                <InputText
                  key={index}
                  {...register(field.fieldname.toLowerCase() as keyof FormData)}
                  type="text"
                  name={field.fieldname.toLowerCase()}
                  placeholder={`Enter ${field.fieldname}`}
                  label={field.fieldname}
                  error={
                    errors[field.fieldname.toLowerCase() as keyof FormData]
                      ?.message || ""
                  }
                  radius="md"
                  className="w-full"
                />
              ) : // </motion.div>
              null
            )}

            {formType === "signIn" && (
              <p className="text-start text-sm  p-1">
                Forgot password?
                <span className="text-blue-500 hover:cursor-pointer">
                  {" Reset"}
                </span>
              </p>
            )}
            <Button
              type="submit"
              name={formType === "signIn" ? "Sign In" : "Sign Up"}
              radius="md"
              variant="default"
              className="w-full mt-5"
            />

            <div className="border-b border-[var(--border)] p-2 mb-2"></div>
          </form>
          <GoogleSignIn formtype={formType} />
          <div className="border-b border-[var(--border)] p-2"></div>
          <p className="text-center text-sm text-gray-400 p-1 mt-2">
            {formType === "signIn" ? (
              <span>
                Don&apos;t have an account?
                <span
                  className="text-blue-500 hover:cursor-pointer"
                  onClick={() => {
                    setFormType("signUp");
                  }}
                >
                  {" Sign Up"}
                </span>
              </span>
            ) : (
              <span>
                Already have an account?
                <span
                  className="text-blue-500 hover:cursor-pointer"
                  onClick={() => setFormType("signIn")}
                >
                  {" Sign In"}
                </span>
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignForms;
