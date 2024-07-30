import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../features/students/StudentsSlice";
import { Container, Grid, CircularProgress, Button } from "@mui/material";
import StudentModal from "../components/StudentModal";
import StudentTable from "../components/StudentTable";
import Filter from "../components/Filter";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    group: "React-11",
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (selected === null) {
      dispatch(addStudent(form));
    } else {
      dispatch(updateStudent({ ...form, id: selected }));
    }
    setForm({
      firstName: "",
      lastName: "",
      group: "React-11",
    });
    setSelected(null);
    setShowModal(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setSelected(student.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-5">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Student Management</h1>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowModal(true)}
          >
            Add Student
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Filter />
        </Grid>
        <Grid item xs={12}>
          <StudentTable
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>
      <StudentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        selected={selected}
      />
    </Container>
  );
};

export default StudentsTable;
