const sectionTrainers = document.querySelector("#trainers");
const trainersCards = sectionTrainers.querySelectorAll(".trainer-item");

class Modal {
    constructor(element) {
        /** 
        * 03.Sauvegarder l'élément qui porte le focus avant ouverture de la modale
        **/
        this.previousActiveElement = document.activeElement;

        this.element = element;
        this.elementLink = this.element.querySelector(".image-thumb");

        
        /** 
        * 04. Construire l'élément dans le DOM ( peut etre skippé si l'élément existe déjà dans le DOM)
        **/
        this.modal = this.build(this.element);

        
        /** 
        * 05. Sauvegarder les éléments focusables 
        **/
        this.setFocusable();

        
        /** 
        * 06. Ecouter le click sur le bouton "close" ainsi que si l'utilisateur clique en dehors de la modale
        **/
        this.modal
            .querySelector("button.close")
            .addEventListener("click", this.close);

        window.addEventListener("click", (e) => {
            if (e.target == this.modal) {
                this.close(e);
            }
        });
        
        

        /** 
        * 07. Ecouter les interractions clavier
        **/
        document.addEventListener("keydown", this.onKeyDown);

        
        /** 
        * 08. Créer le focusTrap
        **/
        this.trap(true);
        
        
        /** 
        * 09. Diriger le focus sur le premier élément focusable de la modale
        **/
        this.firstFocusable.focus();
    }

    build = (element) => {
        
        /** 
        * 04.1. Récupérer le contenu des cards
        **/
        const contentElements = element.querySelectorAll(".down-content > *");
        const thumbnail = element.querySelector(".image-thumb img");

        /** 
        * 04.2. Créer l'élément englobant
        **/
        const modal = document.createElement("div");
        modal.classList.add("modal", "d-block", "bg-dark");

        /** 
        * 04.3. Injecter le contenu a l'interieur
        **/
        modal.innerHTML += `
        <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content d-flex flex-column justify-content-center align-items-center">
        <button type="button" class="close align-self-end p-3" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body d-flex flex-column justify-content-around align-items-center">
        </div>
        </div>
        </div>
        `;

        /** 
        * 04.4. Injecter le contenu des cards 
        **/
        if (thumbnail) {
            modal.querySelector(
                ".modal-body"
            ).innerHTML += `<img src="${thumbnail.src}" class="w-100">`;
        }

        contentElements.forEach((element) => {
            modal.querySelector(".modal-body").innerHTML += element.outerHTML;
        });

        if (modal.querySelector(".social-icons")) {
            modal
                .querySelector(".social-icons")
                .classList.add(
                    "d-flex",
                    "justify-content-between",
                    "align-items-center",
                    "w-50",
                    "p-5"
                );
        }
        
        /** 
        * 04.5. Injecter le composant à la fin du body
        **/
        document.body.appendChild(modal);

        return modal;
    };

    setFocusable = () => {
        /** 
        * 05.1. Récupérer tous les éléments focusables (copiez coller cette liste pour la réutiliser plus tard)
        **/
        this.focusable = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        /** 
        * 05.2 Isoler le premier et le dernier (pour le trap et rediriger le focus)
        **/
        this.firstFocusable = this.focusable[0];
        this.lastFocusable = this.focusable[this.focusable.length - 1];
    };

    onKeyDown = (e) => {
        
        /** 
        * 07.0 Ecouter les touches avec event.key
        **/
        switch (e.key) {

        /** 
        * 07.1 si Echap apeler la methode close
        **/
            case "Escape":
                this.close(e);
                break;
        /** 
        * 07.2 pour le tab appeler la methode loop
        **/
            case "Tab":
                this.loop(e);
                break;

            default:
                break;
        }
    };

    loop = (e) => {
        //Rotate Focus
        /** 
        * 07.1.1 Si Maj + Tab quand le focus est sur le premier element, alors rediriger vers le dernier
        **/
        if (e.shiftKey && document.activeElement === this.firstFocusable) {
            e.preventDefault();
            this.lastFocusable.focus();

        /** 
        * 07.1.2 Si Tab quand le focus est sur le dernier element, alors rediriger vers le premier
        **/
        } else if (
            !e.shiftKey &&
            document.activeElement === this.lastFocusable
        ) {
            e.preventDefault();
            this.firstFocusable.focus();
        }
    };

    trap = (bool) => {

        /** 
        * 08.1 Pour tous les elements directement enfants du body ...
        **/
        Array.from(document.body.children).forEach((child) => {
            /** 
            * 08.2 ... qui ne sont pas la modale en question ...
            **/
            if (child !== this.element) {
                /** 
                * 08.3 ... mettre un aria-hidden a true pour les faire disparaitre de l'a11y-tree
                * Ici j'ai ajouté une option boolean pour pouvoir utiliser cette même methode pour activer/desactiver le focus trap.
                **/
                if (bool) {
                    child.setAttribute("aria-hidden", true);
                } else {
                    child.removeAttribute("aria-hidden");
                }
            }
        });
    };

    close = (e) => {
        e.preventDefault();
        /** 
        * 07.2.1 Annuler le focus trap
        **/
        this.trap(false);

        /** 
        * 07.2.2 Rediriger le focus sur l'element qui a déclenché la modale
        **/
        this.previousActiveElement.focus();

        /** 
        * 07.2.3 Supprimer les écouteur d'évenements inutiles lorsque la modale est fermée (pour la mémoire)
        **/
        document.removeEventListener("keydown", this.onKeyDown);

        /** 
        * 07.2.4 Supprimer l'élément du DOM
        **/
        this.modal.parentElement.removeChild(this.modal);
    };
}


/** 
* 01.Instancier chaque carte dans une boucle.
* 02.Au click, instancier
**/
trainersCards.forEach((card) => {
    const cardLink = card.querySelector(".image-thumb");

    cardLink.addEventListener("click", (e) => {
        e.preventDefault();

        new Modal(card);
    });
});
