const Organization = require("../models/organization.model");

// Create and Save a new Organization
const CreateOrganization = async (req, res) => {
  try {
    const {
      orgName,
      orgEmail,
      orgContactNo,
      orgCountry,
      orgDescription,
      orgLogo,
    } = req.body;

    const LogedUser = req.logedUser;

    const orgCheck = await Organization.findOne({ orgEmail: orgEmail });

    if (!orgCheck) {
      const newOrganization = new Organization({
        orgName,
        orgEmail,
        orgContactNo,
        orgCountry,
        orgDescription,
        orgLogo,
        createdUser: LogedUser._id,
      });
      console.log(newOrganization);

      const savedOrganization = await newOrganization.save();
      if (savedOrganization) {
        return res.status(200).send({
          status: true,
          message: "Organization created successfully",
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Organization creation failed",
        });
      }
    } else {
      return res.status(400).send({
        status: false,
        message: "Organization already exists",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Retrieve and return all Admin approved organizations from the database.
const GetAllApprovedOrganizations = async (req, res) => {
  try {
    const LogedUserID = req.logedUser._id;
    // console.log(LogedUserID);
    const organizations = await Organization.find();
    if (organizations) {
      const approvedOrganizations = organizations.filter((organization) => {
        return (
          organization.adminStatus === "Approved" ||
          (organization.createdUser == LogedUserID &&
            organization.adminStatus === "Pending") ||
          (organization.createdUser == LogedUserID &&
            organization.adminStatus === "Rejected")
        );
      });
      return res.status(200).send({
        status: true,
        message: "Organizations fetched successfully",
        organizations: approvedOrganizations,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "Organizations not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Find a single organization with a organizationId
const GetOrganizationById = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    console.log(orgId);
    const organization = await Organization.findById(orgId);
    if (organization) {
      return res.status(200).send({
        status: true,
        message: "Organization fetched successfully",
        organization: organization,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "Organization not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Update a organization identified by the organizationId in the request
const UpdateOrganization = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    console.log(orgId);
    const {
      orgName,
      orgEmail,
      orgContactNo,
      orgCountry,
      orgDescription,
      orgLogo,
    } = req.body;

    const organization = await Organization.findById(orgId);

    if (organization) {
      const newData = {
        orgName,
        orgEmail,
        orgContactNo,
        orgCountry,
        orgDescription,
        orgLogo,
        adminStatus: "Pending",
      };

      const result = await Organization.findByIdAndUpdate(orgId, newData);

      if (result) {
        return res.status(200).send({
          status: true,
          message: "Organization updated successfully",
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Organization update failed",
        });
      }
    } else {
      return res.status(404).send({
        status: false,
        message: "Organization not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Delete a organization with the specified organizationId in the request
const DeleteOrganization = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const organization = await Organization.findById(orgId);
    if (organization) {
      const result = await Organization.findByIdAndDelete(orgId);
      if (result) {
        return res.status(200).send({
          status: true,
          message: "Organization deleted successfully",
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Organization deletion failed",
        });
      }
    } else {
      return res.status(404).send({
        status: false,
        message: "Organization not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Get All Organizations
const AdminGetAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    const approvedAndPendingOrganizations = organizations.filter((org) => {
      return org.adminStatus === "Approved" || org.adminStatus === "Pending";
    });
    if (organizations) {
      return res.status(200).send({
        status: true,
        message: "Organizations fetched successfully",
        organizations: approvedAndPendingOrganizations,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "Organizations not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Approve Organization
const AdminApproveOrganization = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const organization = await Organization.findById(orgId);
    if (organization) {
      const newData = {
        adminStatus: "Approved",
      };

      const result = await Organization.findByIdAndUpdate(orgId, newData);

      if (result) {
        return res.status(200).send({
          status: true,
          message: "Organization approved successfully",
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Organization approval failed",
        });
      }
    } else {
      return res.status(404).send({
        status: false,
        message: "Organization not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//Admin Reject Organization
const AdminRejectOrganization = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const organization = await Organization.findById(orgId);
    if (organization) {
      const newData = {
        adminStatus: "Rejected",
      };

      const result = await Organization.findByIdAndUpdate(orgId, newData);

      if (result) {
        return res.status(200).send({
          status: true,
          message: "Organization rejected successfully",
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Organization rejection failed",
        });
      }
    } else {
      return res.status(404).send({
        status: false,
        message: "Organization not found",
      });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  CreateOrganization,
  GetAllApprovedOrganizations,
  GetOrganizationById,
  UpdateOrganization,
  DeleteOrganization,
  AdminGetAllOrganizations,
  AdminApproveOrganization,
  AdminRejectOrganization,
};
