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

    const render = () => {
        
        let htmlString = "";
        
        for(task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            
            `;
        };
        document.querySelector(".js-taskList").innerHTML = htmlString;

    };
    
    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

        });
        render();
    };
    init();
}