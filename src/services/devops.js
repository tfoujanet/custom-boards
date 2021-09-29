import * as azdev from "azure-devops-node-api";

export const connect = (orgName, token) => {
  const orgUrl = `https://dev.azure.com/${orgName}`;

  const authHandler = azdev.getPersonalAccessTokenHandler(token);
  return new azdev.WebApi(orgUrl, authHandler);
};

export const getProjects = (client) =>
  new Promise((resolve, reject) => {
    client
      .getCoreApi()
      .then((api) => {
        api
          .getProjects()
          .then((projects) => {
            resolve(
              projects.map((_) => ({
                id: _.id,
                name: _.name,
              }))
            );
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });

export const getTeams = (client, projectId) =>
  new Promise((resolve, reject) => {
    client
      .getCoreApi()
      .then((api) => {
        api
          .getTeams(projectId)
          .then((teams) => {
            resolve(teams.map((_) => ({ id: _.id, name: _.name })));
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });

export const getIterations = (client, projectId, teamId) =>
  new Promise((resolve, reject) => {
    client
      .getWorkApi()
      .then((api) => {
        Promise.all([
          api.getTeamIterations({ projectId, teamId }),
          api.getTeamIterations({ projectId, teamId }, "current"),
        ])
          .then(([iterations, [current]]) => {
            resolve(
              iterations.map((_) => ({
                id: _.id,
                name: _.name,
                current: _.id === current.id,
              }))
            );
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });

export const getWorkItemTypes = (client, projectId) =>
  new Promise((resolve, reject) => {
    client
      .getWorkItemTrackingApi()
      .then((api) => {
        api
          .getWorkItemTypes(projectId)
          .then((types) =>
            resolve(types.map((_) => ({ name: _.name, states: _.states })))
          )
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });

export const getWorkItems = (client, projectId, teamId, iteration) =>
  new Promise((resolve, reject) => {
    client
      .getWorkApi()
      .then((api) => {
        api
          .getIterationWorkItems({ projectId, teamId }, iteration)
          .then((wi) => {
            resolve(wi);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
