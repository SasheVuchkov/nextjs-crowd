import React, {PropsWithChildren} from 'react';
import {Button, Spinner} from 'react-bootstrap';

export type Props = {
    loading: boolean,
    page: number|null,
    onClick: () => void;
}

export default function LoadButton({loading, page, onClick, children}: PropsWithChildren<Props>) {
    return (
        <Button variant="outline-light" className="w-100 load-more" disabled={page === null || loading} onClick={onClick} >
            {children}
            {loading && <Spinner className="ms-2" animation={'grow'} size="sm" />}
        </Button>
    );
}