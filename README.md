# Workspace Init

#### Clones all repositories, public or private, of a specified user or organization.
#### Credentials are needed, they are present in a file named .wsinit.json place in the home folder.

### Installation:
```
~$ sudo npm install -g wsinit
```

### Usage:

#### For user:
```
~$ wsinit --name <github username>
```

#### For organization:
```
~$ wsinit --org --name <github organization>
```
##### The description is used to determine the exact path to which the repository will be cloned.
##### If the description is empty, or if it contains spaces, the default path is used, `./<repository name>`.

### Examples:
Repository description: `path/to/folder` -> Will clone the repository in `./path/to/folder/<repository name>`

Repository description: `Some description` -> Will clone the repository in `./<repository name>`

Empty repository description -> Will clone the repository in `./<repository name>`


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
##### You can place the file yourself or you could run `~$ wsinit --cred` which will prompt for user name and Github API access token.
```
~$ wsinit --cred
```
##### If you try to use the script without the `.wsinit.json` file present in the home folder, you will be prompted to initialize it, and execution will continue after the file is created.
##### *Note*: You could omit the access token. The script will still work but *only* for public repositories.

##### *Note*: The tests clone the repositories in the test folder(`wsinit/test`). <u>Tests do not delete anything</u>.
