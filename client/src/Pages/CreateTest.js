import React from 'react';
import {ErrorMessage, Field, FieldArray, Form, Formik} from "formik";
import {Switch, TextField} from "formik-mui";
import {Button, Card, Divider, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import {useAxios} from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";


const ValidationSchema = Yup.object().shape({
    question: Yup.string()
        .required('Required'),
    bundle: Yup.string()
        .required('Required'),
});

const initialValues = {
    question: '',
    bundle: '',
    answers: [
        {
            content: '',
            correct: false,
        },
    ],
};

const CreateTest = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    return (
        <div style={{textAlign: 'center', width: '40%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Typography variant="h4">Create Test</Typography>
            <br/>
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={async (values) => {
                    console.log(values);
                    try {
                        const response = !!axiosInstance.current && await axiosInstance.current.post('/api/quizzes/', values);
                        toast(`Test created successfully!`);
                        navigate('/view-tests');
                    } catch (e) {
                        console.log(e);
                    }

                }}
            >
                {({ values }) => (
                    <Form>
                        <Field
                            component={TextField}
                            label="Question"
                            name="question"
                            variant="outlined"
                            fullWidth
                        />
                        <br/>
                        <br/>
                        <Field
                            component={TextField}
                            label="Bundle"
                            name="bundle"
                            variant="outlined"
                            fullWidth
                        />
                        <br/>
                        <br/>
                        <FieldArray name="answers">
                            {({ insert, remove, push }) => (
                                <div>
                                    <Typography variant="subtitle1">Possible Answers:
                                        <IconButton
                                            variant="contained"
                                            onClick={() => push({
                                                content: '',
                                                correct: false,
                                            })}
                                        >
                                            <AddIcon style={{fontSize: "32px"}} />
                                        </IconButton>
                                    </Typography>
                                    {values.answers.length > 0 &&
                                        values.answers.map((friend, index) => (
                                            <div key={index}>
                                                <Field
                                                    component={TextField}
                                                    label="Answer"
                                                    name={`answers.${index}.content`}
                                                    variant="outlined"
                                                />
                                                <br/>
                                                <Typography variant="sub1" style={{marginLeft: '10px', marginRight: '10px'}}>
                                                    Is correct?
                                                    <Field component={Switch} type="checkbox" name={`answers.${index}.correct`} />
                                                </Typography>
                                                <IconButton
                                                    type="button"
                                                    variant="contained"
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteIcon style={{fontSize: "40px", color: "red"}} />
                                                </IconButton>
                                                <br/><br/>
                                                <Divider />
                                                <br/>
                                            </div>
                                        ))}

                                </div>
                            )}
                        </FieldArray>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default CreateTest;