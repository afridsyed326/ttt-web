import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { useAuthActions } from "@/store/auth/authActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";
import { Link } from "@heroui/link";

const RegisterForm = () => {
    const { registerUser } = useAuthActions();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            username: Yup.string().required("Username is required"),
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Min 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const res = await registerUser(values);
            if (res.statusCode === 201) {
                addToast({
                    title: "Success",
                    description: res.message,
                    color: "success",
                });
                navigate("/");
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
                <h2 className="text-xl text-center font-bold">Register</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-2">
                    <Input
                        placeholder="First Name"
                        name="firstName"
                        variant="bordered"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            formik.touched.firstName &&
                            !!formik.errors.firstName
                        }
                        errorMessage={
                            formik.touched.firstName && formik.errors.firstName
                        }
                    />

                    <Input
                        placeholder="Last Name"
                        name="lastName"
                        variant="bordered"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            formik.touched.lastName && !!formik.errors.lastName
                        }
                        errorMessage={
                            formik.touched.lastName && formik.errors.lastName
                        }
                    />

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
                        placeholder="Email"
                        name="email"
                        type="email"
                        variant="bordered"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                            formik.touched.email && !!formik.errors.email
                        }
                        errorMessage={
                            formik.touched.email && formik.errors.email
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
                        Register
                    </Button>
                </form>
                <p className="text-center">
                    Already have an account?{" "}
                    <Link href="/register">
                        <span>Login here</span>
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default RegisterForm;
