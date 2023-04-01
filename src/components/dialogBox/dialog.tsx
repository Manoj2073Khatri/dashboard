import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'

const DialogBox = ({ showM, saveClick, cancelClick }: any) => {
    const [show, setShow] = useState(false);
    
    const save = () => {
        saveClick();
    }
    const cancel = () => {
        setShow(false);
        cancelClick();
    }
    useEffect(() => {
        setShow(showM)
        return () => {
        }
    }, [showM])
    return (
        <Modal show={show} onHide={cancel}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancel}>
                    Close
                </Button>
                <Button variant="primary" onClick={save}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DialogBox