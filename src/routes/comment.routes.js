const { Router } = require("express");

module.exports = function ({ CommentController }) {
  const router = Router();
  router.get("/:commentId/unique", CommentController.get);
  router.get("/:ideaId", CommentController.getCommentbyIdea);
  router.post("/:ideaId", CommentController.createComment);
  router.patch("/:userId", CommentController.update);
  router.delete("/:userId", CommentController.delete);
  return router;
};
