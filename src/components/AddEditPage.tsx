import React, { useState, FC, MouseEvent  } from 'react';
import styled from 'styled-components';
import { IEvent } from './ReviewList';
import Dropdown, { DropdownBox, DropdownWindow } from '../common_modules/Dropdown/Dropdown';
import { TreeView, TreeNode } from '../common_modules/TreeView';
import Button from '@material-ui/core/Button';

interface Props {
  event: IEvent;
  onClose: () => void;
}
const MaskBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  z-index: 20;
`;
const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  padding: 2rem;
  border-radius: 8px;

  background-color: white;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 2px 2px rgba(0,0,0,0.1);
`;
const DropdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 2rem;
`;
const DropdownBlock = styled.div`
  margin-left: 2rem;
  width: 150px;
  &:first-child {
    margin-left: 0;
  }
`;
const Title = styled.div`
  margin-bottom: 0.25rem;

  font-size: 16px;
  line-height: 1.5;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #222222;

  background-color: white;
`;
const ButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const optionList = require('./optionList.json');
interface IItem {
  id: string;
  name: string;
}
interface UserItem {
  user: string;
  team: string;
}

const AddEditPage: FC<Props> = (props) => {
  const {
    event: {
      name,
      userInfo,
    }
  } = props;
  const [localUserInfo, setLocalUserInfo] = useState<IEvent['userInfo']>(userInfo);

  function handleUserSelect(item: UserItem) {
    setLocalUserInfo({
      ...localUserInfo,
      tuser: item.user,
      team: item.team,
    });
  }
  function handleContribution(item: IItem) {
    setLocalUserInfo({
      ...localUserInfo,
      contribution: item.name,
    });
  }
  function handleCommitment(item: IItem) {
    setLocalUserInfo({
      ...localUserInfo,
      commitment: item.name,
    });
  }
  function handlePotential(item: IItem) {
    setLocalUserInfo({
      ...localUserInfo,
      potential: item.name,
    });
  }
  function handleOnFeedbackChange(e: MouseEvent) {
    setLocalUserInfo({
      ...localUserInfo,
      feedback: e.target.value,
    });
  }
  return (
    <MaskBackground>
      <Wrapper>
        <DropdownRow>
          <DropdownBlock>
            <Title>Target User</Title>
            <Dropdown data={optionList} onSelect={handleUserSelect}>
              <DropdownBox title={localUserInfo.tuser} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
          <DropdownBlock>
            <Title>Contribution</Title>
            <Dropdown data={optionList} onSelect={handleContribution}>
              <DropdownBox title={localUserInfo.contribution} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
          <DropdownBlock>
            <Title>Commitment</Title>
            <Dropdown data={optionList} onSelect={handleCommitment}>
              <DropdownBox title={localUserInfo.commitment} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
          <DropdownBlock>
            <Title>Potential</Title>
            <Dropdown data={optionList} onSelect={handlePotential}>
              <DropdownBox title={localUserInfo.potential} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
        </DropdownRow>
        <Textarea placeholder="Please enter your feedback to this member here" onChange={handleOnFeedbackChange}/>
        <ButtonContainer>
          <Button variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="contained" style={{ marginLeft: '2rem' }} onClick={props.onClose}>
            Cancel
          </Button>
        </ButtonContainer>
      </Wrapper>
    </MaskBackground>
  )
}

export default AddEditPage;
