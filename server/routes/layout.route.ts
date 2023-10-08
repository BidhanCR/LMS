import express from "express";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";

const LayoutRouter = express.Router();

LayoutRouter.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizedRoles("admin"),
  createLayout
);

LayoutRouter.put(
  "/edit-layout",
  updateAccessToken,
  isAuthenticated,
  authorizedRoles("admin"),
  editLayout
);

LayoutRouter.get("/get-layout/:type", getLayoutByType);

export default LayoutRouter;
