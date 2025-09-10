import express from "express";
import { protectRoute } from "../middlewares/protected.js";
import { getFriendRequests,getrecommendedUser,getfriendsusers,sendFriendRequests,acceptRequest,outgoingFriendRequests } from "../controllers/user.js";

const router=express.Router();

router.use(protectRoute)
router.get("/",getrecommendedUser);
router.get("/friends",getfriendsusers);
router.post("/friendrequest/:id",sendFriendRequests);
router.put("/friendrequest/:id/accept",acceptRequest);
router.get("/friendrequests",getFriendRequests);
router.get("/outgoingFriendRequests",outgoingFriendRequests)
export default router;