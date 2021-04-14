import {useState} from "react";
import {useFetch} from "../../hooks/hooks";
import {useHistory} from 'react-router-dom'

const IssuePage = (props) => {
    const history = useHistory();

    const [data, loading] = useFetch(
        "http://localhost:8000/statuses"
    );

    let issueObject = {
        title: '',
        description: '',
        statusTag: 'OPEN'
    };

    if (history.location.state) {
        issueObject = {
            id: history.location.state.id,
            title: history.location.state.title,
            description: history.location.state.description,
            statusTag: history.location.state.statusTag
        }
    }

    let [inputs, setInputs] = useState(issueObject);
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        if (inputs.id) {
            fetch('http://localhost:8000/updateIssue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
        } else {
            fetch('http://localhost:8000/addIssue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
        }

        setInputs(inputs => ({
            title: '',
            description: '',
            statusTag: 'OPEN'
        }));
        history.push('/')
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
                        name="statusTag"
                        value={inputs.statusTag}
                        onChange={handleInputChange}
                    >
                        {data.issues.map(({id, tag, status_en}) => {
                            //TODO fix allowance of status addition
                            if(inputs.statusTag !== "PENDING" && inputs.statusTag !== "OPEN") {

                            } else if (inputs.statusTag === "CLOSED") {

                            }

                            return (
                                <option
                                    key={id}
                                    value={tag}
                                >
                                    {status_en}
                                </option>
                            )
                        })}
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
