const loadAI = async (dataLimit) => {

    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();

    displayAI(dataLimit, data.data.tools);
}

const displayAI = (dataLimit, data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
   
    // show all button
    const showAllBtn = document.getElementById('show-all-btn');
    if(dataLimit && data.length>dataLimit)
    {
        data = data.slice(0,dataLimit);
        showAllBtn.classList.remove('d-none');
    }
    else{
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


const toggleSpinner = isLoading =>{
    const loaderCheck = document.getElementById('loader');
    if(isLoading)
        loaderCheck.classList.remove('d-none');
    else
        loaderCheck.classList.add('d-none');
}
document.getElementById('btn-show-all').addEventListener('click', function(){
    toggleSpinner(true);
    loadAI();
});

const loadAIDetails = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAIDetails(data.data);
}

const displayAIDetails = data =>{
    console.log(data);

    const detailModalBody = document.getElementById('detail-modal-body');
    detailModalBody.innerHTML=`
        <div class="row row-cols-1 row-cols-md-2 g-4 m-md-4">
            <div class="col">
                <div class="card h-100 detail-card">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${data.description}</h5>
                        
                        <div>
                            
                        </div>
                        </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100 detail-card">
                    <div class="d-flex justify-content-center accuracy-container">
                    <img src="${data.image_link[0]}" class="card-img-top" alt="...">
                    ${(data.accuracy.score>0) ?    
                    `<div class="bg-danger text-white rounded h-3 accuracy"> ${(data.accuracy.score)*100 + "% accuracy" }</div>` : `` }
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${data.input_output_examples ? data.input_output_examples[0].input : "Can you give any example?" }</h5>
                        <p class="card-text">${data.input_output_examples ? data.input_output_examples[0].output : "No! Not Yet! Take a break!!!" }</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

loadAI(6);
