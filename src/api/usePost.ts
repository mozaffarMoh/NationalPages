import React from "react";
import apiNational from "./apiNational";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const usePost = (body: any, endPoint: any, isObject?: any, isFormData?: any) => {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successStatus, setSuccessStatus] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const uuid = isObject?.isCollege_UUID ? `?college_uuid=${isObject?.college_UUID}` : '';

    const postFunc = () => {
        setLoading(true)
        setSuccessStatus(false);

        apiNational
            .post(endPoint + uuid,
                body,
                isFormData && { headers: { "Content-Type": "multipart/form-data" } }
            )
            .then((res) => {
                setLoading(false)
                setData(res?.data?.data);
                setSuccess(true);
                setSuccessStatus(true)


                setTimeout(() => {
                    if (res?.data?.data?.token) {
                        Cookies.set("token", res.data.data.token);
                        Cookies.set("code", res.data.data.code);
                        Cookies.set("collegeUUID", res.data.college_uuid);
                        navigate("/");
                    }
                }, 2000);
                setTimeout(() => {
                    setSuccess(false)
                }, 4000);
            })
            .catch((err: any) => {
                console.log(err)
                setLoading(false)
                setSuccess(false);
                setErrorMessage(err.response.data.message[0]);
                setTimeout(() => {
                    setErrorMessage("")
                }, 4000);
            });


        /* Handle Network errors */
        apiNational.interceptors.response.use(
            (config: any): any => {
                return config
            },
            (error: any) => {
                if (error?.message == "Network Error") {
                    setErrorMessage("خطأ في الاتصال بالشبكة");
                    setTimeout(() => {
                        setErrorMessage("")
                    }, 4000);
                }

                return Promise.reject(error)
            }
        );

    }

    return [data, postFunc, loading, success, errorMessage, successStatus];

}

export default usePost;