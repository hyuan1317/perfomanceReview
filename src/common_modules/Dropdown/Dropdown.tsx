import React, { useState } from 'react';
import DropdownContext from './DropdownContext';
import styled from 'styled-components';
export { default as DropdownBox } from './DropdownBox';
export { default as DropdownWindow } from './DropdownWindow';

interface Props {
    theme?: string;
    size?: string;
    error?: boolean;

    direction?: string;
    data?: any[];
    onSelect?: (selectedItem: any) => void;
    disabled?: boolean;
    children: any;
    displayAttr?: string;
    keyAttr?: string;
}

interface DropdownProps {
    disabled?: boolean;
}
const Dropdown = styled.div<DropdownProps>`
    display: inline-block;
    min-width: 0;
    width: 100%;
    ${(props) => props.disabled
        ?
        `
            pointer-events: none;
        `
        : ''
    }
`;

export default function (props: Props) {
    const [show, setShow] = useState(false);
    function closeWindow() {
        setShow(false);
    }
    return (
        <DropdownContext.Provider
            value={{
                show,
                setShow,
                closeWindow,
                theme: props.theme,
                size: props.size,
                error: props.error,
                disabled: props.disabled || false,
                onSelect: props.onSelect,
                direction: props.direction || 'vertical',
                data: props.data,
                displayAttr: props.displayAttr,
                keyAttr: props.keyAttr,
            }}
        >
            <Dropdown disabled={props.disabled}>
                {props.children}
            </Dropdown>
        </DropdownContext.Provider>
    );
}
