const sectionTrainers = document.querySelector('#trainers');
const trainersCards = sectionTrainers.querySelectorAll('.trainer-item');

trainersCards.forEach(card => {
    const cardLink = card.querySelector('.image-thumb');

    cardLink.addEventListener('click', e => {
        e.preventDefault();

        let modal = createModal(card);
        
        modal.querySelector('button.close').addEventListener('click', e => {
            e.preventDefault()
            document.body.removeChild(modal);
        })

        window.addEventListener('click', e => {
            if (e.target == modal) { 
                document.body.removeChild(modal);
            }
        })
    })
    
})

const createModal = (element) => {
    const contentElements = element.querySelectorAll('.down-content > *');
    const thumbnail = element.querySelector('.image-thumb img');
    
    const modal = document.createElement('div');
    modal.classList.add('modal', 'd-block', 'bg-dark');

    console.log(contentElements);

    modal.innerHTML += `
        <div class="modal-dialog">
            <div class="modal-content d-flex flex-column justify-content-center align-items-center">
                <button type="button" class="close align-self-end p-3" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body d-flex flex-column justify-content-around align-items-center">
                    <img src="${thumbnail.src}" class="w-100">
                </div>
            </div>
        </div>
    `;

    contentElements.forEach(element => {
        console.log(element.outerHTML);
        modal.querySelector('.modal-body').innerHTML += element.outerHTML
    })

    modal.querySelector('.social-icons').classList.add('d-flex', 'justify-content-between', 'align-items-center', 'w-50', 'p-5')
    modal.querySelector('h4').classList.add('my-3')
    document.body.appendChild(modal)

    return modal;
}
