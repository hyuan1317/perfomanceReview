import React, { useContext } from 'react';
import DropdownContext from './DropdownContext';
import styled from 'styled-components';
import Button from '../Button';

interface Props {
    title?: string | number;
    children?: any;
    iconClass?: string;
    iconOnly?: boolean;
    theme?: string;
}
const DropdownBox = styled(Button)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    min-width: 0;
    width: 100%;
    cursor: pointer;
    > span {
        margin-right: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    > i {
        flex: 0 0 auto;
        &:before {
            width: auto;
        }
    }
`;

export default function (props: Props) {
    const { show, disabled, theme, size, error, direction } = useContext(DropdownContext);
    function checkIsEmpty(input: any) {
        return input === undefined || input === null || input === '';
    }
    function defaultDropdownBox() {
        const iconName = props.iconClass ? props.iconClass :
            direction === 'horizontal' ? 'icon-arrow_right'
            : direction === 'vertical' ? 'icon-arrow_down' : '';
        return (
            <DropdownBox theme={props.theme || theme} size={size} error={error} disabled={disabled}>
                {
                    !props.iconOnly &&
                    <span>{checkIsEmpty(props.title) ? 'Please Select...' : props.title}</span>
                }
                <i className={iconName} />
            </DropdownBox>
        );
    }

    const { children = defaultDropdownBox } = props;
    return children({ show, disabled });
}
