const sectionTrainers = document.querySelector("#trainers");
const trainersCards = sectionTrainers.querySelectorAll(".trainer-item");

class Modal {
    constructor(element) {
        this.previousActiveElement = document.activeElement;

        this.element = element;
        this.elementLink = this.element.querySelector(".image-thumb");

        this.modal = this.build(this.element);

        this.setFocusable();

        this.modal
            .querySelector("button.close")
            .addEventListener("click", this.close);

        window.addEventListener("click", (e) => {
            if (e.target == this.modal) {
                this.close(e);
            }
        });

        document.addEventListener("keydown", this.onKeyDown);

        this.trap(true);

        this.firstFocusable.focus();
    }

    build = (element) => {
        const contentElements = element.querySelectorAll(".down-content > *");
        const thumbnail = element.querySelector(".image-thumb img");

        const modal = document.createElement("div");
        modal.classList.add("modal", "d-block", "bg-dark");

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

        document.body.appendChild(modal);

        return modal;
    };

    setFocusable = () => {
        this.focusable = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        this.firstFocusable = this.focusable[0];
        this.lastFocusable = this.focusable[this.focusable.length - 1];
    };

    onKeyDown = (e) => {
        switch (e.key) {
            case "Escape":
                this.close(e);
                break;

            case "Tab":
                this.loop(e);
                break;

            default:
                break;
        }
    };

    loop = (e) => {
        //Rotate Focus
        if (e.shiftKey && document.activeElement === this.firstFocusable) {
            e.preventDefault();
            this.lastFocusable.focus();
        } else if (
            !e.shiftKey &&
            document.activeElement === this.lastFocusable
        ) {
            e.preventDefault();
            this.firstFocusable.focus();
        }
    };

    trap = (bool) => {
        Array.from(document.body.children).forEach((child) => {
            if (child !== this.element) {
                if (bool) {
                    child.setAttribute("aria-hidden", true);
                } else {
                    child.removeAttribute("aria-hidden");
                }
            }
        });
    };

    close = (e) => {
        console.log(this.modal);
        e.preventDefault();

        this.trap(false);

        this.previousActiveElement.focus();

        document.removeEventListener("keydown", this.onKeyDown);

        this.modal.parentElement.removeChild(this.modal);
    };
}

trainersCards.forEach((card) => {
    const cardLink = card.querySelector(".image-thumb");

    cardLink.addEventListener("click", (e) => {
        e.preventDefault();

        new Modal(card);
    });
});
