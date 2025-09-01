import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { useAuthActions } from "@/store/auth/authActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";

const LoginForm = () => {
    const { login } = useAuthActions();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "afridsyed326",
            password: "Abcd123!",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),

            password: Yup.string()
                .min(6, "Min 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const res = await login(values);
            if (res.statusCode === 200) {
                addToast({
                    title: "Success",
                    description: res.message,
                    color: "success",
                });
                navigate("/play");
            } else {
                addToast({
                    title: "Failed",
                    description: res.message,
                    color: "danger",
                });
            }
            setLoading(false);
        },
    });

    return (
        <div className="flex items-center justify-center bg-gray-50">
            <Card className="p-6 w-[28rem] space-y-2">
                <h2 className="text-xl text-center font-bold">Login</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-2">
                    <Input
                        placeholder="Username"
                        name="username"
                        variant="bordered"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            formik.touched.username && !!formik.errors.username
                        }
                        errorMessage={
                            formik.touched.username && formik.errors.username
                        }
                    />

                    <Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        variant="bordered"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            formik.touched.password && !!formik.errors.password
                        }
                        errorMessage={
                            formik.touched.password && formik.errors.password
                        }
                    />

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full bg-primary"
                        isLoading={loading}
                    >
                        Login
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;
