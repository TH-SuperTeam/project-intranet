import { TargetAudience } from "../../types/TargetAudience";
import styles from "./CreateNews.module.css";

const CreateNews = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Skapa en nyhet</h1>

            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="title">
                        Titel:
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        name="title"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="content">
                        Innehåll:
                    </label>
                    <textarea
                        className={styles.textarea}
                        id="content"
                        name="content"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="targetAudience">
                        Målgrupp:
                    </label>
                    <select
                        className={styles.select}
                        id="targetAudience"
                        name="targetAudience"
                    >
                        <option value={TargetAudience.STUDENT}>Student</option>
                        <option value={TargetAudience.TEACHER}>Lärare</option>
                        <option value={TargetAudience.ALL}>Alla</option>
                    </select>
                </div>

                <button className={styles.submitButton} type="submit">
                    Publicera
                </button>
            </form>
        </div>
    );
};

export default CreateNews;
