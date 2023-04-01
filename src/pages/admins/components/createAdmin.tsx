import { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation } from 'react-query';
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
    ConfirmPassword: string,
    PhoneNumber: string
};
export const CreateAdmin = () => {

    const [loader, setLoader] = useState<boolean>(false)
    const [formPostData, setFormPostData] = useState<any>();

    const { mutate: SaveAdminData } = useMutation<{}, Error>(
        "query-saveAdminData",
        async () => {
            return await CRUDServices.post(`/route`, formPostData)
        },
        {
            onSuccess: (res: any) => {
                setLoader(false);

                toast.success('Admin Created Successfully.', {
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

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = yup.object().shape({
        PhoneNumber: yup.string().matches(phoneRegExp, 'Enter valid phone number.').required("This field is required."),
        FirstName: yup.string().max(20, "Maximum characters is 20.").required("This field is required."),
        LastName: yup.string().max(20, "Maximum characters is 20.").required("This field is required."),
        Email: yup.string().email("Please enter a valid email").required("This field is required"),
        Password: yup.string().required("This field is required.").min(6, "Minimum characters is 6.").max(20, "Maximum characters is 20"),
        ConfirmPassword: yup.string().oneOf([yup.ref('Password'), null], 'Passwords must match').required("This field is required.")
    });

    const { register, formState: { errors }, control, handleSubmit, reset } = useForm<IFormInput>(
        {
            resolver: yupResolver(schema),
        }
    );

    useEffect(() => {
        let isTrue=true;

        if (formPostData && isTrue) {
            try {
                setLoader(true);
                SaveAdminData();
            }
            catch (err) {
                console.log(err);
            }
        }
        return () => {

            isTrue=false;
        }
    }, [SaveAdminData, formPostData])


    const onSubmit: SubmitHandler<IFormInput> = (formData) => {
        setFormPostData(formData)
        reset()
    };
    return (

        <div className="page page-view">
            <div className="page-header has-toolbar">
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                            <li className="breadcrumb-item"><a href="/Admins">Admin List</a></li>
                            <li className="breadcrumb-item active">Create Admin</li>

                        </ol>
                    </nav>
                    <h1 className="page-title">Create Admin</h1>
                </div>
            </div>
            
                <div className='page-content'>
                    <Form className='bg-white mt-4 p-4 rounded-3 shadow-sm' onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3 d-none" controlId="Id">
                            <Form.Label>Id</Form.Label>
                            <Controller
                                name="Id"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Form.Control {...field} type="text" placeholder="" />
                                }
                            />
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-6" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Controller
                                    // name="FirstName"
                                    control={control}
                                    defaultValue=""
                                    {...register("FirstName")}
                                    render={({ field }) => <Form.Control {...field} type="text" placeholder="First Name" />}
                                />
                                <small className='text-danger'>{errors.FirstName?.message}</small>
                            </Form.Group>

                            <Form.Group className="mb-3 col-6" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Controller
                                    //name="LastName"
                                    control={control}
                                    defaultValue=""
                                    {...register("LastName")}
                                    render={({ field }) => <Form.Control {...field} type="text" placeholder="Last Name" />}
                                />
                                <small className='text-danger'>{errors.LastName?.message}</small>
                            </Form.Group>

                        </div>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Controller
                                control={control}
                                defaultValue=""
                                {...register("Email")}
                                render={({ field }) => <Form.Control {...field} type="text" placeholder="Email" />}
                            />
                            <small className='text-danger'>{errors.Email?.message}</small>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Controller
                                //name="PhoneNumber"
                                control={control}
                                defaultValue=""
                                {...register("PhoneNumber")}
                                render={({ field }) => <Form.Control {...field} type="text" placeholder="phoneNumber" />}
                            />
                            <small className='text-danger'>{errors.PhoneNumber?.message}</small>
                        </Form.Group>

                        <div className='row'>
                            <Form.Group className="mb-3 col-6" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Controller
                                    // name="Password"
                                    control={control}
                                    defaultValue=""
                                   
                                    {...register("Password")}
                                    render={({ field }) => <Form.Control {...field} type="password" autoComplete="new-password" placeholder="Password" />}
                                />
                                <small className='text-danger'>{errors.Password?.message}</small>
                            </Form.Group>

                            <Form.Group className="mb-3 col-6" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Controller
                                    //name="ConfirmPassword"
                                    control={control}
                                    defaultValue=""
                                    {...register("ConfirmPassword")}
                                    render={({ field }) => <Form.Control {...field} type="password" placeholder="Confirm Password" />}
                                />
                                <small className='text-danger'>{errors.ConfirmPassword?.message}</small>
                            </Form.Group>
                        </div>


                        <Button variant="primary" type="submit">
                            Submit  {loader && <Spinner animation="border" size="sm" />}
                        </Button>
                    </Form>
                </div>
            

        </div>

    )
}
