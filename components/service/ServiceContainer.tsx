'use client';

import ServiceForm from './ServiceForm';
import ConfirmService from './ConfirmService';

function ServiceContainer() {
    return (
        <div className="w-full">
            <ServiceForm />
            <ConfirmService />
        </div>
    );
}

export default ServiceContainer;
