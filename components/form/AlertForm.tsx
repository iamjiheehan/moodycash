'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DeleteButton, EditButton, SubmitButton } from './Buttons';

type actionType = 'submit' | 'edit' | 'delete';
type AlertFormProps = {
    title: string;
    description: string;
    actionType: actionType;
    callback?: (actionType: actionType) => void;
};

function AlertForm({
    title,
    description,
    actionType,
    callback,
}: AlertFormProps) {
    const handleConfirm = () => {
        if (callback) {
            callback(actionType);
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
                </AlertDialogHeader>
                <AlertDialogDescription>{description}</AlertDialogDescription>
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
