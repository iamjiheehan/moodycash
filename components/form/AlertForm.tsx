'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DeleteButton, EditButton, SubmitButton } from './Buttons';

type actionType = 'submit' | 'edit' | 'delete';
type AlertFormProps = {
    title: string;
    actionType: actionType;
    description?: string;
    callback?: (prevState: any, formData: FormData) => void;
};

function AlertForm({
    title,
    description,
    actionType,
    callback,
}: AlertFormProps) {
    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // 기본 동작을 막음
        if (callback) {
            const formData = new FormData(
                document.querySelector('form') as HTMLFormElement
            );
            callback({}, formData);
        }
    };

    const renderTriggerButton = () => {
        switch (actionType) {
            case 'submit':
                return <SubmitButton />;
            case 'delete':
                return <DeleteButton />;
            default:
                return null;
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div>{renderTriggerButton()}</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription className="AlertDialogDescription">
                        {description ? description : ''}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertForm;
