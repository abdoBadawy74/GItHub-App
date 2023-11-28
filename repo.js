let reposEl = document.querySelector("#repos");

function getRepoName() {
  let queryStr = document.location.search;
  let repoName = queryStr.split("=")[1];
  if (repoName) {
    getIssues(repoName);
  }
}

function getIssues(repoName) {
  let apiUrl = "https://api.github.com/repos/" + repoName + "/issues";

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => displayIssues(data))
    .catch(() => alert("Something went Wrong!"));
}

function displayIssues(issues) {
  console.log(issues);
  if (issues.length === 0) {
    reposEl.innerHTML = "No issues..!";
    return;
  }

  reposEl.innerHTML = ""; // Clear existing content

  issues.forEach((issue) => {
    const issueType = issue.pull_request ? "(Pull Request)" : "(Issue)";

    reposEl.innerHTML += `<a href="${issue.html_url}" class="repo-item">
                              <span>${issue.title}</span>
                              <span>${issueType}</span>
                             </a>`;
  });
}

// Call getRepoName() to initiate the process
getRepoName();
