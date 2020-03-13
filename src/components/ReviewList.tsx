import React, { useState, useEffect, FC, forwardRef } from 'react';
import styled from 'styled-components';
import reviewService, { IUserInfo, IUserList } from '../services/reviewService';
import MaterialTable, { MTableToolbar } from 'material-table';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';
import AddEditPage from './AddEditPage';
import './ReviewList.css';

const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export interface IEvent {
  name: 'Edit' | 'Add' | '';
  userInfo: IUserInfo;
}
export interface IFormatUserList {
  team: string;
  children: IUser[];
}

interface IUser {
  user: string;
  team: string;
}

const Wrapper = styled.div`
  padding: 10% 5%;
`;

const TableColumns = [
  { title: 'Team', field: 'team' },
  { title: 'Member', field: 'tuser' },
  { title: 'Contribution', field: 'contribution' },
  { title: 'Commitment', field: 'commitment' },
  { title: 'Potential', field: 'potential' },
  { title: 'Feedback', field: 'feedback' },
  { title: 'UpdateTime', field: 'updateTime' },
];

const AddIconContainer = styled.div`
  text-align: left;
  padding-left: 2rem;
  margin-bottom: 1rem;
`;

const defaultUserInfo = {
  tuser: '',
  team: '',
  contribution: 'Excellent',
  commitment: 'Excellent',
  potential: 'Excellent',
  feedback: '',
  updateTime: '',
}

const parseUserList = (userList: IUserList): IFormatUserList[] => {
  const result: IFormatUserList[] = [];
  Object.keys(userList).forEach(team => {
    result.push({
      team,
      children: userList[team].map(user => ({ user, team }))
    });
  });
  return result;
}

const ReviewList: FC = () => {
  const [userList, setUserList] = useState<IFormatUserList[]>([]);
  const [historyReview, setHistoryReview] = useState<IUserInfo[]>([]);
  const [showAddEditPage, setShowAddEditPage] = useState<boolean>(false);
  const [event, setEvent] = useState<IEvent>({
    name: '',
    userInfo: {
      tuser: '',
      team: '',
      contribution: '',
      commitment: '',
      potential: '',
      feedback: '',
      updateTime: '',
    }
  });


  useEffect(() => {
    updateHistoryReview();
  }, []);
  useEffect(() => {
    reviewService.getFakeUserList()
      .then(responseData => {
        setUserList(parseUserList(responseData));
      });
  }, []);

  function updateHistoryReview() {
    reviewService.getFakeHistoryReview()
      .then(setHistoryReview);
  }

  function handleDeleteUserReview(rowData: any) {
    // todo
  }
  function handleEditUserReview(rowData: any) {
    const { tableData, updateTime, ...userInfo } = rowData;
    setEvent({
      name: 'Edit',
      userInfo,
    });
    setShowAddEditPage(true);
  }
  function handleAddUserReview() {
    setEvent({
      name: 'Add',
      userInfo: defaultUserInfo,
    });
    setShowAddEditPage(true);
  }
  function handleCloseAddEditPage() {
    setShowAddEditPage(false);
    setEvent({
      ...event,
      name: '',
    });
  }

  return (
    <Wrapper>
      <MaterialTable
        title="History Review"
        columns={TableColumns}
        data={historyReview}
        icons={tableIcons}
        actions={[
          {
            icon: () => <Edit />,
            tooltip: 'Edit User',
            onClick: (event, rowData) => {
              handleEditUserReview(rowData);
            }
          },
          {
            icon: () => <DeleteForever />,
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              handleDeleteUserReview(rowData);
            }
          },
        ]}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <AddIconContainer>
                <Button variant="contained" color="primary" onClick={handleAddUserReview}>
                  Add User
                </Button>
              </AddIconContainer>
            </div>
          ),
        }}
      />
      {
        showAddEditPage &&
        <AddEditPage 
          userList={userList}
          event={event} 
          onClose={handleCloseAddEditPage} 
          refreshPage={updateHistoryReview} 
        />
      }
    </Wrapper>
  );
}

export default ReviewList;
