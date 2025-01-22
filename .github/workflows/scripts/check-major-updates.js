const fs = require("fs");
const { execSync } = require("child_process");
const axios = require("axios");
require("dotenv").config();

async function fetchReleaseNotes(endpoints) {
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(endpoint, {
        Authorization: `token ${process.env.GHP_TOKEN}`,
      });
      if (response.status === 200) {
        return response.data.body || "No release notes available.";
      }
    } catch (error) {
      console.warn(`Failed to fetch data from ${endpoint}: ${error.message}`);
    }
  }
  return "Found no release notes";
}

async function getReleaseNotes(package, latestVersion) {
  const url = JSON.parse(execSync(`yarn info ${package} --json`).toString().trim()).data.repository.url;

  if (!url) return "No repository URL found in package.json";

  const repoPath = url.replace("https://github.com/", "").replace(".git", "").replace("git+", "");

  const endpoints = [
    `https://api.github.com/repos/${repoPath}/releases/tags/v${latestVersion}.0.0`,
    `https://api.github.com/repos/${repoPath}/releases/latest`,
  ];

  return await fetchReleaseNotes(endpoints);
}

async function checkMajorUpdates() {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const majorUpdates = [];

  if (!process.env.GHP_TOKEN) {
    throw new Error("GitHub token is required to fetch release notes from GitHub API.");
  }

  for (const [pkg, currentVersion] of Object.entries(dependencies)) {
    const latestVersion = execSync(`yarn info ${pkg} --json dist-tags.latest`).toString().trim(); // TODO check if dist-tags.latest or version

    if (!latestVersion) {
      console.error(`Failed to fetch info for ${pkg}`);
    }

    const latestMajor = JSON.parse(latestVersion).data.split(".")[0];
    const currentMajor = currentVersion.replace(/^[^0-9]*/, "").split(".")[0];

    if (currentMajor !== latestMajor) {
      majorUpdates.push({ pkg, currentVersion, latestVersion: latestMajor });
    }
  }

  for (const update of majorUpdates) {
    const releaseNotes = await getReleaseNotes(update.pkg, update.latestVersion);
    update.releaseNotes = releaseNotes;
  }

  if (majorUpdates.length > 0) {
    fs.writeFileSync("major-test.json", JSON.stringify(majorUpdates, null, 2));
  } else {
  }
}

checkMajorUpdates();
