export default (policyContext, config, { strapi }) => {
  if (policyContext.state.user) {
    // Pass current user based on JWT token
    policyContext.params.id = policyContext.state.user.id;

    return true;
  }

  return false;
};
