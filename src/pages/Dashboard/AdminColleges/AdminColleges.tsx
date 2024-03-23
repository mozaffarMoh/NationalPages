import "./AdminColleges.scss";
import React from "react";
import { Table } from "antd";
import { endPoint } from "../../../api/endPoints";
import useGet from "../../../api/useGet";
import { FaUpload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import usePost from "../../../api/usePost";
import { AdminHeader } from "../../../components/Dashboard";
import { Loading, MessageAlert } from "../../../components";

const AdminColleges = () => {
  const [data, getData, loading]: any = useGet(endPoint.adminColleges);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [imageFile, setImageFile]: any = React.useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("type", type);
  formData.append("image", imageFile);
  const [
    ,
    handleAddCollege,
    postLoading,
    success,
    errorMessage,
    successStatus,
  ]: any = usePost(formData, endPoint.addCollege, null, true);

  /* Handle Add Image */
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const columns: any = [
    {
      title: "الرقم التعريفي",
      dataIndex: "college_id",
      key: "college_id",
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "النوع",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "الصورة",
      dataIndex: "image",
      key: "image",
      render: (url: any) => <img src={url} width={100} height={100} />,
    },
  ];

  /* Remove inputs when success */
  React.useEffect(() => {
    if (successStatus) {
      setName("");
      setType("");
      setImageFile(null);
      getData();
    }
  }, [successStatus]);

  return (
    <div>
      <AdminHeader />
      {postLoading && <Loading />}
      {success && (
        <MessageAlert message={"تم اضافة الكلية بنجاح"} type="success" />
      )}
      {errorMessage && <MessageAlert message={errorMessage} type="error" />}
      <div className="admin-colleges flexCenterColumn">
        <h2>الكليات</h2>
        <div className="table-container">
          {data && !loading ? (
            <Table dataSource={data} columns={columns} />
          ) : (
            <div className="dashboard-spinner">
              <Spinner />
            </div>
          )}
        </div>
        <div className="add-ads flexCenterColumnItemsStart">
          <h4>إضافة كلية : </h4>
          <form
            className="flexCenterColumn flex-wrap p-3"
            onSubmit={handleSubmit(handleAddCollege)}
          >
            <input
              type="text"
              placeholder="اسم الكلية"
              value={name}
              {...register("name", {
                required: "اسم الكلية مطلوب",
              })}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="error-message">{errors.name.message}</div>
            )}

            <input
              type="text"
              placeholder="النوع"
              value={type}
              {...register("type", {
                required: "النوع مطلوب",
              })}
              onChange={(e) => setType(e.target.value)}
            />
            {errors.type && (
              <div className="error-message">{errors.type.message}</div>
            )}

            <input
              type="file"
              id="download-image-id"
              {...register("imageFile", {
                required: "الصورة مطلوبة",
              })}
              onChange={handleAddImage}
            />
            <label
              className="downlaod-image flexCenterColumn"
              htmlFor="download-image-id"
            >
              {" "}
              اضافة صورة <FaUpload />
            </label>
            {errors.imageFile && (
              <div className="error-message">{errors.imageFile.message}</div>
            )}
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                width={250}
                height={200}
              />
            )}
            <button type="submit" onSubmit={handleAddCollege}>
              إضافة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminColleges;
