/* =========================================================
   PORTAFOLIO DE ANAHI
   FUNCIONES PRINCIPALES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       AÑO AUTOMÁTICO DEL FOOTER
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       MENÚ PARA CELULAR
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener(
            "click",
            () => {

                nav.classList.toggle("active");

                const abierto =
                    nav.classList.contains("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    abierto
                );

            }
        );


        /* Cerrar menú al seleccionar una opción */

        nav.querySelectorAll("a").forEach(
            enlace => {

                enlace.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       MOSTRAR PROYECTOS
    ===================================================== */

    const projectGrid =
        document.getElementById(
            "project-grid"
        );

    const noProjects =
        document.getElementById(
            "no-projects"
        );


    if (
        projectGrid &&
        typeof proyectos !== "undefined" &&
        Array.isArray(proyectos)
    ) {

        projectGrid.innerHTML = "";


        if (proyectos.length === 0) {

            if (noProjects) {
                noProjects.hidden = false;
            }

        } else {

            if (noProjects) {
                noProjects.hidden = true;
            }


            proyectos.forEach(
                (proyecto, index) => {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.classList.add(
                        "project-card"
                    );


                    /* Número */

                    const number =
                        String(index + 1)
                            .padStart(2, "0");


                    /* Tecnologías */

                    let tecnologias = "";


                    if (
                        Array.isArray(
                            proyecto.tecnologias
                        )
                    ) {

                        tecnologias =
                            proyecto.tecnologias
                                .map(
                                    tecnologia =>
                                        `
                                        <span>
                                            ${tecnologia}
                                        </span>
                                        `
                                )
                                .join("");

                    }


                    /* Enlace GitHub */

                    const github =
                        proyecto.github
                            ? `
                                <a
                                    href="${proyecto.github}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    GitHub →
                                </a>
                              `
                            : "";


                    /* Enlace Demo */

                    const demo =
                        proyecto.demo
                            ? `
                                <a
                                    href="${proyecto.demo}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Demo →
                                </a>
                              `
                            : "";


                    /* Tarjeta */

                    card.innerHTML = `

                        <span
                            class="project-number"
                        >
                            PROYECTO ${number}
                        </span>

                        <h3>
                            ${
                                proyecto.titulo ||
                                "Proyecto"
                            }
                        </h3>

                        <p>
                            ${
                                proyecto.descripcion ||
                                "Sin descripción."
                            }
                        </p>

                        <div
                            class="project-tech"
                        >
                            ${tecnologias}
                        </div>

                        <div
                            class="project-links"
                        >
                            ${github}
                            ${demo}
                        </div>

                    `;


                    projectGrid.appendChild(
                        card
                    );

                }
            );

        }

    } else if (projectGrid) {

        /*
            Si projects.js no existe o tiene
            un problema, mostramos un mensaje
            en lugar de dejar la sección vacía.
        */

        projectGrid.innerHTML = `

            <article class="project-card">

                <span class="project-number">
                    PROYECTOS
                </span>

                <h3>
                    Próximamente
                </h3>

                <p>
                    Los proyectos aparecerán
                    aquí cuando sean agregados.
                </p>

            </article>

        `;

    }


    /* =====================================================
       ANIMACIÓN DE SECCIONES
    ===================================================== */

    const elementosReveal =
        document.querySelectorAll(
            ".reveal"
        );


    /*
        El CSS ya permite que las secciones
        sean visibles incluso si JavaScript
        falla.

        Aquí solamente agregamos la clase
        visible cuando aparecen.
    */

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList
                                    .add("visible");

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elementosReveal.forEach(
            elemento => {

                observer.observe(
                    elemento
                );

            }
        );


    } else {

        elementosReveal.forEach(
            elemento => {

                elemento.classList.add(
                    "visible"
                );

            }
        );

    }

});
