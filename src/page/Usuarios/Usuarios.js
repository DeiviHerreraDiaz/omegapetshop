import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Usuarios() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/Usuarios')
            .then(res => {
                const data = res.data;
                setColumns(Object.keys(data[0]));
                setRecords(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        const conf = window.confirm("¿Estás seguro de eliminarlo?");
        if (conf) {
            axios.delete(`http://localhost:3030/Usuarios/${id}`)
                .then(() => {
                    alert("Registro eliminado :(");
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-end"><Link to="/create" className="btn btn-primary">Add +</Link></div>
            <table className="table">
                <thead>
                <tr>
                    {columns.map((c, i) => (
                        <th key={i}>{c}</th>
                    ))}
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {records.map((d, i) => (
                    <tr key={i}>
                        {Object.keys(d).map((key, j) => (
                            <td key={j}>{d[key]}</td>
                        ))}
                        <td>
                            <Link to={`/updateUsuarios/${d.id}`} className="btn btn-sm btn-success">Update</Link>
                            <button onClick={() => handleDelete(d.id)} className="btn btn-sm ms-1 btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Usuarios;
