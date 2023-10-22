
// Test data, can be deleted in the future
// const data = [
//     {id:'1', title: "Title 1", author: "John", year: "2020", claim: "Claim 1", evidence: "Evidence 1" },
//     {id:'2', title: "Title 2", author: "Jane", year: "2021", claim: "Claim 2", evidence: "Evidence 2" }
// ];
const data=[]

let bookmarks = JSON.parse(localStorage.getItem("bookmarkedSearches")) || [];

document.addEventListener("DOMContentLoaded", () => {
    
    axios.get(URL+"/api/books").then(res=>{
        res.data.map(item=>{
            data.push({
                ...item,
                id:item._id
            })
        })
        // console.log("data->",data)
        populateTable(data);
        displayBookmarks(); 
    })
    
    ////////////////////////////////////////////////////////////////
    // Submission inside the modal
    document.getElementById('submitForm').addEventListener('submit', function(event) {
        event.preventDefault();
        closeSubmitForm();
    });
//////////////////////////////////////////////////////////////// 
});

function populateTable(data) {
    const tbody = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="titleCol">${row.title}</td>
            <td class="authorCol">${row.author}</td>
            <td class="yearCol">${row.year}</td>
            <td class="claimCol">${row.claim}</td>
            <td class="evidenceCol">${row.evidence}</td>
            <td class="approval">
                <input type="checkbox" data-id="${row.id}" onchange="updateApproval(this)">
            </td>
            <td class="detailsCol"><button onclick="location.href='detail.html?id=${row._id}'">Edit</button></td>
        `;
        tbody.appendChild(tr);
    });
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    
    axios.get(URL+"/api/books").then(res=>{
        res.data.map(item=>{
            data.push({
                ...item,
                id:item._id
            })
        });
        populateTable(data);
        displayBookmarks(); 
    });

    document.getElementById('submitForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = {
            title: document.querySelector('input[name="title"]').value,
            author: document.querySelector('input[name="author"]').value,
            year: document.querySelector('input[name="year"]').value,
            journal: document.querySelector('input[name="journal"]').value,
            practice: document.querySelector('input[name="practice"]').value,
            claim: document.querySelector('input[name="claim"]').value,
            researchType: document.querySelector('input[name="researchType"]').value,
            details: document.querySelector('textarea[name="details"]').value
        };

        axios.post(URL + "/api/books", formData)
        .then(response => {
            if (response.data && response.data.msg === 'Book added successfully') {
                data.push({
                    ...formData,
                    id: response.data.id 
                });
                populateTable(data); 
                closeSubmitForm();
            } else {
                alert("Error adding book: " + (response.data.error || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error("There was an error submitting the form:", error);
            alert("Error submitting form: " + error.message);
        });
    });    
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

function filterSearch() {
    const searchTerm = document.getElementById("searchBox").value;
    
    const filteredData = data.filter(row => {
        
        return row.title.includes(searchTerm) ||
               row.author.includes(searchTerm) ||
               row.year.toString().includes(searchTerm) ||
               row.claim.includes(searchTerm) ||
               row.evidence.includes(searchTerm);
    });
    populateTable(filteredData);
}

function toggleColumn(className) {
    const cols = document.getElementsByClassName(className);
    for (let i = 0; i < cols.length; i++) {
        if (cols[i].style.display === "none") {
            cols[i].style.display = "";
        } else {
            cols[i].style.display = "none";
        }
    }
}

// Bookmark functions
function displayBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarkList.innerHTML = ''; 

    bookmarks.forEach((searchTerm, index) => {
        const li = document.createElement('li');
        li.textContent = searchTerm;

        // Add a delete button for each bookmark
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function(event) {
            event.stopPropagation();  
            deleteBookmark(index);
        };

        li.onclick = function() {
            document.getElementById('searchBox').value = searchTerm;
            filterSearch();
            
        };

        li.appendChild(deleteButton);
        bookmarkList.appendChild(li);
    });
}

function bookmarkCurrentSearch() {
    const searchTerm = document.getElementById("searchBox").value;
    if (!searchTerm) return; 
    if (!bookmarks.includes(searchTerm)) {
        bookmarks.push(searchTerm);
        localStorage.setItem("bookmarkedSearches", JSON.stringify(bookmarks));
        displayBookmarks();
        console.log("toSearch")
    }
}
function SearchBooks(){
    const searchTerm = document.getElementById("searchBox").value;
    if(!searchTerm){
        populateTable(data);
        return
    };
    const queryData={
        // title:null,
        // author:null,
        // year:null,
        // claim:null,
        // evidence:null
    }
    data.filter(row => {
        if(row.title == searchTerm){
            queryData.title = searchTerm
        }
        else if(row.author == searchTerm){
            queryData.author = searchTerm
        }
        else if(row.year == searchTerm){
            queryData.year = Number(searchTerm)
        }
        else if(row.claim == searchTerm){
            queryData.claim = searchTerm
        }
        else if(row.evidence == searchTerm){
            queryData.evidence = searchTerm
        }
    });
    console.log("myqury",queryData)
    axios.get(URL+"/api/books/sea",{params:queryData})
    .then(res=>{
        console.log(res)
        const mydata =[];
        res.data.map(item=>{
            mydata.push({
                ...item,
                id:item._id
            })
        })
        populateTable(mydata);
    })
    
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1); 
    localStorage.setItem("bookmarkedSearches", JSON.stringify(bookmarks));
    displayBookmarks(); 
}

// Clear all bookmarks
function clearAllBookmarks() {
    bookmarks = [];
    localStorage.setItem("bookmarkedSearches", JSON.stringify(bookmarks));
    displayBookmarks();
}

function sortTable(n) {
    
}

////////////////////////////////////////////////////////////////
// Function to open the modal
function openSubmitForm() {
    document.getElementById('submitModal').style.display = "block";
}

// Function to close the modal
function closeSubmitForm() {
    document.getElementById('submitModal').style.display = "none";
}
////////////////////////////////////////////////////////////////

function updateApproval(checkbox) {
    const id = checkbox.getAttribute("data-id"); 
    const isApproved = checkbox.checked; 


    axios.post(URL + "/api/books/approval", { id, isApproved })
        .then(response => {
            if (response.data && response.data.msg === 'Approval updated successfully') {
             
                console.log("Approval updated successfully");
            } else {
               
                console.log("Error updating approval: " + (response.data.error || 'Unknown error'));
            }
        })
        .catch(error => {
         
            console.error("Request failed:", error);
            alert("Error updating approval: " + error.message);
        });
}

