// --------------------- FONCTIONNALITÉ MÉTÉO ---------------------
document.getElementById('getWeather').addEventListener('click', function () {
    const city = document.getElementById('city').value.trim();
    const apiKey = 'd3f10e6696f6e48c6a3d77ccd26aebc7'; // Assure-toi que c'est ta clé API valide

    if (!city) {
        document.getElementById('weatherResult').innerHTML = '<p>Veuillez entrer une ville.</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then(response => {
            console.log(response);  // Ajouté pour afficher le contenu de la réponse dans la console
            if (!response.ok) throw new Error('Ville non trouvée');
            return response.json();
        })
        .then(data => {
            console.log(data);  // Voir les données renvoyées par l'API

            // Création du bloc HTML pour afficher la météo avec l'icône
            const weatherInfo = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Température : ${data.main.temp}°C</p>
                <p>Météo : ${data.weather[0].description}</p>
            `;
            document.getElementById('weatherResult').innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>Erreur: ${error.message}</p>`;
            console.error('Erreur :', error);
        });
});




// --------------------- FONCTIONNALITÉ TODO LIST ---------------------
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Fonction d'affichage des tâches
function displayTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // On vide la liste avant de la remplir
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${todo} <button onclick="deleteTodo(${index})">Supprimer</button>`;
        todoList.appendChild(li);
    });
}

// Ajouter une tâche
document.getElementById('addTodo').addEventListener('click', function() {
    const newTodo = document.getElementById('newTodo').value.trim();
    if (!newTodo) return;  // On ignore si l'input est vide

    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos)); // Sauvegarder dans le localStorage
    displayTodos();
    document.getElementById('newTodo').value = '';  // On vide l'input après ajout
});

// Supprimer une tâche
function deleteTodo(index) {
    todos.splice(index, 1);  // Supprimer l'élément à l'index donné
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

// Affichage initial de la Todo List
displayTodos();

// Supprimer toutes les tâches
document.getElementById('clearTodos').addEventListener('click', function() {
    todos = [];  // On vide le tableau
    localStorage.setItem('todos', JSON.stringify(todos));  // On met à jour le localStorage
    displayTodos();  // On réaffiche la liste vide
});

// --------------------- FONCTIONNALITÉ BLOC NOTE ---------------------
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Fonction d'affichage des notes
function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // On vide la liste avant de la remplir
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${note.title}</strong>: ${note.content} <button onclick="deleteNote(${index})">Supprimer</button>`;
        notesList.appendChild(li);
    });
}

// Sauvegarder une note
document.getElementById('saveNote').addEventListener('click', function() {
    const noteTitle = document.getElementById('noteTitle').value.trim();
    const noteContent = document.getElementById('noteContent').value.trim();
    if (!noteTitle || !noteContent) return;  // On ignore si l'un des champs est vide

    notes.push({ title: noteTitle, content: noteContent });
    localStorage.setItem('notes', JSON.stringify(notes)); // Sauvegarder dans le localStorage
    displayNotes();
    document.getElementById('noteTitle').value = ''; // On vide les champs après ajout
    document.getElementById('noteContent').value = '';
});

// Supprimer une note
function deleteNote(index) {
    notes.splice(index, 1);  // Supprimer l'élément à l'index donné
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Supprimer toutes les notes
document.getElementById('clearNotes').addEventListener('click', function() {
    notes = [];  // On vide le tableau
    localStorage.setItem('notes', JSON.stringify(notes));  // On met à jour le localStorage
    displayNotes();  // On réaffiche la liste vide
});


// Affichage initial des notes
displayNotes();

// --------------------- FONCTIONNALITÉ CONVERTISSEUR DE DEVISES ---------------------
document.getElementById('convertCurrency').addEventListener('click', function () {
    const amount = document.getElementById('amount').value.trim();
    const fromCurrency = document.getElementById('fromCurrency').value.trim().toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.trim().toUpperCase();
    const apiKey = 'bb26147e0d95777d202e9745';

    if (!amount || !fromCurrency || !toCurrency) {
        document.getElementById('conversionResult').innerHTML = '<p>Veuillez remplir tous les champs.</p>';
        return;
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Problème avec la conversion');
            return response.json();
        })
        .then(data => {
            const conversionInfo = `
                <p>${amount} ${fromCurrency} équivaut à ${data.conversion_result.toFixed(2)} ${toCurrency}</p>
            `;
            document.getElementById('conversionResult').innerHTML = conversionInfo;
        })
        .catch(error => {
            document.getElementById('conversionResult').innerHTML = `<p>Erreur: ${error.message}</p>`;
            console.error('Erreur :', error);
        });
});
