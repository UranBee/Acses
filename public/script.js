let currentPage = { one: 0, two: 0 }
const itemsPerPage = { one: 8, two: 4 }

const one = Array.from(document.querySelectorAll('#one > div'))
const two = Array.from(document.querySelectorAll('#two > div'))

const totalPages = {
    one: Math.ceil(one.length / itemsPerPage.one),
    two: Math.ceil(two.length / itemsPerPage.two),
}


function updateGrid(id) {
    switch (id) {
        case 'one':
            one.forEach((item, index) => {
                item.style.display = (index >= currentPage.one * itemsPerPage.one && index < (currentPage.one + 1) * itemsPerPage.one) ? 'flex' : 'none'
            })

            document.getElementById('prev1').disabled = currentPage.one === 0
            document.getElementById('next1').disabled = currentPage.one === totalPages.one - 1
            updateIndicators("one")
            break

        case 'two':
            two.forEach((item, index) => {
                item.style.display = (index >= currentPage.two * itemsPerPage.two && index < (currentPage.two + 1) * itemsPerPage.two) ? 'flex' : 'none'
            })
            document.getElementById('prev2').disabled = currentPage.two === 0
            document.getElementById('next2').disabled = currentPage.two === totalPages.two - 1
            updateIndicators("two")
            break
    }
}


function updateIndicators(id) {

    let indicatorId, pageTotal, thisPage

    switch (id) {
        case 'one': 
            indicatorId = 'page-indicators-one'
            pageTotal = totalPages.one
            thisPage = currentPage.one
            break

        case 'two': 
            indicatorId = 'page-indicators-two'
            pageTotal = totalPages.two
            thisPage = currentPage.two
            break
    }

    const indicatorsContainer = document.getElementById(indicatorId)
    indicatorsContainer.innerHTML = ''


    for (let i = 0; i < pageTotal; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('w-3', 'h-3', 'rounded-full', 'cursor-pointer', 'transition', 'duration-300', 'ease-in-out');
        if (i === thisPage) {
            indicator.style.background='rgb(59 130 246 / var(--tw-bg-opacity))'; 
            indicator.style.width= "0.75rem"
            indicator.style.height= "0.75rem"
            indicator.style.border= "2px solid white"
        }

        if (i!==thisPage){
            indicator.style.background='white'; 
            indicator.style.width= "0.75rem"
            indicator.style.height= "0.75rem"
            indicator.style.border= "2px solid"
            indicator.style.borderColor = 'rgb(59 130 246 / var(--tw-border-opacity))'
        }
            console.log(thisPage);
        indicator.addEventListener('click', () => {
            console.log(i);
            id==='one' ? currentPage.one = i: currentPage.two=i;
            updateGrid(id);
        });
        indicatorsContainer.appendChild(indicator);
    }


}

function nav(event) {
    let whereTo = event.currentTarget.nextElementSibling ? 'back' : 'next'
    let id
    switch (whereTo) {
        case 'back': 
            id = event.currentTarget.nextElementSibling.id
            if (id === 'one' && currentPage.one > 0) {
                currentPage.one --
                updateGrid('one')
            }
            if (id === 'two' && currentPage.two > 0) {
                currentPage.two --
                updateGrid('two')
            }
            break;

        case 'next': 
            id = event.currentTarget.previousElementSibling.id
            if (id === 'one' && currentPage.one < totalPages.one-1) {
                currentPage.one ++
                updateGrid('one')
            }
            if (id === 'two' && currentPage.two < totalPages.two-1) {
                currentPage.two ++
                updateGrid('two')
            }
            break;
    }   
}

updateGrid('one')
updateGrid('two')

