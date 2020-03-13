import React, { useState, FC, ChangeEvent  } from 'react';
import styled from 'styled-components';
import { IEvent, IFormatUserList } from './ReviewList';
import Dropdown, { DropdownBox, DropdownWindow } from '../common_modules/Dropdown/Dropdown';
import Button from '@material-ui/core/Button';
import reviewService from '../services/reviewService';
import UserListTree from './UserListTree';

interface Props {
  userList: IFormatUserList[];
  event: IEvent;
  onClose: () => void;
  refreshPage: () => void;
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
const Textarea = styled.textarea<{ error: boolean }>`
  width: 100%;
  height: 50px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.error ? 'var(--danger)' : '#222222'};

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
interface IError {
  tuser: boolean;
  feedback: boolean;
};

const AddEditPage: FC<Props> = (props) => {
  const {
    event: {
      name: eventName,
      userInfo,
    },
    userList,
  } = props;
  const [localUserInfo, setLocalUserInfo] = useState<IEvent['userInfo']>(userInfo);
  const [errors, setErrors] = useState<IError>({ tuser: false, feedback: false });

  function handleUserSelect(item: UserItem) {
    setLocalUserInfo({
      ...localUserInfo,
      tuser: item.user,
      team: item.team,
    });
    validate();
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
  function handleOnFeedbackChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setLocalUserInfo({
      ...localUserInfo,
      feedback: e.target.value,
    });
  }
  function handleSubimit() {
    switch (eventName) {
      case 'Edit':
        if (validate()) {
          reviewService.updateUserReview(localUserInfo)
            .then(responsedata => {
              props.onClose();
              props.refreshPage();
            })
            .catch(err => console.log(err));
        }
        break;
      case 'Add':
        if (validate()) {
          reviewService.addUserReview(localUserInfo)
            .then(responsedata => {
              props.onClose();
              props.refreshPage();
            })
            .catch(err => console.log(err));
        }
        break;
      default:
    }
  }
  function validate(): boolean {
    const { tuser, team, contribution, commitment, potential, feedback } = localUserInfo;
    const newErrors: IError = { tuser: false, feedback: false };
    newErrors.tuser = !tuser;
    newErrors.feedback = !feedback.trim();
    const isValid = Object.values(newErrors).every(attr => !attr); // every attribut is false: no error
    setErrors(newErrors);
    return isValid;
  }
  return (
    <MaskBackground>
      <Wrapper>
        <DropdownRow>
          <DropdownBlock>
            <Title>Target User</Title>
            <Dropdown 
              size="lg" 
              data={optionList} 
              error={errors.tuser}
              onSelect={handleUserSelect}
            >
              <DropdownBox title={localUserInfo.tuser} theme="plain" />
              <DropdownWindow>
                {
                  ({ closeWindow }) => (
                    <UserListTree userList={userList} onSelect={handleUserSelect} closeWindow={closeWindow} />
                  )
                }
              </DropdownWindow>
            </Dropdown>
          </DropdownBlock>
          <DropdownBlock>
            <Title>Contribution</Title>
            <Dropdown size="lg" data={optionList} onSelect={handleContribution}>
              <DropdownBox title={localUserInfo.contribution} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
          <DropdownBlock>
            <Title>Commitment</Title>
            <Dropdown size="lg" data={optionList} onSelect={handleCommitment}>
              <DropdownBox title={localUserInfo.commitment} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
          <DropdownBlock>
            <Title>Potential</Title>
            <Dropdown size="lg" data={optionList} onSelect={handlePotential}>
              <DropdownBox title={localUserInfo.potential} theme="plain" />
              <DropdownWindow />
            </Dropdown>
          </DropdownBlock>
        </DropdownRow>
        <Textarea 
          placeholder="Please enter your feedback to this member here" 
          onChange={handleOnFeedbackChange}
          value={localUserInfo.feedback}
          error={errors.feedback}
          onBlur={validate}
        />
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={handleSubimit}>
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
