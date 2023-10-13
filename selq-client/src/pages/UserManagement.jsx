import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  Modal,
  Spinner,
  Table,
} from 'react-bootstrap';
import {
  useUpdateUserInfo,
  useUsersQuery,
} from '../services/authHook/getUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import Pagination from '../components/common/Pagination';
import Filter from '../components/common/Filter';

export default function UsersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeletionChecked, setIsDeletionChecked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { handleSubmit, control, setValue, getValues } = useForm();
  const { token } = useAuth();
  const { data: users, refetch: refetchUsers } = useUsersQuery(
    currentPage,
    filterOptions
  );
  const {
    mutateAsync: updateUser,
    isLoading: loadingUpdateUser,
    error: errorUpdateUser,
  } = useUpdateUserInfo();

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleOptionsClick = (item, label) => {
    setFilterOptions({
      ...filterOptions,
      [label]: item,
    });
  };

  const handleDeleteOption = (label) => {
    const updatedOptions = { ...filterOptions };
    delete updatedOptions[label];
    setFilterOptions(updatedOptions);
  };

  const updateUserHandler = async (userId) => {
    const updatedInfo = {};

    const usernameValue = getValues('username');
    if (usernameValue !== '' && usernameValue !== selectedUser?.username) {
      updatedInfo.username = usernameValue;
    }

    const rolesValue = getValues('roles');
    if (rolesValue !== '' && rolesValue !== selectedUser?.roles[0]) {
      updatedInfo.roles = [rolesValue];
    }

    try {
      await updateUser({
        userId,
        updatedInfo,
        token,
      });

      refetchUsers();
    } catch (error) {
      console.error('UserInfo Update Error', error.message);
    }

    handleCloseEditModal();
  };

  const handleDelete = (userId) => {
    console.log('계정 삭제됨');
    // TODO: 계정 삭제 로직
    setIsDeletionChecked(false);
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 9;
  const displayedUsers = users?.users?.slice(startIndex, endIndex + 1);

  return (
    <>
      <h1>유저 관리페이지</h1>
      <Filter
        filterOptions={filterOptions}
        handleOptionsClick={handleOptionsClick}
        handleDeleteOption={handleDeleteOption}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center d-none d-md-table-cell'>#</th>
            <th>닉네임</th>
            <th>계정</th>
            <th className='text-center text-nowrap'>가입 날짜</th>
            <th className='text-center text-nowrap'>유저 권한</th>
            <th className='text-center text-nowrap'>가입 유형</th>
            <th className='text-center'>옵션</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers &&
            displayedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className='text-center align-middle p-0 d-none d-md-table-cell'>
                  {index + 1 + (currentPage - 1) * 10}
                </td>
                <td
                  className='align-middle d-md-none'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100px',
                  }}
                >
                  {user.username}
                </td>
                <td
                  className='align-middle  d-none d-md-table-cell'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.username}
                </td>

                <td
                  className='align-middle d-md-none'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100px',
                  }}
                >
                  {user.email}
                </td>
                <td
                  className='align-middle  d-none d-md-table-cell'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.email}
                </td>

                <td
                  className='text-center align-middle d-md-none'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100px',
                  }}
                >
                  {user.createdAt.slice(0, 10)}
                </td>
                <td
                  className='text-center align-middle  d-none d-md-table-cell'
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.createdAt.slice(0, 10)}
                </td>
                <td className='text-center align-middle'>
                  {user.roles[0] === 'admin' ? '관리자' : '유저'}
                </td>
                <td className='text-center align-middle'>
                  {user.provider === 'local' ? '로컬' : '소셜'}
                </td>
                <td className='text-center align-middle'>
                  <DropdownButton
                    id='dropdown-basic-button'
                    variant='light'
                    title={<FontAwesomeIcon icon={faEllipsis} />}
                  >
                    <Dropdown.Item onClick={() => handleShowEditModal(user)}>
                      수정
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleShowDeleteModal(user)}>
                      삭제
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className='d-flex justify-content-center'>
        <Pagination
          currentPage={currentPage}
          changePage={setCurrentPage}
          paginatinoData={users?.meta}
        />
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>계정 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(updateUserHandler)}>
            <div className='d-flex justify-content-center'>
              <Image src={selectedUser?.profileImg} roundedCircle />
            </div>

            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                placeholder={selectedUser?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>유저 이름</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedUser?.username}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>유저 등급</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedUser?.isAdmin ? '관리자' : '유저'}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>가입 날짜</Form.Label>
              <Form.Control
                type='text'
                placeholder={selectedUser?.createdAt.slice(0, 10)}
                disabled
              />
            </Form.Group>
          </Form>
          <Form.Check // prettier-ignore
            type={'checkbox'}
            onChange={() => setIsDeletionChecked(!isDeletionChecked)}
            label='계정 삭제하시면 다시 되돌리지 못합니다. 정말 삭제하시겠습니까?'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDeleteModal}>
            취소
          </Button>
          <Button
            variant='danger'
            disabled={isDeletionChecked}
            onClick={() => handleDelete(selectedUser?.id)}
          >
            계정 삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>계정 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(updateUserHandler)}>
            <div className='d-flex justify-content-center'>
              <Image
                src={selectedUser?.profileImg}
                alt={selectedUser?.profileImg}
                roundedCircle
              />
            </div>

            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type='email'
                placeholder={selectedUser?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>유저 이름</Form.Label>
              <Controller
                name='username'
                defaultValue={selectedUser?.username}
                control={control}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    type='text'
                    onChange={(e) => setValue('username', e.target.value)}
                  />
                )}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>유저 등급</Form.Label>
              <Controller
                name='roles'
                control={control}
                defaultValue={selectedUser?.roles[0]}
                render={({ field }) => (
                  <Form.Select
                    {...field}
                    aria-label='Default select example'
                    onChange={(e) => {
                      setValue('roles', e.target.value);
                    }}
                  >
                    <option value='default'>
                      {selectedUser?.roles[0] === 'admin' ? '관리자' : '유저'}
                    </option>
                    <option value='select' disabled>
                      선택해 주세요
                    </option>
                    <option value='user'>유저</option>
                    <option value='admin'>관리자</option>
                  </Form.Select>
                )}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseEditModal}>
            취소
          </Button>
          <Button
            variant='primary'
            onClick={() => updateUserHandler(selectedUser?.id)}
          >
            {loadingUpdateUser ? (
              <>
                <Spinner
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                <span className='visually-hidden'>Loading...</span>
              </>
            ) : (
              '수정하기'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
