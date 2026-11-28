import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router";
import {UserContext, type Utilisateur} from "../utils.ts";
import {mockRoles, mockUtilisateurs} from "../JeuEssai.ts";

export default function Inscription() {
    const [nom, setNom] = useState<string>("")
    const [prenom, setPrenom] = useState<string>("")
    const [mail, setMail] = useState<string>("")
    const [mdp, setMdp] = useState<string>("")
    const [mdp2, setMdp2] = useState<string>("")
    const [erreur, setErreur] = useState<string>("")
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const inscrire = () => {
        // Vérifications simples avant de créer le compte
        if (nom == "" || prenom == "" || mail == "" || mdp == "") {
            setErreur("Tous les champs sont obligatoires.")
            return
        }
        if (mdp.length < 8) {
            setErreur("Le mot de passe doit faire au moins 8 caractères.")
            return
        }
        if (mdp != mdp2) {
            setErreur("Les deux mots de passe ne sont pas identiques.")
            return
        }
        if (mockUtilisateurs.find(u => u.email == mail)) {
            setErreur("Un compte existe déjà avec cette adresse mail.")
            return
        }

        // Pour l'instant on ajoute le compte dans le jeu d'essai
        // TODO : envoyer le compte à l'API PHP quand elle sera prête
        const nouvelUtilisateur: Utilisateur = {
            id: mockUtilisateurs.length + 1,
            nom: nom,
            prenom: prenom,
            pseudo: prenom.toLowerCase(),
            email: mail,
            tel: "",
            mdp: mdp,
            Role: mockRoles[0], // CITOYEN
        }
        mockUtilisateurs.push(nouvelUtilisateur)

        context?.setUser(nouvelUtilisateur)
        navigate("/")
    }

    return (
        <>
            <h1 className="text-center">Créer un compte</h1>
            <form className="mt-4 d-flex flex-column justify-content-center" onSubmit={e => {
                e.preventDefault();
                inscrire();
            }}>
                <input className="m-2" type="text" placeholder="Nom" value={nom}
                       onChange={e => setNom(e.target.value)}/>
                <input className="m-2" type="text" placeholder="Prénom" value={prenom}
                       onChange={e => setPrenom(e.target.value)}/>
                <input className="m-2" type="email" placeholder="Mail" value={mail}
                       onChange={e => setMail(e.target.value)}/>
                <input className="m-2" type="password" placeholder="Mot de passe (8 caractères minimum)" value={mdp}
                       onChange={e => setMdp(e.target.value)}/>
                <input className="m-2" type="password" placeholder="Confirmer le mot de passe" value={mdp2}
                       onChange={e => setMdp2(e.target.value)}/>
                {erreur != "" && <p className="text-center text-danger">{erreur}</p>}
                <button>Créer mon compte</button>
            </form>
            <p className="text-center mt-3">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
        </>
    )
}
