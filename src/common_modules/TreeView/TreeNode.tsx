import React, { useState, useContext } from 'react';
import TreeViewContext from './TreeViewContext';
import styled from 'styled-components';

interface Props {
    displayName: string;
    children?: any;
    onClick?: () => void;

    paddingLeft: number;
}

interface TreeNodeStyleProps {
    paddingLeft: number;
}
const TreeNodeStyle = styled.div`
    display: flex;
    align-items: center;
    height: 28px;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    &:hover {
        background-color: rgba(115, 166, 63, 0.1);
    }
    padding-left: ${(props: TreeNodeStyleProps) => props.paddingLeft}px;
    padding-right: .5rem;
`;
const NodeName = styled.div`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const EmptyIcon = styled.div`
    width: 16px;
    height: 16px;
    margin-right: 6px;
`;
const DefaultIconContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 6px;
    > i {
        font-size: 16px;
        &:before {
            width: auto;
        }
    }
`;

function TreeNode(props: Props) {
    const [isExpanding, setIsExpanding] = useState(false);
    const { collapseIcon, expandIcon } = useContext(TreeViewContext);
    const defaultCollapseIcon = (
        <DefaultIconContainer onClick={() => handleOnToggle()}>
            <i className="icon-expand_4" />
        </DefaultIconContainer>
    );
    const defaultExpandIcon = (
        <DefaultIconContainer onClick={() => handleOnToggle()}>
            <i className="icon-collapse_4" />
        </DefaultIconContainer>
    );
    function generateToggleIcon() {
        if (props.children) {
            return isExpanding ? (expandIcon || defaultExpandIcon) : (collapseIcon || defaultCollapseIcon);

        }

        else return <EmptyIcon />;
    }
    function handleOnNodeClick() {
        if (props.onClick) props.onClick();
    }
    function handleOnToggle() {
        setIsExpanding(!isExpanding)
    }
    return (
        <>
            <TreeNodeStyle paddingLeft={props.paddingLeft} title={props.displayName}>
                {
                    generateToggleIcon()
                }
                <NodeName onClick={handleOnNodeClick}> {props.displayName} </NodeName>
            </TreeNodeStyle>
            {
                isExpanding &&
                React.Children.map(props.children, (child) => {
                    return React.cloneElement(child, { paddingLeft: props.paddingLeft + 16 });
                })
            }
        </>
    );
}

export default TreeNode;
