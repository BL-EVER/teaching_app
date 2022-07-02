import React, {useEffect} from 'react';
import {IconButton, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useAxios} from "../utils/useAxios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";



const ViewTests = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [data, setData] = React.useState([]);

    const fetchData = () => {
        !!axiosInstance.current && axiosInstance.current.get('/api/quizzes/')
        .then((response) => {
            setData(response.data);
        })
        .catch((e) => {
            toast.error(`Error: ${e.message}`);
            console.log(e);
        });}

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { field: 'bundle', headerName: 'Bundle', flex: 1 },
        { field: 'question', headerName: 'Question', flex: 3 },
        {
            field: 'answers',
            headerName: 'Answers',
            sortable: false,
            flex: 3,
            valueGetter: (params) =>
                params.row.answers.map((a) => `${a.content}: ${a.correct ? "Correct" : "Wrong"}`).join(', ')
        },
        {
            field: '_id',
            headerName: 'Actions',
            sortable: false,
            flex: 1,
            renderCell: (params) =>
                <IconButton
                    type="button"
                    variant="contained"
                    onClick={() => {
                        return !!axiosInstance.current && axiosInstance.current.delete(`/api/quizzes/${params.row._id}`).then(() => {
                            fetchData();
                            toast(`Test deleted successfully!`);
                        }).catch((e) => {
                            toast.error(`Error: ${e.message}`);
                            console.log(e);
                        });
                    }}
                >
                    <DeleteIcon style={{fontSize: "32px", color: "red"}} />
                </IconButton>
        },
    ];

    return (
        <div style={{textAlign: 'center'}}>
            <Typography variant="h4">
                View Tests
                <IconButton
                    variant="contained"
                    onClick={() => navigate('/create-test')}
                >
                    <AddIcon style={{fontSize: "32px"}} />
                </IconButton>
            </Typography>
            <br />
            <div style={{ height: 500, width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row._id} autoPageSize density="compact"
                />
            </div>
        </div>
    );
};

export default ViewTests;