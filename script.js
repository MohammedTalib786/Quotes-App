// api = https://dummyjson.com/quotes
// 22 Sept | need to create one remaining functionality on input bar (a close(x) button) for when user want to clear text it should be in a single click of a button
$(document).ready(function () {
    // console.log('Hello jQuery', $)

    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Scroll To Top Functionality
    const btn = document.querySelector('.scrollToTopBtn');
    window.addEventListener('scroll', () => window.pageYOffset > 100 ? btn.classList.add('active') : btn.classList.remove('active'))
    btn.addEventListener('click', () => window.scrollTo(0, 0))


    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Fetching Quotes
    let url = 'https://dummyjson.com/quotes?limit=1300';
    async function fetchData(api) {
        // console.log(api)
        try {
            let data = await fetch(api);
            let res = await data.json();
            let mainRes = res.quotes;
            // console.log(res)
            // console.log(res.quotes)
            let iHtml = ''
            mainRes.map(function (elem, ind) {
                let quote = elem.quote;
                let author = elem.author;
                // console.log(elem, 'elem')
                iHtml += `
                            <div class="card" >
                                <div class="card-body">
                                    <h5 class="card-title">${quote}</h5>
                                    <p class="card-text">~ ${author.includes('(R.A)') || author.includes('Abu Bakr') || author.includes('Ali ibn Abi Talib') || author.includes('Umar ibn Al-Khattāb') ? 'Hazrat ' + author : author}</p>
                                </div>
                            </div>
                        `;
            })
            $('#cont').html(iHtml)
        } catch (err) { console.log('Error: => ', err.message) }
    }
    setTimeout(() => fetchData(url), 900)


    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Search Filter Functionality
    $('#searchInp').on('input', function () {
        let inp = $(this).val().toLowerCase();
        // console.log(inp, typeof inp, 'inp')
        // console.log($(this).val())
        // console.log(inp, '| inp')

        $('.card').map(function (ind, elem) {
            // console.log(elem, 'elem')
            // console.log($(this), 'this')
            // console.log($(this).html(), 'This HTML')

            let quoteText = $(this).find('.card-title').text().toLowerCase();
            let authorText = $(this).find('.card-text').text().toLowerCase();

            quoteText.includes(inp) || authorText.includes(inp) ? $(this).fadeIn(400) : $(this).fadeOut(400);
        })
    })


    //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Dark Mode Functionality
    const getStyle = (value) => window.getComputedStyle(value);
    // console.log(window.getComputedStyle(document.body).getPropertyValue('background-color'))
    let dModeBtn = document.getElementById('dark-mode-btn');

    dModeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(getStyle(document.body).getPropertyValue('background-color'), 'getStyle')
        let defaultBgColor = getStyle(document.body).getPropertyValue('background-color')
        if (defaultBgColor == 'rgb(232, 232, 232)') {
            // console.log('yes')
            document.body.style.backgroundColor = 'rgb(36, 36, 36)';
            dModeBtn.style.backgroundColor = 'rgb(236, 236, 236)';
            $('.fa-moon').css('color', 'rgb(45, 44, 84)');
            $('h1').css('color', 'rgb(236, 236, 236)');
            $('.card').css('background-color', 'rgb(71, 71, 135)');
            $('.card-title').css('color', 'rgb(236, 236, 236)');
            $('.card-text').css('color', 'rgb(171, 170, 184)');
            $('#searchInp').addClass('dkActiveSearchInp');
            $('.searchBoxCont img').css('filter', 'brightness(0) invert(1)');
            $('.scrollToTopBtn').css({'background-color': 'rgb(236, 236, 236)', 'color': 'rgb(45, 44, 84)' })
        }
        
        else {
            document.body.style.backgroundColor = 'rgb(232, 232, 232)';
            dModeBtn.style.backgroundColor = 'rgb(45, 44, 84)';
            $('.fa-moon').css('color', 'white');
            $('h1').css('color', 'rgb(45, 44, 84)');
            $('.card').css('background-color', 'rgb(236, 236, 236)');
            $('.card-title').css('color', 'rgb(45, 44, 84)');
            $('.card-text').css('color', 'rgb(71, 71, 135)');
            $('#searchInp').removeClass('dkActiveSearchInp');
            $('.searchBoxCont img').removeAttr("style");
            $('.scrollToTopBtn').css({'background-color': 'rgb(71, 71, 135)', 'color': 'white' })
        }
    })

})
