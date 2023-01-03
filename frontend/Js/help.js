var btnNodeList = document.querySelectorAll('.card-header button')
console.log(btnNodeList);

for (let i = 0; i < btnNodeList.length; i++) {
    btnNodeList[i].addEventListener('click', function(e){

        $('.card-header button .collapse-icon').not(`#${this.id} .collapse-icon`).removeClass('fa-minus').addClass('fa-plus');
        $(`#${e.target.id} .collapse-icon`).toggleClass('fa-plus fa-minus');

    })
}