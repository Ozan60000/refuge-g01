import {useContext} from "react";
import {UserContext, type Utilisateur} from "../utils.ts";
import FormulaireConnexion from "../components/FormulaireConnexion.tsx";
import {Link} from "react-router";

export default function Connexion() {
    const userContext = useContext(UserContext)
    const user: Utilisateur | null | undefined = userContext?.user;

    return (
        <>
            <h1 className={"text-center"}>Page de connexion</h1>
            <p className="text-center">{user ? `Bienvenue ${user.pseudo}` : "Pas connecté"}</p>
            {!user && <FormulaireConnexion/>}
            {!user && <p className="text-center mt-3">Pas encore de compte ? <Link to="/inscription">Créer un compte</Link></p>}
            {user && <button onClick={() => userContext?.setUser(null)}>Se déconnecter</button>}
        </>
    )
}