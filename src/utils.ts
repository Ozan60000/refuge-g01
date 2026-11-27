import type {LatLngExpression} from "leaflet";
import {createContext} from "react";
import iconeAlerte from "./assets/icones/alerte.svg";
import iconeAnimaux from "./assets/icones/animaux.svg";
import iconeHorloge from "./assets/icones/horloge.svg";
import iconePlaces from "./assets/icones/places.svg";
import iconePmr from "./assets/icones/pmr.svg";
import iconePosition from "./assets/icones/position.svg";
import iconeRestauration from "./assets/icones/restauration.svg";
import iconeSanitaires from "./assets/icones/sanitaires.svg";

export type StatutCentre = "Ouvert" | "Fermé" | "Complet"

// Les icônes sont importées pour que Vite les trouve aussi après le build
export const images = {
    alerte: iconeAlerte,
    animaux: iconeAnimaux,
    horloge: iconeHorloge,
    places: iconePlaces,
    pmr: iconePmr,
    position: iconePosition,
    restauration: iconeRestauration,
    sanitaires: iconeSanitaires,
}

export type Commune = {
    id: number;
    nom: string;
    code_insee: number; // TODO : A voir entre le type number et string
    position: LatLngExpression;
}

export type Role = {
    id: number;
    libelle: string;
    permissions: number;
}

export type Utilisateur = {
    id: number;
    nom: string;
    prenom: string;
    pseudo: string;
    email: string;
    tel: string;
    mdp: string;
    Role: Role;
}

export type Centre = {
    id: number;
    nom: string;
    adresse: string;
    commune: Commune;
    code_postal: number;
    position: LatLngExpression;
    type: string;
    responsable: Utilisateur;
    capacite_max: number;
    places_dispo: number;
    etat: StatutCentre;
    acces_pmr: boolean;
    accueil_animaux: boolean;
    sanitaire: boolean;
    restauration: boolean;
    date_maj: Date;
}

export type Zone = {
    id: number;
    nom: string;
    perimetre: LatLngExpression[];
    utilisateur: Utilisateur;
}

export type Incident = {
    id: number;
    titre: string;
    type: string;
    description: string;
    date_debut: Date;
    niveau: number;
    etat: string; // TODO : déterminer le bon type à mettre
    agent_createur: Utilisateur;
    zone: Zone;
}

export type Alerte = {
    id: number;
    type: string;
    alerteur: Utilisateur;
    message: string;
    incident: Incident;
    commune: Commune;
    zone: Zone | null;
    date_publication: Date;
    date_expiration: Date;
}

export type Besoin = {
    id: number;
    libelle: string;
}

export type HistoriqueAction = {
    id: number;
    agent: Utilisateur;
    action: string;
    centre: Centre | null;
    incident: Incident | null;
    alerte: Alerte | null;
    utilisateur: Utilisateur | null;
    date: Date;
}

export type tUserContext = {
    user: Utilisateur|null;
    setUser: (user: Utilisateur|null) => void;
}

export const UserContext = createContext<tUserContext|null>(null);