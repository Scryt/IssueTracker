import {useFetch} from "../../hooks/hooks";
import style from './IssueDashboardPage.module.scss'
import { useHistory } from 'react-router-dom'
import React from "react";

const IssueDashboardPage = () => {
    let history = useHistory();

    const [data, loading] = useFetch(
        "http://localhost:8000/issues"
    );

    const removeIssue = (event) => {
        fetch('http://localhost:8000/removeIssue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"id": event.target.getAttribute('issue-id')})
        })

        window.location.reload(false);
    }

    const editIssue = (event) => {
        let issueId = event.target.getAttribute('issue-id');
        let title = event.target.getAttribute('issue-title');
        let description = event.target.getAttribute('issue-description');
        let statusTag = event.target.getAttribute('issue-status-tag');
        let statusEn = event.target.getAttribute('issue-status-en');

        history.push('/create', {
            'id': issueId,
            'title': title,
            'description': description,
            'statusTag': statusTag,
            'statusEn': statusEn
        });
    }

    return (
        <div>
            {loading ? (
                "Loading..."
            ) : (
                <div>
                    <div className={style.row}>
                        <h2>Title </h2>
                        <h2>Description</h2>
                        <h2>Status</h2>
                        <h2>Options</h2>
                    </div>
                    {/*TODO move to a separated component*/}
                    {data.issues.map(({id, title, description, status_en, status_tag}) => (
                        <div
                            key={id}
                            className={style.record}
                        >
                            <div>{title}</div>
                            <div>{description}</div>
                            <div>{status_en}</div>
                            <div className = {style.container}>
                                <button
                                    issue-id={id}
                                    issue-title={title}
                                    issue-description={description}
                                    issue-status-tag={status_tag}
                                    issue-status-en={status_en}
                                    className={style.stn_button}
                                    onClick={editIssue}
                                >
                                    Edit
                                </button>
                                <button
                                    issue-id={id}
                                    className={style.stn_button}
                                    onClick={removeIssue}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IssueDashboardPage