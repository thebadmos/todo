$(document).ready(function(){


    //Task Class
    class Task{
        constructor(title,note,dateTask){
            this.title=title;
            this.note=note;
            this.dateTask=dateTask;
        }
    }
     // Store Class

class Store{
    static getTask(){
        let tasks;
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

    static removeTask($dateTask){
        const tasks =Store.getTask();

        tasks.forEach((task, index) => {
            if(task.dateTask === dateTask){
              tasks.splice(index,1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}   

//UI Class
class UI{
    static displayTasks(){
        
         const tasks=Store.getTask();
          
          tasks.forEach((task) => UI.addTaskToList(task));
    }
     static addTaskToList(task){
         let $taskList=$('#task-list');
 
         //create element that contains all tasks
          let $rowlist= $('<tr>');

          // create task title
          let $taskTitle = $('<td>');
          $taskTitle.text(task.title);

          // create task note
          let $taskNote = $('<td>');
          $taskNote.text(task.note);

          // create task dateTask
          let $taskDateTask = $('<td>');
          $taskDateTask.text(task.dateTask);

          // create delete button
          let $deleteIcon = $('<td>');
          $deleteIcon.html('<a href="#" class="btn btn-danger btn-sm delete">X </a>');

        
        $rowlist.append($taskTitle);
        $rowlist.append($taskNote);
        $rowlist.append($taskDateTask);
        $rowlist.append($deleteIcon);
           //append row to the list
           $taskList.append($rowlist);
     }

     static showAlert(message,className){
        let $div= $('<div>');
       $div.addClass('alert alert-'+className);
       $div.append(document.createTextNode(message));
    
        let $form= $('#taskForm');
       $form.prepend($div);
    
       //counter in 3 seconds
       setTimeout(()=> $('.alert').remove(),3000);
     }

     static deleteTask($el){
         if($el.hasClass('delete')){
             $el.parent().parent().remove();
         }

     }

     static clearFields(){
         $('#title').val('');
         $('#note').val('');
         $('#dateTask').val('');
     }
}  
//  Display
UI.displayTasks();

//Add a Book   
 $('#taskForm').on('submit', (e) =>{

    //Prevent actual submit
    e.preventDefault();  
       
     //Get form values
    const $title=$('#title').val();
     const $note=$('#note').val();
    const $dateTask=$('#dateTask').val();
 
 //Validate
 if($title === '' || $note === '' || $dateTask === '' ){
     UI.showAlert('Please fill in all fields', 'danger');
 }else{
     //Instatiate task
     const task = new Task ($title, $note, $dateTask);
   
     //Add Book to UI
     UI.addTaskToList(task);

     //Add Task to Store
     Store.addTask(task);

     //Show Success message
     UI.showAlert('Task Added','success');

     //clear fields
     UI.clearFields();   
 }
     });

//Remove a Task
$('#task-list').on('click', (e)=> {
    //Remove Task from UI
    UI.deleteTask($(e.target));

    //Remove Task form store
    Store.removeTask($(e.target));
    
    //Show sucess message
    UI.showAlert('Task Removed','success');
});




})