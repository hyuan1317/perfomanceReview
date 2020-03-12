import React from 'react';

export default React.createContext<any>({
    theme: 'light',
    size: 'md',
    error: false,
    show: false,
    disabled: false,
    setShow: (status: boolean) => { },
    closeWindow: () => {},
    onSelect: (selectedItem: any) => { },
    direction: '',
    data: [],
    displayAttr: 'name',
    keyAttr: 'id',
});
