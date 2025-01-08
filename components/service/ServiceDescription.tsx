import React from 'react';
import TextAreaInput from '../form/TextAreaInput';

interface ServiceDescriptionProps {
    description?: string;
}

export default function ServiceDescription({
    description,
}: ServiceDescriptionProps) {
    return (
        <section>
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black-600">
                이 기분을 느끼는 이유를 적어주세요
            </h1>
            <TextAreaInput
                isLabelHidden={true}
                name="description"
                labelText="50 글자 이내로 간단히 적어주세요"
                placeholder="50 글자 이내로 간단히 적어주세요"
                defaultValue={description}
            />
        </section>
    );
}
