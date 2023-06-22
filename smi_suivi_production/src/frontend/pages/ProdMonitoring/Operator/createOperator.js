import "./createOperator.css"
import "./modifyDeleteOperator"

function CreateOperator ({formState, setFormState}) {
    
    function postOperator (e) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)

        if (formData.get("name") === "") {
            alert("Veuillez renseigner le nom")
            } else if (formData.get("firstname") === "") {
                alert("Veuillez renseigner le prénom")
                } else {
                    fetch("http://localhost:3000/api/operator", {method: form.method, body: formData})
                        .then(res => res.json())
                        .then(res => alert(res))
                        .then(() => setFormState(formState+1))
                        .catch(error => alert("Erreur : " + error))
                }
        form.reset()
    }

    return (
        <div className="createOperator">
            <h1 className="titleOperator">Ajouter un(e) opérateur/trice</h1>
            <form name="createOperatorForm" method="post" encType="multipart/form-data" onSubmit={postOperator} className="formOperator">
                <label>Prénom : <input className="formElement" type="text" name="firstname" /></label>
                <label>Nom : <input className="formElement" type="text" name="name" /></label>
                <label>Type de contrat : 
                    <select className="formElement" name="contract">
                        <option value="Permanent">Permanent</option>
                        <option value="Interim">Interim</option>
                        <option value="ESAT">ESAT</option>
                    </select>
                </label>
                <button className="btnCreateOperator" type="submit">Ajouter à la base de données</button>
            </form>
        </div>
    )
}

export default CreateOperator