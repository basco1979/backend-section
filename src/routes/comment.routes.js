const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");

module.exports = function ({ CommentController }) {
  const router = Router();
  router.get("/:commentId/unique", CommentController.get);
  router.get("/:ideaId", CommentController.getCommentbyIdea);
  router.post("/:ideaId", AuthMiddleware, CommentController.createComment);
  router.patch("/:userId", AuthMiddleware, CommentController.update);
  router.delete("/:userId", AuthMiddleware, CommentController.delete);
  return router;
};
