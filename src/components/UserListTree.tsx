import React, { FC } from 'react';
import { TreeView, TreeNode } from '../common_modules/TreeView';
import { IFormatUserList } from './ReviewList';
import styled from 'styled-components';

interface Props {
    userList: IFormatUserList[];
    onSelect: (user) => void;
    closeWindow: () => void;
}

const Wrapper = styled.div`
    background-color: white;
`;

const UserListTree: FC<Props> = (props) => {
    const { userList, onSelect, closeWindow } = props;
    
    function handleOnClick(user) {
        onSelect(user);
        closeWindow();
    }
    return (
        <Wrapper>
            <TreeView>
                {
                    userList.map((team) => (
                        <TreeNode displayName={team.team} >
                            {
                                team.children.map((user) => (
                                    <TreeNode
                                        displayName={user.user}
                                        onClick={() => handleOnClick(user)}
                                    />
                                ))
                            }
                        </TreeNode>
                    ))
                }
            </TreeView>
        </Wrapper>
    )
} 

export default UserListTree;
