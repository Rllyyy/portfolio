const fs = require("fs");
const { execSync } = require("child_process");
const axios = require("axios");
require("dotenv").config();

async function checkMajorUpdates() {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  const majorUpdates = [];

  if (!process.env.GHP_TOKEN) {
    throw new Error("GitHub token is required to fetch release notes from GitHub API.");
  }

  async function getReleaseNotes(package) {
    try {
      const url = JSON.parse(execSync(`yarn info ${package} --json`).toString().trim()).data.repository.url;
      const repoPath = url.replace("https://github.com/", "").replace(".git", "").replace("git+", "");

      const response = await axios.get(`https://api.github.com/repos/${repoPath}/releases/latest`, {
        headers: {
          Authorization: `token ${process.env.GHP_TOKEN}`,
        },
      });
      return response.data.body || "No release notes available.";
    } catch (error) {
      console.error(error);
      return "Failed to fetch release notes.";
    }
  }

  for (const [pkg, currentVersion] of Object.entries(dependencies)) {
    try {
      const latestVersion = execSync(`yarn info ${pkg} --json dist-tags.latest`).toString().trim();
      const latestMajor = JSON.parse(latestVersion).data.split(".")[0];
      const currentMajor = currentVersion.replace(/^[^0-9]*/, "").split(".")[0];

      if (currentMajor !== latestMajor) {
        majorUpdates.push({ pkg, currentVersion, latestVersion: latestMajor });
      }
    } catch (error) {
      console.error(`Failed to fetch info for ${pkg}`, error);
    }
  }

  for (const update of majorUpdates) {
    const releaseNotes = await getReleaseNotes(update.pkg);
    update.releaseNotes = releaseNotes;
  }

  if (majorUpdates.length > 0) {
    fs.writeFileSync("major-test.json", JSON.stringify(majorUpdates, null, 2));
    console.log("Major updates found:", majorUpdates);
  } else {
    console.info("No major updates found.");
  }
}

checkMajorUpdates();
