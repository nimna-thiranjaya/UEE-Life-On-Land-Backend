const express = require("express");
const OrganizationRouter = express.Router();

const {
  CreateOrganization,
  GetAllApprovedOrganizations,
  GetOrganizationById,
  UpdateOrganization,
  DeleteOrganization,
  AdminGetAllOrganizations,
  AdminApproveOrganization,
  AdminRejectOrganization,
} = require("../controllers/organizations.controller");
const userAuth = require("../middlewares/user.middleware");

OrganizationRouter.post("/createOrg", userAuth, CreateOrganization);
OrganizationRouter.get(
  "/getAllApprovedOrgs",
  userAuth,
  GetAllApprovedOrganizations
);
OrganizationRouter.get("/getOneOrg/:orgId", GetOrganizationById);
OrganizationRouter.patch("/updateOrg/:orgId", UpdateOrganization);
OrganizationRouter.delete("/deleteOrg/:orgId", DeleteOrganization);
OrganizationRouter.get("/adminGetAllOrgs", AdminGetAllOrganizations);
OrganizationRouter.patch("/adminApproveOrg/:orgId", AdminApproveOrganization);
OrganizationRouter.patch("/adminRejectOrg/:orgId", AdminRejectOrganization);
module.exports = OrganizationRouter;
