// ==================================================
// 1. ÉTAT DU PERSONNAGE
// ==================================================

const nom = "christian";

let force = 7;
let magie = 5;
let piecesDor = 0;

let niveau = 0;
let classe = "aventurier";

let possedeCle = false;
let possedeChapeau = false;


// ==================================================
// 2. VÉRIFIER LE PERSONNAGE
// ==================================================

function verifierPersonnage() {

    const valide =
        typeof nom === "string" &&
        typeof force === "number" &&
        typeof magie === "number" &&
        typeof piecesDor === "number" &&
        force >= 0 &&
        force <= 10 &&
        magie >= 0 &&
        magie <= 10 &&
        piecesDor >= 0;

    return valide;
}


// ==================================================
// 3. CALCULER LE NIVEAU
// ==================================================

function calculerNiveau() {

    niveau = force + magie;

}


// ==================================================
// 4. DÉTERMINER LA CLASSE
// ==================================================

function calculerClasse() {

    if (force > 0 && force >= magie * 2) {

        classe = "guerrier";

    } else if (magie > 0 && magie >= force * 2) {

        classe = "mage";

    } else {

        classe = "aventurier";
    }
}


// ==================================================
// AFFICHER LES PIÈCES
// ==================================================

function afficherPieces() {

    document.querySelector("#pieces").textContent = piecesDor;

}


// ==================================================
// 5 + 6. AFFRONTER UN ADVERSAIRE
// ==================================================

function battreAdversaire(adversaire) {

    if (adversaire === "fantome") {

        piecesDor += 2;
        magie += 1;

        afficherMessage(
            "Victoire contre le fantôme ! +2 pièces et +1 magie."
        );

    } else if (adversaire === "loup") {

        piecesDor += 2;
        force += 1;

        afficherMessage(
            "Victoire contre le loup ! +2 pièces et +1 force."
        );

    } else if (adversaire === "paladin") {

        piecesDor += 1;
        force += 1;
        magie += 1;

        afficherMessage(
            "Victoire contre le paladin ! +1 pièce, +1 force et +1 magie."
        );

    } else {

        afficherMessage("Adversaire inconnu.");

        return;
    }


    // Limite à 10 sans le chapeau

    if (possedeChapeau === false) {

        if (force > 10) {
            force = 10;
        }

        if (magie > 10) {
            magie = 10;
        }
    }


    // Mise à jour

    calculerNiveau();
    calculerClasse();
}


// ==================================================
// 7. ACHETER UN OBJET
// ==================================================

function acheterObjet(objet) {

    const prixCle = 3;
    const prixChapeau = 5;


    // ---------- CLÉ ----------

    if (objet === "cle") {

        if (possedeCle === true) {

            afficherMessage(
                "Vous possédez déjà la clé."
            );

            return;
        }


        if (piecesDor < prixCle) {

            afficherMessage(
                "Pas assez de pièces d'or pour acheter la clé."
            );

            return;
        }


        piecesDor -= prixCle;

        possedeCle = true;


        afficherMessage(
            "Clé achetée pour 3 pièces d'or."
        );

        return;
    }


    // ---------- CHAPEAU ----------

    if (objet === "chapeau") {

        if (possedeChapeau === true) {

            afficherMessage(
                "Vous possédez déjà le chapeau."
            );

            return;
        }


        if (piecesDor < prixChapeau) {

            afficherMessage(
                "Pas assez de pièces d'or pour acheter le chapeau."
            );

            return;
        }


        piecesDor -= prixChapeau;

        possedeChapeau = true;


        afficherMessage(
            "Chapeau acheté pour 5 pièces d'or."
        );

        return;
    }


    afficherMessage("Objet inconnu.");
}


// ==================================================
// 8. AFFRONTER LE BOSS
// ==================================================

function battreBoss() {

    calculerNiveau();


    if (
        niveau === 20 &&
        possedeCle === true
    ) {

        piecesDor += 10;

        possedeCle = false;


        afficherMessage(
            "Victoire contre le boss ! +10 pièces. La clé a été consommée."
        );

    } else if (
        niveau !== 20 &&
        possedeCle === false
    ) {

        afficherMessage(
            "Combat impossible : il faut être exactement au niveau 20 et posséder la clé."
        );

    } else if (niveau !== 20) {

        afficherMessage(
            "Combat impossible : le niveau doit être exactement 20."
        );

    } else {

        afficherMessage(
            "Combat impossible : vous devez posséder la clé."
        );
    }
}


// ==================================================
// DOM : AFFICHER LE PERSONNAGE
// ==================================================

function afficherPersonnage() {

    document.querySelector("#nom").textContent =
        nom;

    document.querySelector("#force").textContent =
        force;

    document.querySelector("#magie").textContent =
        magie;

    document.querySelector("#niveau").textContent =
        niveau;

    document.querySelector("#classe").textContent =
        classe;


    afficherPieces();


    document.querySelector("#cle").textContent =
        possedeCle
            ? "oui"
            : "non";


    document.querySelector("#chapeau").textContent =
        possedeChapeau
            ? "oui"
            : "non";


    // Barres de progression

    const largeurForce =
        Math.min(force, 10) * 10;

    const largeurMagie =
        Math.min(magie, 10) * 10;


    document.querySelector("#barreForce").style.width =
        largeurForce + "%";


    document.querySelector("#barreMagie").style.width =
        largeurMagie + "%";


    // Boutons du marchand

    document.querySelector("#acheterCle").disabled =
        possedeCle;


    document.querySelector("#acheterChapeau").disabled =
        possedeChapeau;
}


// ==================================================
// AFFICHER UN MESSAGE
// ==================================================

function afficherMessage(message) {

    document.querySelector("#messages").textContent =
        message;

}


// ==================================================
// RECOMMENCER LA PARTIE
// ==================================================

function recommencerJeu() {

    force = 7;

    magie = 5;

    piecesDor = 0;

    niveau = 0;

    classe = "aventurier";

    possedeCle = false;

    possedeChapeau = false;


    calculerNiveau();

    calculerClasse();

    afficherPersonnage();

    afficherMessage(
        "Nouvelle partie ! Bienvenue dans le Mini-RPG."
    );
}


// ==================================================
// ÉVÉNEMENTS : COMBATS
// ==================================================

const boutonFantome =
    document.querySelector("#fantome");


boutonFantome.addEventListener(
    "click",
    function () {

        battreAdversaire("fantome");

        afficherPersonnage();

    }
);


const boutonLoup =
    document.querySelector("#loup");


boutonLoup.addEventListener(
    "click",
    function () {

        battreAdversaire("loup");

        afficherPersonnage();

    }
);


const boutonPaladin =
    document.querySelector("#paladin");


boutonPaladin.addEventListener(
    "click",
    function () {

        battreAdversaire("paladin");

        afficherPersonnage();

    }
);


// ==================================================
// ÉVÉNEMENTS : MARCHAND
// ==================================================

const boutonAcheterCle =
    document.querySelector("#acheterCle");


boutonAcheterCle.addEventListener(
    "click",
    function () {

        acheterObjet("cle");

        afficherPersonnage();

    }
);


const boutonAcheterChapeau =
    document.querySelector("#acheterChapeau");


boutonAcheterChapeau.addEventListener(
    "click",
    function () {

        acheterObjet("chapeau");

        afficherPersonnage();

    }
);


// ==================================================
// ÉVÉNEMENT : BOSS
// ==================================================

const boutonBattreBoss =
    document.querySelector("#battreBoss");


boutonBattreBoss.addEventListener(
    "click",
    function () {

        battreBoss();

        afficherPersonnage();

    }
);


// ==================================================
// ÉVÉNEMENT : RECOMMENCER
// ==================================================

const boutonRecommencer =
    document.querySelector("#recommencer");


boutonRecommencer.addEventListener(
    "click",
    function () {

        recommencerJeu();

    }
);


// ==================================================
// AFFICHAGE INITIAL
// ==================================================

calculerNiveau();

calculerClasse();

afficherPersonnage();

afficherMessage(
    "Bienvenue dans le Mini-RPG !"
);