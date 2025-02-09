const loadAI = async (dataLimit, sortDate) => {

    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAI(dataLimit, data.data.tools, sortDate);
}

const displayAI = (dataLimit, data, sortDate) => {

    // ----------------Sort by date-------------------
    if (sortDate) {
        data.sort(function (a, b) {
            return new Date(b.published_in) - new Date(a.published_in);
        });
    }
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    // show all button condition
    const showAllBtn = document.getElementById('show-all-btn');
    if (dataLimit && data.length > dataLimit) {
        data = data.slice(0, dataLimit);
        showAllBtn.classList.remove('d-none');
    }
    else {
        showAllBtn.classList.add('d-none');
    }

    data.forEach(ai => {
        // console.log(ai);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100">
            <div class="pt-3 ps-3 pe-3 rounded-3">
            <img src="${ai.image}" class="img-fluid rounded-3 ai-image" alt="...">
            </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">Features</h5>
                        <div class="text-secondary" id="${ai.id}"></div>
                    <hr>
                    <div class="d-flex align-items-center space-between justify-content-between">
                        <div>
                            <h5 class="card-title fw-bold">${ai.name}</h5>
                            <div class="d-flex gap-3 text-secondary">
                                <div><i class="fa-regular fa-calendar-days"></i></div>
                                <div><p>${ai.published_in}</p></div>
                            </div>
                        </div> 
                        <div onclick="loadAIDetails('${ai.id}')" class="bg-danger bg-opacity-10 rounded-circle" data-bs-toggle="modal" data-bs-target="#ai-detail-modal">
                            <i class="fa-solid fa-arrow-right p-3 text-danger"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
        const listC = document.getElementById(`${ai.id}`);

        const featureList = document.createElement('ol');
        featureList.innerText = '';

        for (let i = 0; i < (ai.features).length; i++) {
            const flist = document.createElement('li');
            flist.innerText = (ai.features)[i];
            featureList.appendChild(flist);
        };
        listC.appendChild(featureList);
    });
    toggleSpinner(false);
}

// ----------------------Spinner/Loader--------------------
const toggleSpinner = isLoading => {
    const loaderCheck = document.getElementById('loader');
    if (isLoading)
        loaderCheck.classList.remove('d-none');
    else
        loaderCheck.classList.add('d-none');
}

// ----------------See more button---------------------
document.getElementById('btn-show-all').addEventListener('click', function () {
    toggleSpinner(true);
    loadAI();
});

const loadAIDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAIDetails(data.data);
}

const displayAIDetails = data => {
    console.log(data);
    const cardUpper = document.getElementById('card-upper');
    const featuresDetail = document.getElementById('fetures-detail');
    const cardLower = document.getElementById('card-lower');
    const integrationDetail = document.getElementById('integration-detail');

    // ----------------------Left side card upper half of modal-------------------
    cardUpper.innerHTML = `
    <h5 class="card-title fw-bold mb-3">${data.description}</h5>
    <div class="row row-cols-1 row-cols-md-3 g-3">
        <div class="col">
            <div
                class="h-100 p-2 rounded bg-white text-success fw-bold d-flex justify-content-center align-items-center flex-column">
                ${data.pricing ?
            `<div>${data.pricing[0].price}</div>`
            : `<div class="text-center">Free of Cost/</div>`
        }
                <div> ${data.pricing ? data.pricing[0].plan : `No plan`} </div>
            </div>
        </div>
        <div class="col">
            <div
                class="h-100 p-2 rounded bg-white text-warning fw-bold d-flex justify-content-center align-items-center flex-column">
                ${data.pricing ?
            `<div>${data.pricing[1].price}</div>`
            : `<div class="text-center">Free of Cost/</div>`
        }
                <div> ${data.pricing ? data.pricing[1].plan : `No plan`} </div>
            </div>
        </div>
        <div class="col">
            <div
                class="h-100 p-2 rounded bg-white text-danger fw-bold d-flex justify-content-center align-items-center flex-column">
                ${data.pricing ?
            `<div>${data.pricing[2].price}</div>`
            : `<div class="text-center">Free of Cost/</div>`
        }
                <div> ${data.pricing ? data.pricing[2].plan : `No plan`} </div>
            </div>
        </div>
    </div> 
    `;
    // -----------------------Right side card of modal-------------------
    cardLower.innerHTML = `
    <div class="d-flex justify-content-center accuracy-container">
        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
             ${(data.accuracy.score > 0) ?
            `<div class="bg-danger text-white rounded h-3 accuracy">
                ${(data.accuracy.score) * 100 + "% accuracy"}</div>` : ``}
            </div>
            <div class="card-body text-center">
                <h5 class="card-title fw-bold">${data.input_output_examples ?
            data.input_output_examples[0].input : "Can you give any example?"}</h5>
                <p class="card-text">${data.input_output_examples ?
            data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"} </p>
            </div>
    `;

    // -------------- Features ----------------
    featuresDetail.innerText = '';
    if (data.features) {
        for (const fet in data.features) {
            const fetlist = document.createElement('li');
            fetlist.innerText = data.features[fet].feature_name;
            featuresDetail.appendChild(fetlist);
        }
    }
    else {
        featuresDetail.innerText = 'No data Found';
    }
    // -------------- Integrations ----------------
    integrationDetail.innerText = '';
    if (data.integrations) {
        for (const x of data.integrations) {
            const intList = document.createElement('li');
            intList.innerText = x;
            integrationDetail.appendChild(intList);
        }
    }
    else {
        integrationDetail.innerText = 'No data Found';
    }
}

// ------------Sort by date---------------
document.getElementById('sort-by-date-btn').addEventListener('click', function () {
    loadAI(0, true);
});

loadAI(6);
