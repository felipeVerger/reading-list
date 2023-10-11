import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../schema/auth.schema";
import { generateSalt, hashPassword } from "../../utils/function";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { registerUser, userLogin } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { SanityImageAssetDocument } from "@sanity/client";
import { Avatar } from "../../types/user.type";
import { client } from "../../client";
import IconLibrary from "../../assets/icons";
import Input from "../shared/Input";

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [image, setImage] = useState<null | Avatar | SanityImageAssetDocument>(
    null
  );
  const [wrongImageType, setWrongImageType] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(isLoggedIn ? loginSchema : registerSchema),
  });
  const navigate = useNavigate();

  const uploadAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      const { type, name } = selectedFile;
      if (
        type === "image/png" ||
        type === "image/svg" ||
        type === "image/jpeg" ||
        type === "image/gif" ||
        type === "image/tiff"
      ) {
        setWrongImageType(false);

        client.assets
          .upload("image", selectedFile, { contentType: type, filename: name })
          .then((docuemnt) => {
            setImage(docuemnt as SanityImageAssetDocument);
          })
          .catch((error) => {
            console.log("Image upload error: " + error);
          });
      } else {
        setWrongImageType(true);
      }
    }
  };

  const onSubmit = () => {
    const { username, email, password } = methods.getValues();
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    if (isLoggedIn) {
      const user = {
        email,
        password,
      };
      dispatch(userLogin(user)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      });
    } else {
      const doc = {
        username,
        email,
        password: hashedPassword,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image?._id,
          },
        },
        salt,
      };
      dispatch(registerUser(doc)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoggedIn(true);
          methods.reset();
        } else {
          alert("Something went wrong");
        }
      });
    }
  };

  const switchForm = () => {
    setImage(null);
    methods.reset();
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="auth-form">
        {!isLoggedIn && (
          <Input
            type="text"
            name="username"
            autoFocus={true}
            label="username"
            error={methods.formState.errors.username?.message}
            isError={Boolean(methods.formState.errors.username)}
          />
        )}
        <Input
          type="email"
          name="email"
          label="email"
          error={methods.formState.errors.email?.message}
          isError={Boolean(methods.formState.errors.email)}
        />
        <Input
          type="password"
          name="password"
          label="password"
          error={methods.formState.errors.password?.message}
          isError={Boolean(methods.formState.errors.password)}
        />
        {!isLoggedIn && (
          <>
            <Input
              type="password"
              name="confirmPassword"
              label="confirm Password"
              error={methods.formState.errors.confirmPassword?.message}
              isError={Boolean(methods.formState.errors.confirmPassword)}
            />
            <label htmlFor="avatar" className="w-full cursor-pointer">
              <div className="w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Avatar
                <div className="w-full h-9 lg:h-10 flex justify-center items-center rounded-lg bg-transparent border border-gray-300 p-2.5 text-lg">
                  {wrongImageType ? (
                    <p className="text-red-700 text-sm">Wrong image type</p>
                  ) : image ? (
                    <div className="text-green-700">
                      <IconLibrary.checkCircle />
                    </div>
                  ) : (
                    <div className="text-slate-500 ">
                      <IconLibrary.addImage />
                    </div>
                  )}
                </div>
              </div>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="hidden"
                onChange={uploadAvatarImage}
              />
            </label>
          </>
        )}
        <button className="submit-btn" type="submit">
          {loading ? "loading..." : "Submit"}
        </button>
        <p className="text-sm text-slate-500 self-center">
          {!isLoggedIn ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="ml-2 text-base font-medium text-blue-500"
            onClick={switchForm}
          >
            {!isLoggedIn ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </form>
    </FormProvider>
  );
};

export default AuthForm;
