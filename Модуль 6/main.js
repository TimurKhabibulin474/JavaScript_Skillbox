const button = document.querySelector(".btn");
const input = document.querySelector(".input");
const container = document.querySelector(".list")

button.addEventListener("click", async () => {
    container.innerHTML = "";
    const value = input.value.trim();
    let classObj;
    if(value.endsWith(".js")) {
        try {
            const module = await import(`${value}`);
            classObj = module.default;
        } catch (error) {
            input.classList.add("input-error");
            return;
        }
    } else {
        classObj = window[value];
    }

    if(typeof classObj !== "function") {
        input.classList.add("input-error");
        return;
    }
    input.classList.remove("input-error");

    let prototype = classObj.prototype;
    while(prototype) {
        const prototypeItem = document.createElement("li");
        prototypeItem.textContent = prototype.constructor.name || "[Без названия]";
        const propertiesList = document.createElement("ol");
        Object.entries(Object.getOwnPropertyDescriptors(prototype)).forEach(([property, descriptor]) => {
            if(descriptor.enumerable){
                const propertyItem = document.createElement("li");
                const typeOfProperty = descriptor.value === undefined ? typeof descriptor : typeof descriptor.value;
                propertyItem.textContent = `${property}: ${typeOfProperty}`;
                propertiesList.append(propertyItem);
            }
        });
        prototypeItem.append(propertiesList);
        container.append(prototypeItem);
        
        prototype = Object.getPrototypeOf(prototype);
    }
})