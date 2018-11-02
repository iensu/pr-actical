A service for displaying PR states across multiple repos.

For deployment on Heroku etc it requires the following variables to be set:

| Variable                  | Description                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `PRACTICAL_GITHUB_TOKEN`  | Access token for Github with at least access to the repos you want to track         |
| `PRACTICAL_REPOS`         | A comma separated list of `<owner>:<repo>` entries, for instance `iensu:pr-actical` |
| `PRACTICAL_USER`          | (optional) Enables basic auth when used together with `PRACTICAL_PASSWORD`          |
| `PRACTICAL_PASSWORD`      | (optional) Enables basic auth when used together with `PRACTICAL_USER`              |

If these are set, you should be able to deploy this app to heroku.
