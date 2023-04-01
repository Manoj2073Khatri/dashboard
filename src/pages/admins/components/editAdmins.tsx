import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation, useQuery } from 'react-query';
import CRUDServices from '../../../services/crudService';

import * as yup from "yup";
import { Flip, toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";

type IFormInput = {
  Id: string,
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
  ConfirmPassword: string | number,
  PhoneNumber: string
};
export const EditAdmin = () => {

  const [loader, setLoader] = useState<boolean>(false) 
  const [data, setData] = useState<any>(null);
  const [formPostData, setFormPostData] = useState<any>();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const schema = yup.object().shape({
    PhoneNumber: yup.string().matches(phoneRegExp, 'Enter valid phone number.').required("This field is required.").max(20),
    FirstName: yup.string().max(20, "Maximum characters is 20.").required("This field is required."),
    LastName: yup.string().max(20, "Maximum characters is 20.").required("This field is required."),
    Email: yup.string().email("Please enter a valid email").required("This field is required"),
    Password: yup.string().min(6, "Minimum characters is 6.").max(20, "Maximum characters is 20"),
    ConfirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match')
  });

  const { editId } = useParams();

  const {refetch: viewDetailsById } = useQuery<any, Error>(
    "query-viewDetailsById",
    async () => {
      return await CRUDServices.findById(`/createAdmin?id=${editId}`);
    },
    {
      enabled: false,
      onSuccess: (res: any) => {

        if (res) {
          setData(res?.data[0])
        }
      },
      onError: (err: any) => {
      },
    }
  );
  const { mutate: SaveAdminData } = useMutation<any, Error>(
    "query-saveAdminData",
    async () => {
      return await CRUDServices.post(`/addAdmin`, formPostData)
    },

    {

      onSuccess: (res: any) => {
        setLoader(false);
        toast.success('Admin Updated Successfully.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip
      });

      },
      onError: (err: any) => {
        setLoader(false); 
        toast.error('Error occured.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip
      });
      },
    }
  );

  useEffect(() => {

    try {
      viewDetailsById();
    } catch (err: any) {
    }

    return () => {

    }
  }, [viewDetailsById])

  const { register, control, formState: { errors }, handleSubmit, reset } = useForm<IFormInput>(
    {
      resolver: yupResolver(schema),
    }
  );
  useEffect(() => {
    if (formPostData) {
      try {
        setLoader(true);
        SaveAdminData();
        setLoader(false);
      }
      catch (err) {
        console.log('errr',err);
        setLoader(false);
      }
    }

    return () => {

    }
  }, [SaveAdminData, formPostData])


  const onSubmit: SubmitHandler<IFormInput> = formData => {
    setLoader(true);
    setFormPostData(formData)
    reset()
  };
  return (
    <div className='page page-view'>

      <div className="page-header has-toolbar">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
              <li className="breadcrumb-item"><a href="/Admins">Admin List</a></li>
              <li className="breadcrumb-item active">Edit Admin</li>

            </ol>
          </nav>
          <h1 className="page-title">Edit Admin</h1>
        </div>
      </div>
      {
        data ?
          <div className='page-content'>
            <Form className='bg-white mt-4 p-4 rounded-3 shadow-sm' onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3 d-none" controlId="Id">
                <Form.Label>Id</Form.Label>
                <Controller
                  name="Id"
                  control={control}
                  defaultValue={data?.id}
                  render={({ field }) => <Form.Control {...field} type="text" placeholder="" />}
                />
              </Form.Group>
              <div className='row'>
                <Form.Group className="mb-3 col-6" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Controller
                    control={control}
                    {...register("FirstName")}
                    defaultValue={data?.firstName}
                    render={({ field }) => <Form.Control {...field} type="text" placeholder="First Name" />}
                  />
                  <small className='text-danger'>{errors.FirstName?.message}</small>

                </Form.Group>
                <Form.Group className="mb-3 col-6" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Controller
                    control={control}
                    {...register("LastName")}
                    defaultValue={data?.lastName}
                    render={({ field }) => <Form.Control {...field} type="text" placeholder="Last Name" />}
                  />
                  <small className='text-danger'>{errors.LastName?.message}</small>

                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Controller
                  control={control}
                  defaultValue={data?.email}
                  {...register("Email")}
                  render={({ field }) => <Form.Control {...field} type="text" placeholder="Email" />}
                />
                <small className='text-danger'>{errors.Email?.message}</small>

              </Form.Group>
              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Controller
                  control={control}
                  {...register("PhoneNumber")}
                  defaultValue={data?.phoneNumber ? data.phoneNumber : ""}
                  render={({ field }) => <Form.Control {...field} type="text" placeholder="phoneNumber" />}
                />
                <small className='text-danger'>{errors.PhoneNumber?.message}</small>

              </Form.Group>
              <div className='row'>
                <Form.Group className="mb-3 col-6" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Controller
                    control={control}
                    {...register("Password")}
                    render={({ field }) => <Form.Control {...field} type="text" placeholder="Password" />}
                  />
                  <small className='text-danger'>{errors.Password?.message}</small>

                </Form.Group>
                <Form.Group className="mb-3 col-6" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Controller
                    control={control}
                    {...register("ConfirmPassword")}
                    render={({ field }) => <Form.Control {...field} type="text" placeholder="Confirm Password" />}
                  />
                  <small className='text-danger'>{errors.ConfirmPassword?.message}</small>

                </Form.Group>

              </div>

              <Button variant="primary" type="submit">
                Submit {loader && <Spinner animation="border" size="sm" />}
              </Button>
            </Form>
          </div>

          :
          <div className=" w-100 h-75 d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status" >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>

      }


    </div>
  )
}
