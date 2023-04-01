
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  description: string;
  status: string;
}


const AddTable = ({ show, handleClose }: any) => {

  const [count, setCount] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(true);

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Platform Reference Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >

            <Form.Label>Name<span className=" ms-1 text-danger" title="Required field">*</span></Form.Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control {...field} className={`${errors.name?.type === 'required' && 'input-validation-error'}`} type="Name" placeholder="" autoFocus />}
            />
            <div className='form-text'>Note: Special characters are not allowed.</div>

            {errors.name?.type === 'required' && <Form.Control.Feedback className='d-block' type="invalid">
              Name field is required
            </Form.Control.Feedback>}

          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <div className='d-flex justify-content-between align-items-center'>
              <Form.Label>Description<span className="ms-1 text-danger" title="Required field">*</span></Form.Label>
              <span className='form-label'>{count} / 256</span>

            </div>


            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Form.Control {...field} className={`${errors.description?.type === 'required' && 'input-validation-error'}`} as="textarea" rows={4} onChange={e => setCount(e.target.value.length)} />}
            />
            {errors.description?.type === 'required' && <Form.Control.Feedback className='d-block' type="invalid">
              Name field is required
            </Form.Control.Feedback>}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="checkBox"
          >
            <Form.Label>Status</Form.Label>
            <div>
              <Controller
                name='status'
                //defaultValue=false
                control={control}
                // rules={{ required: true }}
                render={({ field }) => <Form.Check {...field} className='form-switch' inline label={checked ? 'Active' : 'inActive'} name="checkbox" type="checkbox" defaultChecked={true} onChange={(e: any) => setChecked(prevCheck => !prevCheck)} />}

              />


            </div>


          </Form.Group>

        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTable