import {useState} from "react";
import {useFetch} from "../../hooks/hooks";
// import style from './IssuePage.module.scss'

const IssuePage = () => {
    const [data, loading] = useFetch(
        "http://localhost:8000/statuses"
    );

    let [inputs, setInputs] = useState({
        title: '',
        description: '',
        status: 'OPEN'
    });

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        fetch('http://localhost:8000/addIssue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })

        setInputs(inputs => ({
            title: '',
            description: '',
            status: 'OPEN'
        }));
    };

    return (
        <div>
            <form className='register-form' onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleInputChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    value={inputs.description}
                    onChange={handleInputChange}
                    required
                />
                {loading ? (
                    "Loading..."
                ) : (
                    <select
                        name="status"
                        value={inputs.status}
                        onChange={handleInputChange}
                    >
                        {data.issues.map(({id, tag, status_en}) => (
                            <option
                                key={id}
                                value={tag}
                            >
                                {status_en}
                            </option>
                        ))}
                    </select>
                )}
                <button className="form-field" type="submit">
                    Add
                </button>
            </form>

        </div>
    );
};

export default IssuePage