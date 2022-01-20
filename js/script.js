{
    const tasks = [
        {
            content: "task1",
            done: true,
        },
        {
            content: "task2",
            done: false,
        }
    ];

    const newTask = (addNewTask) => {
        tasks.push({
            content: addNewTask,
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

    const render = () => {

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

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        addNewTask = document.querySelector(".js-newTask").value.trim();

        if (addNewTask === "") {
            return;
        }
        newTask(addNewTask);
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        render();
    };
    init();
}