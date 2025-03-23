import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../services/API';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton, Menu, MenuItem } from '@mui/material';

const UserPage = () => {
  const api = new API();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get_users();
      if (Array.isArray(response)) {
        // Map data to exclude passwordHash and sessionKey
        const filteredData = response.map(({ passwordHash, sessionKey, ...rest }) => rest);
        setData(filteredData);
      }
    }
    fetchUsers();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openRowId, setOpenRowId] = useState(null);

  const handleClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setOpenRowId(rowId);
    // navigate(`/edit-user-role/${rowId}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenRowId(null);
  };

  const columns = [
    { name: 'S.No.', selector: (row, index) => index + 1 ,width:"70px"},
    { name: 'Full Name', selector: row => row.fullName, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Gender', selector: row => row.gender, sortable: true },
    { name: 'Height (cm)', selector: row => row.height, sortable: true },
    { name: 'Weight (kg)', selector: row => row.weight, sortable: true },
    { name: 'Created At', selector: row => new Date(row.createdAt).toLocaleString(), sortable: true },
    {
      name: 'Action',
      cell: row => (
        <>
          <IconButton onClick={(event) => handleClick(event, row.userId)} color="inherit">
            <EditNoteIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={openRowId === row.userId}
            onClose={handleClose}
            PaperProps={{ style: { width: 120 } }}
          >
            <MenuItem onClick={() => { handleEditClick(row.userId); handleClose(); }}>
              Edit
            </MenuItem>
          </Menu>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      // width: "100px"
    }
  ];

  const handleCreateClick = () => {
    navigate("/register");
  };

  const handleEditClick = (userId) => {
    navigate(`/edit-user-role/${userId}`);
  };

  return (
    <div className='basic' style={{ position: "relative", marginTop: "40px" }}>
      <Container className='role-container' style={{ width: "100%" }}>
        <DataTable
          className="data-table-container"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={{
            headCells: {
              style: { backgroundColor: "#444749", color: "#ffffff", fontSize: "15px", fontWeight: "bold" },
            },
            cells: { style: { border: "0.4px solid #e0e0e0" } },
            pagination: { style: { fontSize: "12px", padding: "10px", justifyContent: "flex-end" } },
          }}
        />
      </Container>

      <Button
        variant="dark"
        onClick={handleCreateClick}
        className="user-page-create-btn"
        size="sm"
        style={{ backgroundColor: '#444749', borderColor: '#444749' }}
      >
        Create
      </Button>
    </div>
  );
};

export default UserPage;
