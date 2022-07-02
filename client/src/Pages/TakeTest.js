import React, {useEffect} from 'react';
import {Button, Card, Typography} from "@mui/material";
import {useAxios} from "../utils/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {shuffle} from "../utils/shuffle";
import {Field, Form, Formik} from "formik";
import {useKeycloak} from "@react-keycloak/web";

const TakeTest = () => {
    const { keycloak, initialized } = useKeycloak();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const params = useParams();

    const [test, setTest] = React.useState([]);


    const fetchData = () => {
        !!axiosInstance.current && axiosInstance.current.get('/api/quizzes/')
            .then((response) => {
                if(params?.bundle) {
                    setTest(shuffle(response.data.filter(t => t.bundle === params.bundle)));
                }
                else
                {
                    setTest(shuffle(response.data));
                }
            })
            .catch((e) => {
                toast.error(`Error: ${e.message}`);
                console.log(e);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{textAlign: 'center'}}>
            <Typography variant="h4">Take Test</Typography>
            <Formik
                initialValues={{}}
                onSubmit={async (values, { resetForm }) => {
                    let correct = 0;
                    for (const [key, value] of Object.entries(values)) {
                        if(test.filter(t => t._id === key)[0].answers.filter(v => v.content === value[0])[0].correct) correct += 1;
                    }
                    try {
                        const send = {
                            user: keycloak.tokenParsed.preferred_username,
                            score: correct,
                            numOfQuestions: test.length,
                            bundles: [...new Set(test.map(t => t.bundle))]
                        }
                        !!axiosInstance.current && await axiosInstance.current.post('/api/scores/', send);
                    } catch (e) {
                        console.log(e);
                    }
                    navigate('/');
                    toast(`You got ${correct} correct!`);
                    resetForm();
                }}
            >
                {({ values }) => (
                    <Form>
                        {test.map((e, index) => (
                                <Card style={{width: '400px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10px', textAlign: 'left'}} key={index}>
                                    <Typography variant="h6">Question: {e.question}</Typography>
                                    <Typography variant="h6">Select the correct answer:</Typography>
                                    {e.answers.map((a) => (
                                        <div key={a.content}>
                                            <label>
                                            <Field type="checkbox" name={e._id} value={a.content} />
                                                {a.content}
                                            </label>
                                            <br/>
                                        </div>
                                    ))}
                                </Card>
                            ))}
                        <Button variant="contained" type="submit">Submit</Button>
                    </Form>
                    )}
                </Formik>
        </div>
    );
};

export default TakeTest;