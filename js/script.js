{
    const tasks = [];

    const newTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        }); render();
    };

    const taskRemove = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (task) => {
        tasks[task].done = !tasks[task].done;
        render();
    };

    const bindEvents = () => {
        const removeTasks = document.querySelectorAll(".js-taskRemove");

        removeTasks.forEach((removeTask, index) => {
            removeTask.addEventListener("click", () => {
                taskRemove(index);
            });
        });

        const toggleDoneTask = document.querySelectorAll(".js-taskDone");

        toggleDoneTask.forEach((toggleDone, task) => {
            toggleDone.addEventListener("click", () => {
                toggleTaskDone(task);
            });
        });
    };

    const clearInput = () => {
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
    };

    const renderTaskList = () => {
        let htmlString = "";

        for (task of tasks) {
            htmlString += `
            <li class="main__listItem${task.done ? " main__taskList--done" : ""}">
                <button class="js-taskDone main__taskDoneButton${task.done ? " main__taskDoneButton--done" : ""}"></button>
                   <span class="main__taskListContent">${task.content}</span>
                <button class="js-taskRemove main__taskRemoveButton"></button>
            </li>
            `;
        };
        document.querySelector(".js-taskList").innerHTML = htmlString;
    };

    const render = () => {

        renderTaskList();
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        newTask(newTaskContent);
        clearInput();
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        render();
    };
    init();
}