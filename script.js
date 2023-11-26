// get variables
let userForm = document.querySelector("#user-form");

let userInput = document.querySelector("#username");

let languages = document.querySelector(".languages");

let search_term = document.querySelector("#search-term");

let reposEl = document.querySelector("#repos");

// events

userForm.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(e) {
  // preventDefualt() to prevent page from refresh
  e.preventDefault();
  let user = userInput.value.trim();

  if (user) {
    reposEl.innerHTML = "";
    getUserRepos(user);
  } else {
    alert("Please Enter userName");
  }
}

function getUserRepos(user) {
  let apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayRepos(data, user))
    .catch((err) => alert("Something went Wrong"));
}

function displayRepos(repos, searchTerm) {
  search_term.innerHTML = searchTerm;
  repos.forEach((repo) => {
    reposEl.innerHTML += `<a href="#" class="repo-item">
                            <span>${repo.owner.login} / ${repo.name} </span>
                            <span>${
                              repo.open_issues_count > 0
                                ? '<i class="fa-solid fa-xmark error"></i>'
                                : '<i class="fa-solid fa-check true"></i>'
                            }</span>
                        </a>`;
  });
}
