# Workspace Init

#### Clones all repositories, public or private, of a specified user or organization.
#### Credentials are needed, they are present in a file named .wsinit.json place in the home folder.

### Usage:

#### For user:
```
~$ wsinit <github username>
```

#### For organization:
```
~$ wsinit --org <github organization>
```
##### The description is used to determine the exact path to which the repository will be cloned.
##### If the description is empty, or if it contains spaces, the default path is used, `~/repos`.

### Examples:
Repository description: `path/to/folder` -> Will clone the repository in `./path/to/folder/<repository name>`

Repository description: `Some description` -> Will clone the repository in `~/repos/<repository name>`

Empty repository description -> Will clone the repository in `~/repos/<repository name>`


### Authentication:
##### The following file, .wsinit.json, must be placed in the home folder and is required for authentication with the GitHub API:

##### If you only want to clone public repositories:
```
{
  "user": <github username>
}
```
##### If you want to clone private repositories as well:
```
{
  "user": <github username>,
  "at": <github API access token>
}
```
##### To run the tests as well, the file must look like this:
```
{
  "user": <github username>,
  "at": <github API access token>
  "test_repo_1": {
    "name": <repo name>,
    "full_name": <repo full name>
    "local_path": <local path to which the repo will be cloned>
  },
  "test_repo_2": {
    "name": <repo name>,
    "full_name": <repo full name>
    "local_path": <local path to which the repo will be cloned>
  }
}
```
##### Note: The tests clone the repositories in the test folder(`wsinit/test`) for repositories with correct path in the description, and in the `~/repos` folder for wrong paths. <u>Tests do not delete anything</u>.
