import React from 'react';
import TextAreaInput from '../form/TextAreaInput';

export default function ServiceDescription() {
    return (
        <section>
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                What’s behind how you’re feeling?
            </h1>
            <TextAreaInput
                name="description"
                labelText="Description (10 - 50 Words)"
                placeholder="Describe your feelings"
            />
        </section>
    );
}
