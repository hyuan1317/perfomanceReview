import styled from 'styled-components';

export default styled.div`
    overflow: auto;
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #bbb;
    }
    scrollbar-width: thin;
    scrollbar-color: var(--grey-blue) transparent;
`;
