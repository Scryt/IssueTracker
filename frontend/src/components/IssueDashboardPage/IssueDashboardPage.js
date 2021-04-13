import {useFetch} from "../../hooks/hooks";
import style from './IssueDashboardPage.module.scss'

const IssueDashboardPage = () => {
    const [data, loading] = useFetch(
        "http://localhost:8000/issues"
    );

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
                    {data.issues.map(({id, title, description, status_en}) => (
                        <div
                            key={id}
                            className={style.record}
                        >
                            <div>{title}</div>
                            <div>{description}</div>
                            <div>{status_en}</div>
                            <div className = {style.container}>
                                <button className={style.stn_button}>Edit</button>
                                <button className={style.stn_button}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IssueDashboardPage