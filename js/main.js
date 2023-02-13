/*********************************************************************************
 *  WEB422 – Assignment 2
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Yujin Kim  Student ID: 117826214  Date: January 29, 2023
 *
 ********************************************************************************/

let page = 1;
let perPage = 10;
let url = "https://friendly-gold-hem.cyclic.app/";

function loadMovieData(title = null) {
    if (title) {
        fetch(
            url + `/api/movies?page=${page}&perPage=${perPage}&title=${title}`
        )
            .then((res) => res.json())
            .then((movieData) => {
                document.querySelector(".pagination").classList.add("d-none");
                addTrElementToTable(movieData);
                updateCurrentPage();
                addClickEventNDisplay();
            });
    } else {
        fetch(url + `/api/movies?page=${page}&perPage=${perPage}`)
            .then((res) => res.json())
            .then((movieData) => {
                document
                    .querySelector(".pagination")
                    .classList.remove("d-none");
                console.log();
                addTrElementToTable(movieData);
                updateCurrentPage();
                addClickEventNDisplay();
            });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadMovieData();

    document.querySelector("#previous-page").addEventListener("click", () => {
        if (page > 1) {
            page -= 1;
        }
        loadMovieData();
    });
    document.querySelector("#next-page").addEventListener("click", () => {
        page += 1;
        loadMovieData();
    });

    document
        .querySelector("#searchForm")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            page = 1;
            loadMovieData(document.querySelector("#title").value);
        });

    document.querySelector("#clearForm").addEventListener("click", () => {
        document.querySelector("#title").value = "";
        loadMovieData();
    });
});

function createTrElement(movieData) {
    let trElement = `${movieData
        .map(
            (data) => `<tr movie-id=${data._id}>
        <td>${data.year}</td>
        <td>${data.title}</td>
        <td>${data.plot ? data.plot : "N/A"}</td>
        <td>${data.rated ? data.rated : "N/A"}</td>
        <td>${Math.floor(data.runtime / 60)}:${(data.runtime % 60)
                .toString()
                .padStart(2, "0")}</td></tr>`
        )
        .join("")}`;
    return trElement;
}

function addTrElementToTable(movieData) {
    let trElement = createTrElement(movieData);
    document.querySelector("#moviesTable tbody").innerHTML = trElement;
}

function updateCurrentPage() {
    document.querySelector("#current-page").innerHTML = page;
}

function addClickEventNDisplay() {
    document.querySelectorAll("#moviesTable tbody tr").forEach((row) => {
        row.addEventListener("click", () => {
            let dataId = row.getAttribute("movie-id");
            fetch(url + `/api/movies/${dataId}`)
                .then((res) => res.json())
                .then((data) => {
                    document.querySelector(
                        "#detailsModal .modal-title"
                    ).innerHTML = data.title;
                    if (data.poster) {
                        document.querySelector(
                            "#detailsModal .modal-body"
                        ).innerHTML = `<img class="img-fluid w-100" src="${
                            data.poster
                        }"><br><br>
                        <strong>Directed By:</strong> ${data.directors.join(
                            ", "
                        )}<br><br>
                        <p>${data.fullplot}</p>
                        <strong>Cast:</strong> ${
                            data.cast ? data.cast.join(",") : "N/A"
                        }<br><br>
                        <strong>Awards:</strong> ${data.awards.text}<br>
                        <strong>IMDB Rating:</strong> ${data.imdb.rating} (${
                            data.imdb.votes
                        } votes)
                        `;
                    } else {
                        document.querySelector(
                            "#detailsModal .modal-body"
                        ).innerHTML = `<strong>Directed By:</strong> ${data.directors.join(
                            ", "
                        )}<br><br>
                        <p>${data.fullplot}</p>
                        <strong>Cast:</strong> ${
                            data.cast ? data.cast.join(",") : "N/A"
                        }<br><br>
                        <strong>Awards:</strong> ${data.awards.text}<br>
                        <strong>IMDB Rating:</strong> ${data.imdb.rating} (${
                            data.imdb.votes
                        } votes)
                        `;
                    }

                    let eventModal = new bootstrap.Modal(
                        document.querySelector("#detailsModal"),
                        {
                            backdrop: "static",
                            keyboard: false,
                            focus: true,
                        }
                    );
                    eventModal.show();
                });
        });
    });
}
