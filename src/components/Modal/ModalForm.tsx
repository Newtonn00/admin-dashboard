import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

interface ModalFormProps{

    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    headerText: string;
    BodyComponent: React.FC;
    handleCancelExtended:() => void;
    handleConfirmExtended:() => void;

}
const ModalForm:React.FC<ModalFormProps> = ({isOpen, setIsOpen, headerText, BodyComponent, handleCancelExtended, handleConfirmExtended}) => {
    

    const handleCancel = () =>{
        handleCancelExtended()
        setIsOpen(false);
    }
    const handleConfirm = () =>{
        handleConfirmExtended()
        setIsOpen(false);
    }
    

    return(
        <Modal 
        isOpen={isOpen}
        onOpenChange={(open)=>{setIsOpen(open)}}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
        backdrop='blur'
        >
            <ModalContent>
                {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">
                    {headerText}
                    </ModalHeader>
                    <ModalBody>
                        <BodyComponent />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" onPress={() => {
                        handleCancel();
                        onClose();
                    }}>
                        Cancel
                    </Button>
                    <Button color="primary" variant='light' onPress={() => {
                        handleConfirm();
                        onClose();
                    }}>
                        Confirm
                    </Button>
                    </ModalFooter>
                </>
                )}
            </ModalContent>
        </Modal>
    );    
};

export default ModalForm;