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
import { Button } from '../ui/button';

type AlertFormProps = {
    trigger: string;
    title: string;
    description: string;
    callback?: () => void;
};

function AlertForm({ trigger, title, description, callback }: AlertFormProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>{trigger}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>{description}</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={callback}>
                        Confirm
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertForm;
