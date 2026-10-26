import { TargetAudience } from "../types/TargetAudience";

const CreateNews = () => {
    return (
        <div>
            <h1>Skapa en nyhet</h1>
            <form>
                <label htmlFor="title">Titel:</label>
                <input type="text" id="title" name="title" />

                <label htmlFor="content">Innehåll:</label>
                <textarea id="content" name="content"></textarea>

                <label htmlFor="targetAudience">Målgrupp:</label>
                <select id="targetAudience" name="targetAudience">
                    <option value={TargetAudience.STUDENT}>Student</option>
                    <option value={TargetAudience.TEACHER}>Lärare</option>
                    <option value={TargetAudience.ALL}>Alla</option>
                </select>

                <button type="submit">Publicera</button>
            </form>
        </div>
    );
};

export default CreateNews;
