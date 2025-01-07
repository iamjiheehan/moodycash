'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LuTrash2, LuPencil } from 'react-icons/lu';

type btnSize = 'default' | 'sm' | 'lg';

type SubmitButtonProps = {
    className?: string;
    text?: string;
    size?: btnSize;
};

type CallbackButtonProps = {
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isPending: boolean;
    text: string;
    className?: string;
    size?: btnSize;
};

export function SubmitButton({
    className = '',
    text = 'submit',
    size = 'lg',
}: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            disabled={pending}
            className={`py-2 capitalize ${className}`}
            size={size}
        >
            {pending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                text
            )}
        </Button>
    );
}
export const CardSignInButton = () => {
    return (
        <SignInButton mode="modal">
            <Button
                type="button"
                size="icon"
                variant="outline"
                className="p-2 cursor-pointer"
                asChild
            >
                <FaRegHeart />
            </Button>
        </SignInButton>
    );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            size="icon"
            variant="outline"
            className=" p-2 cursor-pointer"
        >
            {pending ? (
                <ReloadIcon className="animate-spin" />
            ) : isFavorite ? (
                <FaHeart />
            ) : (
                <FaRegHeart />
            )}
        </Button>
    );
};

export const DeleteButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            size="icon"
            variant="link"
            className="p-2 cursor-pointer"
        >
            {pending ? <ReloadIcon className=" animate-spin" /> : <LuTrash2 />}
        </Button>
    );
};

export const EditButton = () => {
    return (
        <Button
            type="button"
            size="icon"
            variant="link"
            className="p-2 cursor-pointer"
        >
            <LuPencil />
        </Button>
    );
};

export const BackButton=() => {
    return (
        <Button
            type="button"
            size="lg"
            variant="outline"
            className="py-2 cursor-pointer flex-1"
        >
            뒤로가기
        </Button>
    );
};

export const CallbackButton: React.FC<CallbackButtonProps> = ({
    callback,
    isPending,
    text,
    className = '',
    size = 'lg',
}) => {
    return (
        <Button
            onClick={callback}
            type="button"
            disabled={isPending}
            className={`capitalize ${className}`}
            size={size}
        >
            {isPending ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                text
            )}
        </Button>
    );
};
