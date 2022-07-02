import React, {useEffect} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import {useAxios} from "../utils/useAxios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Button, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";

const columns = [
    { field: 'user', headerName: 'User', flex: 1 },
    { field: 'score', headerName: 'Score', flex: 1 },
    { field: 'numOfQuestions', headerName: 'Number of Questions', flex: 1 },
    {
        field: 'bundles',
        headerName: 'Bundles Tested',
        sortable: false,
        flex: 1.5,
        valueGetter: (params) =>
            params.row.bundles.join(', ')
    },
];

const Home = () => {
    const { keycloak, initialized } = useKeycloak();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = React.useState([]);
    const [scores, setScores] = React.useState([]);

    const fetchData = () => {
        !!axiosInstance.current && axiosInstance.current.get('/api/quizzes/')
            .then((response) => {
                setQuizzes(response.data);
            })
            .catch((e) => {
                toast.error(`Error: ${e.message}`);
                console.log(e);
            });
        !!axiosInstance.current && axiosInstance.current.get('/api/scores/')
            .then((response) => {
                setScores(response.data);
            })
            .catch((e) => {
                toast.error(`Error: ${e.message}`);
                console.log(e);
            });
    }

    useEffect(() => {
        if(initialized && keycloak.authenticated) fetchData();
    }, [initialized]);

    if(!initialized) return(<></>);
    if(!keycloak.authenticated) return(
        <div style={{textAlign: 'center'}}>
            <Typography variant="h4">
                Please login to access this application
            </Typography>
            <br/>
            <br/>
            <Button
                variant="contained"
                onClick={() => keycloak.login()}
            >
                Login
            </Button>
        </div>
    );
    return (
        <div style={{textAlign: 'center'}}>
            {keycloak.hasResourceRole("user") ?
                <>
                    <Button variant="contained" onClick={() => navigate('/take-test/')}>Take Full Test</Button>
                    <br/>
                    <br/>
                    {
                        [...new Set(quizzes.map(t => t.bundle))].map(bundle => (
                            <>
                                <Button variant="contained" onClick={() => navigate(`/take-test/${bundle}`)}>Take Test: {bundle}</Button>
                                <br/>
                                <br/>
                            </>
                        ))
                    }
                </>
                :
                <>
                    <Button variant="contained" onClick={() => navigate('/create-test')}>Create Test</Button>
                    <br/>
                    <br/>
                    <Button variant="contained" onClick={() => navigate('/view-tests')}>View Tests</Button>
                    <br/>
                    <br/>
                </>
            }
            <div style={{ height: 300, width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <DataGrid
                    rows={keycloak.hasResourceRole("admin") ? scores : scores.filter(s => s.user === keycloak.tokenParsed.preferred_username)}
                    columns={columns}
                    getRowId={(row) => row._id} autoPageSize density="compact"
                />
            </div>
        </div>
    );
};

export default Home;