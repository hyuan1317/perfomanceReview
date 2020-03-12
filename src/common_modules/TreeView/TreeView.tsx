import React from 'react';
import TreeViewContext from './TreeViewContext';

interface Props {
    collapseIcon?: any;
    expandIcon?: any;
    children?: any;
}

export default function (props: Props) {
    return (
        <TreeViewContext.Provider
            value={{
                collapseIcon: props.collapseIcon,
                expandIcon: props.expandIcon,
            }}
        >
            {
                React.Children.map(props.children, (child) => {
                    return React.cloneElement(child, { paddingLeft: 8 });
                })
            }
        </TreeViewContext.Provider>
    );
}
