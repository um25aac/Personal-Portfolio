"use strict";


const projects = {

    portfolio: {
        id: "portfolio",
        title: "Personal Developer Portfolio",
        category: "Web Development",

        description:
            "A responsive multi-page personal portfolio website " +
            "developed to present academic background, technical " +
            "interests and project work.",

        objectives: [
            "Create a professional personal profile website.",
            "Present technical interests and academic background.",
            "Display completed projects.",
            "Implement a client-side contact form.",
            "Use GitHub for version control."
        ],

        technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Git",
            "GitHub"
        ],

        process:
            "The website is developed incrementally. HTML provides " +
            "the structure, CSS handles presentation and responsive " +
            "layouts, and JavaScript provides interactive features.",

        status: "In Progress",

        repository: ""
    },

    database: {
        id: "database",
        title: "Database Management System",
        category: "Database Development",

        description:
            "Example project entry. Replace this description with " +
            "details of an actual academic or personal database project.",

        objectives: [
            "Describe the problem addressed by the project.",
            "Explain the database design.",
            "Describe the implementation.",
            "Explain the outcome."
        ],

        technologies: [
            "SQL",
            "Database Design"
        ],

        process:
            "Replace this section with your actual project " +
            "development process and implementation details.",

        status: "Example - Replace with actual work",

        repository: ""
    },

    software: {
        id: "software",
        title: "Software Development Project",
        category: "Software Development",

        description:
            "Example project entry. Replace it with a genuine " +
            "software development project you have completed.",

        objectives: [
            "Describe the project requirements.",
            "Explain the software architecture.",
            "Describe the development process.",
            "Present the completed outcome."
        ],

        technologies: [
            "Python",
            "Programming",
            "Software Design"
        ],

        process:
            "Replace this text with the actual tools, methods " +
            "and implementation steps used in your project.",

        status: "Example - Replace with actual work",

        repository: ""
    }

};




function createElement(tag, className, text) {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}




function createTechnologyTags(technologies) {

    const container = createElement(
        "div",
        "technology-tags"
    );

    technologies.forEach(technology => {

        const tag = createElement(
            "span",
            "",
            technology
        );

        container.appendChild(tag);

    });

    return container;
}



function renderProjects() {

    const grid = document.getElementById("projectGrid");

    if (!grid) {
        return;
    }

    grid.replaceChildren();

    Object.values(projects).forEach(project => {

        const card = createElement(
            "article",
            "project-card"
        );

        const imageContainer = createElement(
            "div",
            "project-image"
        );

        const image = document.createElement("img");

        image.src =
            `assets/images/projects/${project.id}.svg`;

        image.alt =
            `Illustration representing ${project.title}`;

        image.loading = "lazy";

        image.width = 500;
        image.height = 300;

        imageContainer.appendChild(image);


        const content = createElement(
            "div",
            "project-content"
        );

        const category = createElement(
            "p",
            "project-category",
            project.category
        );

        const title = createElement(
            "h2",
            "",
            project.title
        );

        const description = createElement(
            "p",
            "",
            project.description
        );

        const tags = createTechnologyTags(
            project.technologies
        );

        const actions = createElement(
            "div",
            "project-actions"
        );

        const quickView = createElement(
            "button",
            "btn btn-outline quick-view",
            "Quick View"
        );

        quickView.type = "button";

        quickView.dataset.projectId = project.id;

        quickView.setAttribute(
            "aria-label",
            `Quick view of ${project.title}`
        );


        const detailsLink = createElement(
            "a",
            "text-link",
            "Full Details"
        );

        detailsLink.href =
            `project-details.html?project=${encodeURIComponent(project.id)}`;


        actions.appendChild(quickView);
        actions.appendChild(detailsLink);

        content.appendChild(category);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(tags);
        content.appendChild(actions);

        card.appendChild(imageContainer);
        card.appendChild(content);

        grid.appendChild(card);

    });

}




function initializeProjectModal() {

    const modal = document.getElementById("projectModal");

    if (!modal) {
        return;
    }

    const modalContent = document.getElementById(
        "modalContent"
    );

    const closeButton = document.getElementById(
        "closeModal"
    );


    function openModal(projectId) {

        const project = projects[projectId];

        if (!project) {
            return;
        }

        modalContent.replaceChildren();

        const heading = createElement(
            "h2",
            "",
            project.title
        );

        const category = createElement(
            "p",
            "project-category",
            project.category
        );

        const description = createElement(
            "p",
            "",
            project.description
        );

        const objectivesHeading = createElement(
            "h3",
            "",
            "Project Objectives"
        );

        const objectivesList = createElement("ul", "");

        project.objectives.forEach(objective => {

            const item = createElement(
                "li",
                "",
                objective
            );

            objectivesList.appendChild(item);

        });

        const technologiesHeading = createElement(
            "h3",
            "",
            "Technologies Used"
        );

        const technologies = createTechnologyTags(
            project.technologies
        );

        const status = createElement(
            "p",
            "project-status",
            `Project Status: ${project.status}`
        );

        const detailsLink = createElement(
            "a",
            "btn",
            "View Full Details"
        );

        detailsLink.href =
            `project-details.html?project=${encodeURIComponent(project.id)}`;

        modalContent.appendChild(category);
        modalContent.appendChild(heading);
        modalContent.appendChild(description);
        modalContent.appendChild(objectivesHeading);
        modalContent.appendChild(objectivesList);
        modalContent.appendChild(technologiesHeading);
        modalContent.appendChild(technologies);
        modalContent.appendChild(status);
        modalContent.appendChild(detailsLink);

        modal.showModal();

    }


    document.addEventListener("click", event => {

        const button = event.target.closest(
            ".quick-view"
        );

        if (!button) {
            return;
        }

        openModal(button.dataset.projectId);

    });


    closeButton.addEventListener("click", () => {

        modal.close();

    });


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.close();
        }

    });

}



function renderProjectDetails() {

    const container = document.getElementById(
        "projectDetailsContent"
    );

    if (!container) {
        return;
    }

    const parameters = new URLSearchParams(
        window.location.search
    );

    const projectId = parameters.get("project");

    const project = projects[projectId];


    if (!project) {

        const message = createElement(
            "section",
            "content-card project-empty-state"
        );

        const heading = createElement(
            "h2",
            "",
            "Project Not Found"
        );

        const description = createElement(
            "p",
            "",
            "The requested project could not be found. " +
            "Please return to the portfolio and select another project."
        );

        const backLink = createElement(
            "a",
            "btn",
            "Back to Portfolio"
        );

        backLink.href = "portfolio.html";

        message.appendChild(heading);
        message.appendChild(description);
        message.appendChild(backLink);

        container.replaceChildren(message);

        return;

    }


    container.replaceChildren();


    const category = createElement(
        "p",
        "project-category",
        project.category
    );

    const heading = createElement(
        "h1",
        "",
        project.title
    );

    const description = createElement(
        "p",
        "project-description",
        project.description
    );


    const objectivesHeading = createElement(
        "h2",
        "",
        "Project Objectives"
    );

    const objectivesList = createElement("ul", "");

    project.objectives.forEach(objective => {

        const item = createElement(
            "li",
            "",
            objective
        );

        objectivesList.appendChild(item);

    });


    const technologyHeading = createElement(
        "h2",
        "",
        "Technologies Used"
    );

    const technologies = createTechnologyTags(
        project.technologies
    );


    const processHeading = createElement(
        "h2",
        "",
        "Development Process"
    );

    const process = createElement(
        "p",
        "",
        project.process
    );


    const status = createElement(
        "p",
        "project-status",
        `Project Status: ${project.status}`
    );


    const actions = createElement(
        "div",
        "project-detail-actions"
    );

    const backLink = createElement(
        "a",
        "btn btn-outline",
        "Back to Portfolio"
    );

    backLink.href = "portfolio.html";

    actions.appendChild(backLink);


    if (project.repository) {

        const repositoryLink = createElement(
            "a",
            "btn",
            "View GitHub Repository"
        );

        repositoryLink.href = project.repository;

        repositoryLink.target = "_blank";

        repositoryLink.rel = "noopener noreferrer";

        actions.appendChild(repositoryLink);

    }


    container.appendChild(category);
    container.appendChild(heading);
    container.appendChild(description);
    container.appendChild(objectivesHeading);
    container.appendChild(objectivesList);
    container.appendChild(technologyHeading);
    container.appendChild(technologies);
    container.appendChild(processHeading);
    container.appendChild(process);
    container.appendChild(status);
    container.appendChild(actions);

}



document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio website initialized.");

    renderProjects();

    initializeProjectModal();

    renderProjectDetails();

});
