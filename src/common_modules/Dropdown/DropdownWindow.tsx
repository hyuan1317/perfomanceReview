import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ScrollbarBeauty from '../ScrollbarBeauty';
import DropdownContext from './DropdownContext';

interface Props {
    children?: any;
    fixedWidth?: boolean;
    setStatus?: (status: boolean) => void;
    onShow?: () => void;
    onClose?: () => void;
}

interface DropdownWindowProps {
    open: boolean;
}

const DropdownWindow = styled.div`
    position: absolute;

    overflow: auto;
    width: 150px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    transition: opacity 0.1s ease;
    ${(props: DropdownWindowProps) => props.open ?
        `
            opacity: 1;
            z-index: 100;
        ` :
        `
            opacity: 0;
            z-index: -1;
        `
    }
`;
interface DropdownMenuProps {
    theme?: string;
}
const DefaultDropdownWrapper = styled(ScrollbarBeauty)<DropdownMenuProps>`
    max-height: inherit;
    background-color: ${(props) => props.theme === 'dark' ? 'var(--dark-two)' : 'var(--white-one)'};
`;
const DropdownMenu = styled.ul`
    margin: 0;
    padding: 0.375rem 0;
    list-style: none;
`;
interface DropdownItemProps {
    size?: string;
    theme?: string;
}
const DropdownItem = styled.li<DropdownItemProps>`
    margin: 0;
    padding: ${(props) => props.size === 'sm' ? 'var(--small)' : 'var(--medium)'};
    height: 26px;
    white-space: nowrap;
    cursor: pointer;

    font-size: ${(props) => props.size === 'sm' ? '0.75rem' : '0.875rem'};
    font-weight: 500;
    line-height: 26px;
    color: ${(props) => props.theme === 'dark' ? 'var(--white-two)' : 'var(--dark-one)'};
    &:hover {
        background-color: ${(props) => props.theme === 'dark' ? 'var(--themeColor-20)' : 'var(--themeColor-10)'};
    }
`;

export default function (props: Props) {
    const {
        size,
        show,
        setShow,
        closeWindow,
        onSelect,
        direction,
        data,
        theme,
        displayAttr = 'name',
        keyAttr = 'id',
    } = useContext(DropdownContext);
    const [positionStyle, setPositionStyle] = useState({ top:0, left: 0 });
    const parentDOM = useRef<any>(null);
    const selfDOM = useRef<any>(null);

    useEffect(() => {
        parentDOM.current = selfDOM.current.parentElement;
        adjustPosition();
    }, []);

    useEffect(() => {
        parentDOM.current.addEventListener('click', handleParentClick);
        parentDOM.current.addEventListener('mousedown', handleParentMouseDown);
        return () => {
            parentDOM.current.removeEventListener('click', handleParentClick);
            parentDOM.current.removeEventListener('mousedown', handleParentMouseDown);
        };
    }, [show]);
    useEffect(() => {
        if (show) {
            adjustPosition();
            attachEvent();
            if (props.onShow) props.onShow();
        }
        else {
            dettachEvent();

        }
        if (props.setStatus) props.setStatus(show);
    }, [show]);

    const handleParentMouseDown = useCallback((evt) => {
        if (show) evt.stopPropagation();
    }, [show]);
    const closeFlyout = useCallback(() => {
        setShow(false);
        if (props.onClose) props.onClose();
    }, []);

    function handleParentClick() {
        setShow(!show);
    }

    function attachEvent() {
        document.addEventListener('mousedown', closeFlyout);
        document.addEventListener('scroll', closeFlyout, true);
    }
    function dettachEvent() {
        document.removeEventListener('mousedown', closeFlyout);
        document.removeEventListener('scroll', closeFlyout, true);
    }

    function adjustPosition() {
        const selfDOMRect = selfDOM.current.getBoundingClientRect();
        const parentDOMRect = parentDOM.current.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;
        const newPositionStyle: any = {};
        switch (direction) {
            case 'horizontal':
                newPositionStyle.maxHeight = innerHeight;
                // left-right
                if (parentDOMRect.left + parentDOMRect.width + selfDOMRect.width + 6 > innerWidth) {
                    newPositionStyle.right = innerWidth - parentDOMRect.left + 6;
                }
                else {
                    newPositionStyle.left = parentDOMRect.left + parentDOMRect.width + 6;
                }
                // top-bottom
                if (parentDOMRect.top - 6 + selfDOMRect.height > innerHeight) {
                    newPositionStyle.bottom = 0;
                }
                else newPositionStyle.top = parentDOMRect.top - 6;
                break;
            case 'vertical':
                // left-right
                if (parentDOMRect.left + selfDOMRect.width + 6 > innerWidth) {
                    newPositionStyle.right = innerWidth - parentDOMRect.right;
                }
                else {
                    newPositionStyle.left = parentDOMRect.left;
                }
                if (props.fixedWidth) {
                    newPositionStyle.width = parentDOMRect.width;
                } else {
                    newPositionStyle.minWidth = parentDOMRect.minWidth;
                }

                // if (parentDOMRect.top + parentDOMRect.height + selfDOMRect.height + 8 > innerHeight - 4) {
                //     newPositionStyle.bottom = innerHeight - parentDOMRect.top + 8;
                //     newPositionStyle.maxHeight = innerHeight - parentDOMRect.top - 8 - 4; // 8 flyout margin, 4 window padding
                // }
                // else {
                    newPositionStyle.top = parentDOMRect.top + parentDOMRect.height + 6;
                    newPositionStyle.maxHeight = innerHeight - parentDOMRect.bottom - 36;
                // }
                break;
            default:
        }
        setPositionStyle(newPositionStyle);
    }
    function ignoreEvent(evt: any) {
        evt.stopPropagation();
        evt.nativeEvent.stopImmediatePropagation();
    }

    function handleOnSelect(selectedItem: any) {
        if (onSelect) onSelect(selectedItem);
        closeWindow();
    }

    function defaultDropdownContent() {
        return (
            <DefaultDropdownWrapper theme={theme}>
                <DropdownMenu>
                    {data && data.map((item: any) => {
                        const itemKey = item[keyAttr] || item;
                        const itemDisplayName = item[displayAttr] || item;
                        return (
                            <DropdownItem
                                key={itemKey}
                                onClick={() => handleOnSelect(item)}
                                size={size}
                                theme={theme}
                            >
                                {itemDisplayName}
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </DefaultDropdownWrapper>
        );
    }

    const { children = defaultDropdownContent } = props;

    return selfDOM.current ?
        ReactDOM.createPortal(
            <DropdownWindow
                open={show}
                style={positionStyle}
                ref={selfDOM}
                onScroll={ignoreEvent}
                onMouseDown={ignoreEvent}
            >
                {children({ show, closeWindow, adjustPosition })}
            </DropdownWindow>,
            document.body) :
        (
            <div
                ref={selfDOM}
            />
        );
}
