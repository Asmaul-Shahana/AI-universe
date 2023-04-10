const loadAI = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayAI(data.data.tools);
}

const displayAI = data => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText = '';
    data.forEach(ai => {
        console.log(ai);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100">
            <div class="pt-3 ps-3 pe-3 rounded-3">
            <img src="${ai.image}" class="img-fluid rounded-3" style="width: 100%; height: 15vw;object-fit:cover;" alt="...">
            </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">Features</h5>
                        <div class="text-secondary" id="${ai.id}"></div>
                    <hr>
                    <h5 class="card-title fw-bold">${ai.name}</h5>
                    <div class="d-flex gap-3 text-secondary">
                    <div><i class="fa-regular fa-calendar-days"></i></div>
                    <div><p>${ai.published_in}</p></div>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
        const listC = document.getElementById(`${ai.id}`); 

        const featureList = document.createElement('ol');
        console.log(ai.features[0]);
        // featureList.innerText = '';
        console.log((ai.features).length);
        for (let i = 0; i < (ai.features).length; i++) {
            const flist = document.createElement('li');
            flist.innerText = (ai.features)[i];
            featureList.appendChild(flist);
        };
        listC.appendChild(featureList);
    });
    
}

loadAI();