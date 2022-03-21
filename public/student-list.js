const createValue = document.querySelector('#createValue')

createValue.addEventListener('click', e =>{
    document.getElementById('createForm').action = `http://localhost:8080/student`;
})
    

const editModalInfo = (id) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
       
        if(this.readyState == 4 && this.status == 200){
            let res = JSON.parse(xhttp.responseText)
             
            let ids = document.getElementById('id').value = id
            let fullnames = document.getElementById('fullname').value = `${res.collection.fullname}`
            let mottos = document.getElementById('motto').value = `${res.collection.motto}`

            document.getElementById('editForm').action = `http://localhost:8080/students/${id}`;
            }
        }
        xhttp.open("GET", `http://localhost:8080/student/${id}`, false);
        xhttp.send()
    }
    
    

const deleteStudent = (id) => {
    let x =  window.confirm("Are you sure do you want to delete this student?")
    if(x === true){
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", `http://localhost:8080/students/${id}`, false);
        xhttp.send();
    }

    location.reload();
}

const loadStudents = () => {
    const xhttp = new XMLHttpRequest();
    const url = new URL('http://localhost:8080/student')


    xhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let res = JSON.parse(xhttp.responseText);
            

            for(let item=0; item<res.student.length; item++){
                const modalValue = `
            <div class="mt-4 col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${res.student[item].fullname}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${res.student[item].id}</h6>
                        <div>Motto: ${res.student[item].motto}</div>
                        <hr>
                        
                        <button types="button" class="btn btn-danger" onClick="deleteStudent(${res.student[item].id})">
                        <i class="fa fa-trash"></i>  Delete
                        </button>

                        <button types="button" class="btn btn-primary" data-toggle="modal" 
                            data-target="#editStudentModal" onClick="editModalInfo(${res.student[item].id})">
                            <i class="fa fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
            <br/>
        `
        document.getElementById('students').innerHTML = document.getElementById('students').innerHTML + modalValue;
        
            }
            
        }
    }

    xhttp.open("GET", url, false);
    xhttp.send();
}

loadStudents();

