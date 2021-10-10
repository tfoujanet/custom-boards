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
          .then(([iterations, currentIteration]) => {
            const current = (currentIteration || [])[0] || {};
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

export const getIterationWorkItems = (client, projectId, teamId, iteration) =>
  new Promise((resolve, reject) => {
    client
      .getWorkApi()
      .then((api) => {
        api
          .getIterationWorkItems({ projectId, teamId }, iteration)
          .then(({ workItemRelations }) => {
            resolve(
              workItemRelations.reduce((acc, curr) => {
                const workItemIds = [curr.target?.id, curr.source?.id]
                  .filter((_) => !!_)
                  .filter((_) => !acc.some((c) => c === _));

                return [...acc, ...workItemIds];
              }, [])
            );
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });

export const getWorkItems = (client, ids) =>
  new Promise((resolve, reject) => {
    client
      .getWorkItemTrackingApi()
      .then((api) => {
        api
          .getWorkItems(ids, [
            "System.WorkItemType",
            "System.State",
            "System.AssignedTo",
            "System.Title",
          ])
          .then((workItems) =>
            resolve(
              workItems.map((_) => ({
                id: _.id,
                type: _.fields["System.WorkItemType"],
                assignedTo: _.fields["System.AssignedTo"]?.displayName,
                state: _.fields["System.State"],
                title: _.fields["System.Title"],
              }))
            )
          )
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
