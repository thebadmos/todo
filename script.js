//Task Class
class Task{
    constructor(title,note,dateTask){
        this.title=title;
        this.note=note;
        this.dateTask=dateTask;
    }
    }
    

//UI Class
class UI{
    static displayTasks(){
        
         const tasks=Store.getTask();
          
          tasks.forEach((task) => UI.addTaskToList(task));
    }
     static addTaskToList(task){
         var taskList=document.querySelector('#task-list');
 
         //create element that contains all tasks
          var rowlist= document.createElement('tr');

         

          rowlist.innerHTML = `
           <td>${task.title}</td>
           <td>${task.note}</td>
           <td>${task.dateTask}</td>
           <td><a href="#" class="btn btn-danger btn-sm delete">X </a></td>
           `;

           //append row to the list
           taskList.appendChild(rowlist);
     }

     static deleteTask(el){
         if(el.classList.contains('delete')){
             el.parentElement.parentElement.remove();
         }

     }

     static showAlert(message,className){
         const div= document.createElement('div')
;
       div.className=`alert alert-${className}`;
       div.appendChild(document.createTextNode(message));
       const container=document.querySelector('.container');
       const form= document.querySelector('#taskForm');
       container.insertBefore(div,form);

       //counter in 3 seconds
       setTimeout(()=> document.querySelector('.alert').remove(),3000);
     }

     static clearFields(){
         document.querySelector('#title').value = '';
         document.querySelector('#note').value = '';
         document.querySelector('#dateTask').value = '';
     }
}  
   

//Store Class: Handles Storage
class Store{
    static getTask(){
        var tasks;
        if(localStorage.getItem('tasks')=== null){
            tasks =[];
        }else{
            tasks=JSON.parse(localStorage.getItem('tasks'));
        }
         return tasks;
    }

    static addTask(task){
        const tasks=Store.getTask();
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(dateTask){
        const tasks =Store.getTask();

        tasks.forEach((task, index) => {
            if(task.dateTask === dateTask){
              tasks.splice(index,1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}



//Display Tasks
document.addEventListener('DOMContentLoaded',UI.displayTasks)

//Add a Book   
 document.querySelector('#taskForm').addEventListener('submit', (e) =>{

    //Prevent actual submit
    e.preventDefault();  
       
     //Get form values
     const title=document.querySelector('#title').value;
     const note=document.querySelector('#note').value;
 const dateTask=document.querySelector('#dateTask').value;
 
 //Validate
 if(title === '' || note === '' || dateTask === '' ){
     UI.showAlert('Please fill in all fields', 'danger');
 }else{
     //Instatiate task
     const task = new Task (title, note, dateTask);
   
     //Add Book to UI
     UI.addTaskToList(task)

     //Add Task to Store
     Store.addTask(task);

     //Show Success message
     UI.showAlert('Task Added','success');

     //clear fields
     UI.clearFields();   
 }
     
      });

//Remove a Task
document.querySelector('#task-list').addEventListener('click', (e)=> {
    //Remove Task from UI
    UI.deleteTask(e.target);

    //Remove Task form store
    Store.removeTask(e.target.parentElement.previousElementSibling.textContent);
    
    //Show sucess message
    UI.showAlert('Task Removed','success');
});

