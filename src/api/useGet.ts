import React from "react";
import apiNational from "./apiNational";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useGet = (endPoint: any, isObject?: any) => {
    const token = Cookies.get("token");
    const [data, setData] = React.useState([]);
    const navigate = useNavigate();
    const [loading, setLoading]: any = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [successStatus, setSuccessStatus] = React.useState(false);
    const [errorStatus, setErrorStatus] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const college_UUID = isObject?.isCollege_UUID ? `?college_uuid=${isObject?.college_UUID}` : '';
    const speciality_UUID = isObject?.isSpeciality_UUID ? `&specialty_uuid=${isObject?.speciality_UUID}` : '';
    const subject_UUID = isObject?.isSubject_UUID ? `&subject_uuid=${isObject?.subject_UUID}` : '';
    const exam_UUID = isObject?.isExam_UUID ? `&exam_uuid=${isObject?.exam_UUID}` : '';
    const degree = isObject?.isDegree ? `&degree=${isObject?.degree}` : '';
    const position = isObject?.isPosition ? `&position=${isObject?.position}` : '';
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');

    /* Get data */
    const getData = () => {
        setErrorStatus(false);
        setSuccessStatus(false);
        setLoading(true);
        apiNational
            .get(endPoint + college_UUID + speciality_UUID + subject_UUID + exam_UUID + degree + position)
            .then((res) => {
                setLoading(false);
                setData(res.data.data);
                setSuccessStatus(true)
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 4000);
            })
            .catch((err) => {
                setLoading(false)
                setErrorStatus(true);
                setErrorMessage(err.response.data.message[0]);
                if (err.response.data.message === "Unauthorize") {
                    if (location.pathname.includes("/dashboard")) {
                        navigate('/dashboard/login')
                    } else {
                        if (location.pathname !== basePath + '/' && location.pathname !== `${basePath}/register`) {
                            navigate('/')
                        }
                    }
                }
                setTimeout(() => {
                    setErrorMessage("")
                }, 4000);
            });

    }
    /* Check token and get data from initial*/
    React.useEffect(() => {
        if (!token) {
            if (location.pathname.includes(`/dashboard`)) {
                navigate('/dashboard/login');

            } else {
                if (
                    (location.pathname !== basePath + '/' && location.pathname !== `${basePath}/register`)
                ) {
                    navigate('/');
                }
            }
        }

        if (endPoint.slice(0, 25) != "/admin/delete-suggestions" && endPoint.slice(0, 20) != "/admin/delete-slider") {
            getData();
        }


    }, []);


    return [data, getData, loading, success, errorMessage, successStatus, errorStatus];
}

export default useGet;